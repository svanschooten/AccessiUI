# Settings UI

*Simple mode, detailed mode, and the bootstrapping constraint.*

[← Documentation index](../README.md)

---

The settings interface should itself be built from the accessible UI toolkit.

It should be reachable from a persistent, prominent control on mobile.

## The bootstrapping constraint

The settings panel is subject to a requirement no other screen has:

> **The settings UI must be operable at every configuration it is capable of producing, including the extremes — and at the user's current configuration, whatever state that is in.**

Someone who cannot read the text or hit the targets is exactly the person who needs to reach these controls. If the panel becomes unusable at 400% text scale, or requires a drag gesture from someone who cannot drag, the user is locked out of the one screen that could fix it.

This rules out drag-only interactions as the *primary* control for any setting, and it is why the default mode below uses discrete named steps.

## Simple mode (default)

Each setting is a set of named discrete steps, operated by ordinary buttons or a radio group. No dragging, no typing, and every option has a label a person can read aloud.

```text
Accessibility Settings

Profile
[ My Profile ▼ ]

Text size
[ Small ][ Medium ][ Large ][ Larger ][ Largest ]
                      ▲ current
      Aa  ← live sample, inline

Spacing
[ Tight ][ Normal ][ Roomy ][ Roomiest ]
      ▤  ← live sample, inline

Control size
[ Standard ][ Large ][ Extra large ]
      [ Sample ]  ← live sample, inline

Contrast
[ System ][ Normal ][ More ][ Custom ]

Color support
[ Default ▼ ]

Motion
[ System ][ Reduced ][ Normal ]

Focus visibility
[ Standard ][ Strong ][ Strongest ]

[ Detailed settings… ]

[ Save profile ]  [ Reset ]
```

Note that there is no single `[ Preview ]` button. Per [Component contract](../toolkit/component-contract.md), each setting carries its own live sample inline, so a magnifier user can see a control and its effect in the same viewport. The character-sheet preview from the calibration wizard remains available, but it supplements these samples rather than replacing them.

Discrete steps have a second benefit beyond operability: they make the calibration wizard's output reproducible and far easier to describe in an exported profile, in a bug report, or over the phone to someone helping.

## Detailed mode

Discrete steps trade precision for operability, and for some users that trade is wrong — a person who knows they want 1.35× and not 1.5× should be able to say so.

Detailed mode is therefore available behind a single control, and exposes the same settings as sliders and numeric inputs with the full underlying range.

Rules for detailed mode:

- it is **opt-in** and never the default;
- it is reachable from simple mode, and simple mode is always reachable back from it;
- every slider in it has an adjacent numeric field, so drag is never the only route to a value;
- numeric fields follow [Guiding principles](../principles/README.md) — `inputmode="numeric"`, with steppers;
- values set here are preserved when returning to simple mode; the simple control shows the nearest named step and indicates that a custom value is active.

This is the [UX pitfalls](../ux-pitfalls.md) principle applied to the settings panel itself: progressive disclosure, so a first-time user is not confronted with twenty technical knobs, while a user who wants the knobs can have them.

The result is best-effort accessibility by default, with full control one action away.
