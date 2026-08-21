# Architecture

## The shape of the thing

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

## Why a workspace

`packages/accessible-ui` must not import from `apps/character-sheet`. Keeping them as separate packages makes that boundary a build error rather than a code-review argument.

The dependency runs one way:

```
apps/character-sheet  ──depends on──>  packages/accessible-ui
```

If you find yourself wanting a `SkillRow` inside the toolkit, that is the signal to stop and ask whether it is genuinely generic. Section 27 of the plan covers when to promote a component.

## How adaptation works

Tailwind v4 compiles its `@theme` block to CSS custom properties. Components reference those properties rather than literal values. So applying a profile is re-declaring variables on a scope:

```css
[data-profile='large-text'] {
  --a11y-font-scale: 1.5;
  --a11y-target-size: 56px;
}
```

No rebuild, no second stylesheet, no `LargeTextButton` alongside `Button`. This is the mechanism behind Goal B in the plan, and it is why the token file matters more than any individual component.

## Layer precedence

When the profile system lands (Phase 4), values resolve in this order — later wins:

```
toolkit defaults          base
browser / OS preference   seeds initial values
selected profile(s)
user customization
per-component override
```

Three preferences are exempt and may only be relaxed by explicit user action, never by loading a profile: `prefers-reduced-motion`, `forced-colors`, `prefers-reduced-transparency`. These prevent harm rather than expressing taste. See plan section 12.2.

## Storage

`StorageBackend` is an interface with one implementation (`localStorage`). The interface exists because local storage is evictable and losing a calibrated profile is a serious failure — the user has to redo calibration in an app they can no longer read. Other backends get built when something needs them, not before.
