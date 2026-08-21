# Testing

```bash
npm run verify          # lint + typecheck + unit tests
npm run test:e2e        # browser tier (needs `npx playwright install chromium` once)
npm run test:e2e:ui     # same, with the Playwright inspector
npm run test:watch -w @accessible-dnd/accessible-ui
```

CI runs both, as two jobs: `verify` for the fast tier and `browser` for Playwright.

## What runs where

**Pure logic** (`contrast.test.ts`, `dice.test.ts`) needs no DOM. The contrast suite reads `theme.css` from disk and is marked `// @vitest-environment node`.

**Components** run in jsdom via `@vue/test-utils`. jsdom has no layout engine, so `getBoundingClientRect()` returns zeros. Rendered geometry cannot be asserted there.

What jsdom *can* check, and what the component tests therefore cover: element type, accessible name, label association, `aria-describedby` wiring, native state attributes, emitted events, and clamping behaviour.

**Browser tests** (`tests/e2e/`) run in real Chromium, in two projects — a Pixel 7 viewport and desktop. They cover what jsdom cannot:

| Spec | What it proves |
| --- | --- |
| `target-size` | Controls measure at least 44px *as rendered* |
| `reflow` | No sideways scroll at 320px or 200% text; controls grow with the scale token |
| `keyboard` | Every control is Tab-reachable and operable; focus is visible |
| `adjacency` | Feedback lands within a magnified viewport of its control (plan 8.8) |
| `preferences` | Reduced motion, increased contrast, and forced colors are honoured |
| `axe` | Automated rule scan, at rest, after interaction, and at 200% |

The token tier and the browser tier assert *different* claims, and both are needed. `--a11y-target-size: 44px` in the token file is not the same statement as "this button renders 44px tall" — a tree-shaken token, a component that forgets to reference it, or a squashed layout all leave the first true and the second false. That exact failure has already happened once here.

Axe catches a minority of accessibility problems. It sees a missing accessible name; it cannot see whether the name is useful, whether the reading order makes sense, or whether a magnifier user can find the result.

## Adding a colour

Add it to `theme.css`, then add at least one pairing in `tests/contrast.test.ts`. The completeness test fails on any colour token not covered by a pairing. This is intentional: an unvalidated colour is how a palette quietly stops meeting contrast.

## Writing a component test

Test the contract, not the markup. `expect(wrapper.element.tagName).toBe('BUTTON')` is worth having because it fails if someone "improves" the component into a `div`. Snapshot tests of rendered HTML are not worth having — they fail on every whitespace change and assert nothing about accessibility.
