# Guiding principles

*The eight rules that decide arguments.*

[← Documentation index](../README.md)

---

## Native first

Prefer native HTML controls whenever the browser already provides the required semantics and behavior.

Examples:

- `<button>` instead of a clickable `<div>`;
- `<label>` associated with `<input>`;
- `<input type="checkbox">` for a binary state;
- `<select>` for ordinary selection;
- `<details>/<summary>` for simple disclosure where it fits;
- `<dialog>` where an actual modal dialog is needed;
- the native `popover` attribute instead of a bespoke popover implementation.

### The one native control we do not use: `<input type="number">`

Native-first has exactly one documented exception, and it is worth stating explicitly because it looks like a violation of the principle.

`<input type="number">` must not be used for numeric entry. Its spinner buttons are roughly 10×10 CSS pixels and are not author-resizable, which makes it precisely the "tiny +/- control" that [UX pitfalls](../ux-pitfalls.md) tells us to avoid — and numeric entry is the single most frequent interaction in a character sheet. It has further problems documented by the GOV.UK Design System team after user testing: a scroll wheel or trackpad gesture passing over the field silently changes the value, and there are zoom and autofill issues on top.

Use instead:

```html
<input type="text" inputmode="numeric" enterkeyhint="done">
```

Use `inputmode="decimal"` where fractional values are possible. This still summons the numeric keypad on phones. Pair it with the large explicit stepper buttons described in [Interaction principles](../application/interaction-principles.md) rather than relying on browser-supplied spinners.

The principle is unchanged: prefer the native control when the browser implements the behavior correctly. `type="number"` is the case where it does not.

WAI-ARIA must not be used as a substitute for native HTML. The WAI-ARIA Authoring Practices Guide explicitly emphasizes that a custom ARIA role is a behavioral promise: authors must provide the corresponding interaction behavior themselves.

## Accessibility is part of the component contract

Accessibility is not a separate theme.

A component is considered complete only when its semantics, keyboard behavior, focus behavior, touch behavior, scaling, and visual states have been considered.

## Never rely on color alone

Color may reinforce meaning but must not be the sole carrier of information.

For example, a failed roll should not be represented only by a red number. It should also have an explicit state such as “Failure” or an icon/text indicator.

This is particularly important for color vision deficiency. MDN explicitly recommends using additional text or indicators instead of relying on red/green distinctions alone.

## Respect browser and operating-system preferences

The project should not fight accessibility features the platform already provides.

It should respond appropriately to features such as:

- `prefers-reduced-motion`;
- `prefers-contrast`;
- `forced-colors`;
- `prefers-color-scheme`;
- `prefers-reduced-transparency`;
- `inverted-colors`;
- browser zoom and text scaling.

These media features are now widely supported, although exact support still varies by browser/platform.

## WCAG is the floor, not the UX ceiling

WCAG 2.2 AA should be the minimum engineering baseline. The project should then test whether users can actually use the interface comfortably.

WCAG covers critical requirements including use of color, contrast, text resizing, reflow, keyboard operation, animation, focus, and target size.

## Customize instead of assuming

A profile labelled “low vision” should be treated as a starting point, not a universal answer.

Two people with similar visual impairment may prefer different font sizes, spacing, colors, contrast, or interaction patterns.

## Prefer reversible adaptations

Accessibility settings should be easy to change and easy to reset. Users should never have to “commit” to a particular profile permanently.

## Avoid unnecessary movement

Motion should be functional, restrained, and compatible with reduced-motion preferences. The browser already exposes `prefers-reduced-motion`; the application should honor it.
