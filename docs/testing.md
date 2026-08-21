# Testing

```bash
npm run verify          # lint + typecheck + test, same as CI
npm test                # tests only
npm run test:watch -w @accessible-dnd/accessible-ui
```

## What runs where

**Pure logic** (`contrast.test.ts`, `dice.test.ts`) needs no DOM. The contrast suite reads `theme.css` from disk and is marked `// @vitest-environment node`.

**Components** run in jsdom via `@vue/test-utils`. jsdom has no layout engine, so `getBoundingClientRect()` returns zeros. That means **rendered geometry cannot be asserted here** — target size, reflow at 320px, and focus-ring visibility need a real browser and belong in Playwright (not yet set up).

What jsdom *can* check, and what our component tests therefore cover: element type, accessible name, label association, `aria-describedby` wiring, native state attributes, emitted events, and clamping behaviour.

We assert target size at the *token* level instead — `--a11y-target-size` is the min-height every control uses, so checking the token checks the contract. That is not the same as measuring the rendered box, and the browser tier will eventually close that gap.

## Adding a colour

Add it to `theme.css`, then add at least one pairing in `tests/contrast.test.ts`. The completeness test fails on any colour token not covered by a pairing. This is intentional: an unvalidated colour is how a palette quietly stops meeting contrast.

## Writing a component test

Test the contract, not the markup. `expect(wrapper.element.tagName).toBe('BUTTON')` is worth having because it fails if someone "improves" the component into a `div`. Snapshot tests of rendered HTML are not worth having — they fail on every whitespace change and assert nothing about accessibility.
