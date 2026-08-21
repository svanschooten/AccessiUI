# Components

*What the toolkit provides, and what it deliberately omits.*

[← Documentation index](../README.md)

---

## What We Are Building

The project consists of three closely related parts.

### Accessible UI toolkit

A collection of Vue components whose baseline behavior is intentionally accessibility-aware.

Initial primitives:

#### Text and structure

- `Text`
- `Heading`
- `Link`
- `Icon`
- `VisuallyHidden`

#### Form controls

- `TextField`
- `NumberField` (never `<input type="number">` — see [Guiding principles](../principles/README.md))
- `TextArea`
- `Select`
- `Checkbox`
- `Switch`
- `RadioGroup`
- `StepChoice` — a set of named discrete options, the default control for any adaptive setting ([Settings UI](../application/settings-ui.md))
- `Slider` — detailed mode only, and always paired with a `NumberField` so drag is never the only route to a value ([Settings UI](../application/settings-ui.md) and [UX pitfalls](../ux-pitfalls.md))

#### Actions

- `Button`
- `IconButton`

#### Layout

- `Stack`
- `Row`
- `Grid`
- `Panel`
- `Card`
- `Divider`
- `ScrollArea`

#### Interaction / overlay

- `Dialog`
- `Disclosure`
- `Popover` (built on the native `popover` attribute)

`Menu` is deliberately excluded. The APG menu and menubar pattern models desktop application menus and requires roving tabindex, type-ahead, and full arrow-key semantics; it belongs on the list of high-burden custom widgets in [Known issues](../known-issues.md). It is also one of the most frequently mis-implemented patterns on the web — applied to ordinary navigation it produces worse assistive-technology output than a plain list of links. Nothing in the character sheet or the settings panel needs a true menu widget.

#### Feedback

- `Status`
- `Alert`
- `Progress`
- `LiveRegion`

The initial implementation should not attempt to produce dozens of specialized controls.

---

## Future Components

After the primitive toolkit proves itself, add higher-level components only when repeated patterns justify them.

Possible future components:

- `DiceRoller`;
- `RollResult`;
- `StatBlock`;
- `ModifierDisplay`;
- `ResourceControl`;
- `SkillRow`;
- `SavingThrowRow`;
- `ActionList`;
- `AttackList`;
- `ConditionIndicator`;
- `CharacterSummary`.

These should remain **gameplay-oriented**, not tied directly to D&D whenever the abstraction is genuinely reusable.

For example, a generic `ResourceControl` can represent:

- hit points;
- spell slots;
- stamina;
- sanity;
- ammunition.

Only create that abstraction after the D&D application has demonstrated the need.
