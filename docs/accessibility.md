# Accessibility rules for contributors

The full reasoning is in the [project plan](../accessible-ui-project-plan.md). This is the working summary.

## Non-negotiables

**Never rely on colour alone.** A failed roll is not "a red number" — it is a number plus the word "Failure". A proficient skill is not "a green dot". If you remove all colour from your component, every state must still be distinguishable. (Plan 5.3, 8.6)

**Native HTML first.** ARIA is a promise you then have to keep in JavaScript. If `<button>`, `<label>`, `<select>` or `<dialog>` does the job, use it. (Plan 5.1)

**One exception: never use `<input type="number">`.** Its spinner arrows are about 10×10px and cannot be resized, which is exactly the tiny control we tell people to avoid — in the app's most frequent interaction. It also changes value on stray scroll and trackpad gestures. Use `NumberField`, which is a text input with `inputmode="numeric"` plus full-size stepper buttons.

**Feedback goes next to its control.** Screen magnifier users see perhaps a fifth of the screen and do not get reflow. A result rendered in a status bar across the page is invisible to them: they press Roll and nothing appears to happen. (Plan 8.8)

**Updatable elements owe the user two things:** a textual description of what changed, and a way back. Use `useUpdatable`. Six large adjacent buttons pressed one-handed under time pressure *will* be mistapped. (Plan 8.7)

## Tokens, not hard-coded values

Anything accessibility-sensitive — target size, font scale, spacing, focus width, colour — comes from a token in `packages/accessible-ui/src/theme/theme.css`:

```css
.my-control {
  min-height: var(--a11y-target-size);
  font-size: calc(1rem * var(--a11y-font-scale));
}
```

This is how one component adapts to every profile. If you hard-code `min-height: 32px`, that control stops adapting and the profile system silently fails for it.

Adding a colour token means adding it to a contrast pairing in `tests/contrast.test.ts`. The completeness test fails otherwise — deliberately.

## Target sizes

WCAG 2.2 SC 2.5.8 sets a floor of 24×24 CSS pixels. We use 44px by default because this is a phone-first app used during a game, and 24px is a legal minimum rather than a design target.

## What to check before opening a pull request

```bash
npm run verify
```

Then, by hand:

- Tab through your component. Can you reach and operate everything? Is focus visible?
- Set your browser's text size to 200%. Does it still work, or does text clip?
- Narrow the window to 320px. Any horizontal scrolling?
- Turn on your OS "reduce motion" setting. Did the animation stop?
- Turn off colour (or squint). Can you still tell the states apart?

## Testing tiers

Tier 1 assertions run on every commit and should be exhaustive — they are cheap: contrast across the token matrix, accessible names, roles, states, semantics.

Tier 2 (visual snapshots) is restricted to a short list of high-risk combinations, because 300 snapshot baselines will not survive contact with a volunteer project.

Tier 3 (screen readers, real devices, magnifiers, user testing) runs per release. It is the tier that actually tells us whether any of this worked.
