# UX pitfalls

*Mistakes this project must not make.*

[← Documentation index](README.md)

---

## Accessibility settings hidden behind tiny controls

The settings entry point must itself be accessible.

## “High contrast” implemented as only black and white

High contrast is about distinguishability and legibility, not a single predefined color pair.

## Relying on hover

Mobile users may not have hover at all.

## Icon-only controls without an accessible name

An icon is not a reliable substitute for a label.

## Color-only proficiency indicators

A proficient skill cannot merely have a green dot next to it.

Use text, shape, and/or iconography in addition to color.

## Tiny +/- controls

Number adjustments are particularly common in a D&D sheet and should have comfortable interaction targets.

## Requiring precise dragging

A slider may be useful, but every critical setting should have a precise non-drag interaction if practical.

## Over-animation

Dice may be fun to animate, but the result must not depend on animation.

## Too many simultaneous settings

The profile editor should use progressive disclosure so a first-time user does not face twenty technical knobs at once.

## Confusing user preferences with application data

The character and accessibility profile should remain separate objects.
