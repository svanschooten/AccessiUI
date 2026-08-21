# Goals

*The seven things v1 must achieve.*

[← Documentation index](../README.md)

---

## Primary goals

### Goal A — Build accessible UI primitives

Create a small, reusable component library that improves the baseline usability of common controls without requiring developers to understand every accessibility concern themselves.

Components should prefer native HTML semantics and browser behavior. Custom ARIA should be used only where native HTML cannot represent the needed behavior or where it is required to expose dynamic state correctly.

### Goal B — Make the components adaptable

Components should respond to a user profile without developers creating separate components for every accessibility need.

There should be one `Button`, not `NormalButton`, `LowVisionButton`, `ColorBlindButton`, etc.

### Goal C — Support user customization

A user should be able to:

- start from a preset profile;
- modify individual settings;
- combine useful settings;
- preview the result;
- save the result locally;
- export/import the profile as JSON;
- reset to defaults.

### Goal D — Build a real interactive D&D character sheet

The first application must be genuinely usable during play, not merely a demonstration of components.

At minimum it should support editable character values, derived presentation, common proficiencies, and click-to-roll actions.

### Goal E — Work well on phones

The primary use case is a phone held in a hand during a D&D session.

The UI must therefore prioritize:

- large targets;
- low precision requirements;
- stable layout;
- clear focus/selection states;
- minimal accidental interactions;
- browser zoom;
- portrait orientation;
- one-handed use where practical;
- graceful operation with external keyboards and assistive technologies.

### Goal F — Remain web-native

The project should exploit the platform rather than recreate it.

The implementation should use:

- semantic HTML;
- standard form controls;
- CSS media queries for user preferences;
- browser zoom;
- OS/browser high-contrast and forced-colors behavior;
- native focus behavior;
- native keyboard behavior;
- accessible names and descriptions;
- standard live regions where appropriate.

Vue should primarily organize components and state, not replace native behavior unnecessarily.

### Goal G — Build a foundation volunteers can safely extend

A future contributor should be able to add a component or profile without first understanding the entire application.

The repository should clearly separate:

- component implementation;
- styling/design tokens;
- accessibility profile definitions;
- calibration logic;
- D&D application logic;
- tests;
- documentation.
