# Architecture

*Repository layout and technology choices.*

[← Documentation index](../README.md)

---

## Project Structure

A practical initial repository layout:

```text
accessible-dnd/
│
├── apps/
│   └── character-sheet/
│       ├── src/
│       │   ├── App.vue
│       │   ├── main.ts
│       │   ├── views/
│       │   └── dnd/
│       ├── public/
│       ├── vite.config.ts
│       └── package.json
│
├── packages/
│   └── accessible-ui/
│       ├── src/
│       │   ├── components/
│       │   ├── composables/
│       │   ├── profile/
│       │   ├── storage/
│       │   ├── theme/
│       │   │   └── theme.css      ← @theme token declarations
│       │   └── utils/
│       ├── tests/
│       ├── vite.config.ts
│       └── package.json
│
├── profiles/
│   ├── visual/
│   ├── motion/
│   └── motor/
│
├── schemas/
│   └── accessibility-profile.schema.json
│
├── docs/
│   ├── architecture.md
│   ├── accessibility.md
│   ├── component-guidelines.md
│   ├── profile-guidelines.md
│   ├── testing.md
│   └── research.md
│
├── tests/
│   ├── e2e/
│   └── accessibility/
│
├── package.json          ← workspace root only
├── tsconfig.base.json
└── README.md
```

A monorepo is not mandatory, but keeping the UI package separate from the D&D application early makes the intended boundary clear.

Note that build configuration lives with each app and package rather than at the root. Only the workspace manifest and the shared TypeScript base config belong at the top level. There is no `tailwind.config.ts` — see the Tailwind section below.

---

## Technology Choices

### Vue 3

Use Vue 3 + TypeScript for component composition, state, and application structure.

Vue should not abstract away the DOM to the point where developers lose control over semantics.

### TypeScript

All component APIs, profile APIs, and application models should be strongly typed.

### Tailwind CSS v4

Target Tailwind CSS **v4**, which uses CSS-first configuration. There is no `tailwind.config.ts`; the theme is declared in CSS with `@theme`.

This is not a version-bump detail — it is a good architectural fit for the design-token system in [Design tokens](../toolkit/design-tokens.md). Tailwind v4 compiles its theme to CSS custom properties, which is exactly the mechanism [Design tokens](../toolkit/design-tokens.md) specifies:

```css
@import "tailwindcss";

@theme {
  --a11y-target-size: 44px;
  --a11y-control-font-size: 1rem;
  --a11y-focus-width: 2px;
  --a11y-spacing-scale: 1;
}
```

Because the tokens are ordinary custom properties at runtime, applying a profile becomes a matter of re-declaring variables on a scope — no rebuild, no alternate stylesheet, no duplicate component classes. The profile system in [Accessibility profiles](../profiles/README.md) gets most of its adaptation mechanism from the platform rather than from application code, which is what [Goals](../vision/goals.md) Goal F asks for.

Tailwind remains useful for rapidly iterating on responsive layout, but it must not become a reason to scatter accessibility rules across hundreds of utility strings.

Shared design tokens and component styles should remain centralized where behavior is architectural rather than cosmetic. The rule of thumb: if a value is architectural — target size, focus width, spacing scale — it is a token in `@theme` and components reference it. If it is cosmetic and local, a utility class is fine.

### Vite

Use Vite for development and production builds.

### Testing

Recommended initial stack:

- Vitest for unit tests;
- Vue Test Utils for component tests;
- Playwright for browser/device behavior;
- axe-core integration for automated accessibility checks;
- manual testing with real browsers and assistive technologies.

The exact tool selection can be revisited if contributors have stronger alternatives.

---

## How this works in practice

### The shape of the thing

```
Native web platform
        ↓
Accessible UI components      packages/accessible-ui
        ↓
User preferences / profiles   (Phase 4)
        ↓
Calibration                   (Phase 5)
        ↓
D&D character sheet           apps/character-sheet
```

The character sheet is the reason the project exists. The toolkit is what makes the solution reusable. Neither is allowed to grow abstractions the other has not demanded.

### Why a workspace

`packages/accessible-ui` must not import from `apps/character-sheet`. Keeping them as separate packages makes that boundary a build error rather than a code-review argument.

The dependency runs one way:

```
apps/character-sheet  ──depends on──>  packages/accessible-ui
```

If you find yourself wanting a `SkillRow` inside the toolkit, that is the signal to stop and ask whether it is genuinely generic. [Components](../toolkit/components.md) covers when to promote one.

### How adaptation works

Tailwind v4 compiles its `@theme` block to CSS custom properties. Components reference those properties rather than literal values. So applying a profile is re-declaring variables on a scope:

```css
[data-profile='large-text'] {
  --a11y-font-scale: 1.5;
  --a11y-target-size: 56px;
}
```

No rebuild, no second stylesheet, no `LargeTextButton` alongside `Button`. This is the mechanism behind Goal B in the plan, and it is why the token file matters more than any individual component.

### Layer precedence

When the profile system lands (Phase 4), values resolve in this order — later wins:

```
toolkit defaults          base
browser / OS preference   seeds initial values
selected profile(s)
user customization
per-component override
```

Three preferences are exempt and may only be relaxed by explicit user action, never by loading a profile: `prefers-reduced-motion`, `forced-colors`, `prefers-reduced-transparency`. These prevent harm rather than expressing taste. See [Precedence and merging](../profiles/precedence.md).

### Storage

`StorageBackend` is an interface with one implementation (`localStorage`). The interface exists because local storage is evictable and losing a calibrated profile is a serious failure — the user has to redo calibration in an app they can no longer read. Other backends get built when something needs them, not before.

