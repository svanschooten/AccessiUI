# Accessible UI Toolkit — Project Plan

**Status:** Proposal / project foundation  
**Audience:** Volunteer developers, accessibility contributors, designers, testers, D&D players, and future maintainers  
**Primary application:** Interactive, accessibility-first D&D character sheet  
**Primary platform:** Web / mobile browser  
**Initial implementation:** Vue 3 + TypeScript + Vite + Tailwind CSS, with native HTML semantics wherever practical  
**Primary accessibility target:** WCAG 2.2 AA as the minimum baseline, with deliberate experimentation beyond WCAG where real users benefit  
**Current scope:** UI toolkit + accessibility profiles + D&D character sheet  
**Explicit non-goal for v1:** A generic RPG/game-system engine

---

## 1. Executive Summary

This project started from a simple practical problem: make it easier for a friend with impaired vision to play D&D using a character sheet that is comfortable to operate on a phone.

The project should remain grounded in that goal.

The first release is therefore **not** a generic RPG framework, a rules engine, or a replacement for existing virtual tabletops. It is an **open, accessibility-first web UI toolkit**, demonstrated through a useful first application: an interactive D&D character sheet.

The toolkit will provide accessible versions of common UI primitives such as:

- buttons;
- text and number fields;
- checkboxes and switches;
- select controls;
- sliders;
- dialogs and disclosures;
- headings, status messages, and live announcements;
- layout primitives;
- navigation and focus behavior.

Accessibility will be built into these components rather than added as a collection of optional patches afterwards.

On top of the toolkit, the D&D application will provide:

- editable character information;
- ability scores and modifiers;
- saving throws;
- skills and proficiency state;
- combat statistics;
- hit points and other common resources;
- clickable dice rolls;
- readable roll results;
- persistent local character data;
- accessibility settings and user profiles.

The profile system will support both **known starting profiles** and **individual calibration/customization**. A profile is a collection of interface preferences and adaptations, not a medical diagnosis. A user may start from a community profile such as “large text” or “red-green color vision” and then tune individual settings.

The architecture deliberately leaves the game model relatively simple for the first implementation. Once the UI toolkit and accessibility profile system have proven themselves, the character-sheet model can be generalized into a separate, generic game schema without forcing that complexity into the first milestone.

---

# 2. Vision

The long-term vision is an open-source UI toolkit where accessibility is a **first-class design property** of every component.

The project should make it easy to build interfaces that adapt to different visual, motor, cognitive, and interaction needs while retaining ordinary browser semantics and interoperability with assistive technologies.

The D&D character sheet is the first application because it is concrete, motivating, and rich enough to exercise many UI problems at once. It is a reference implementation, not the final purpose of the toolkit.

The project should eventually answer questions such as:

- How should a button behave when the user needs a much larger target?
- How should a numeric field work for somebody who struggles with precision touch input?
- How should game-state information be represented when color cannot be relied on?
- How should a dice roll be communicated visually, through a screen reader, and potentially through speech?
- How should a dense character sheet reflow when text is increased to 200–400%?
- Which settings can be inferred from browser/OS preferences, and which need explicit user choice?
- How can a user save, export, and share their customized accessibility configuration?

These questions should be answered experimentally, backed by standards and testing, rather than by assuming that one “accessibility mode” works for everyone.

---

# 3. Core Goals

## 3.1 Primary goals

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

---

# 4. Non-Goals for v1

Keeping scope under control is important.

The following should **not** be part of the first major milestone:

- a generic RPG rules engine;
- Pathfinder/Call of Cthulhu/etc. support;
- campaign management;
- multi-user synchronization;
- cloud accounts;
- real-time multiplayer;
- a DM dashboard;
- inventory/equipment databases sourced from external services;
- automatic character import from every existing platform;
- automated medical/disability diagnosis;
- automatic inference of a user's disability;
- a claim that one preset profile represents everyone with a specific impairment;
- a formal accessibility standard or standards-body submission;
- internationalization or localization;
- a public theming API for third-party consumers;
- server-side rendering.

These may become future projects or follow-up phases once the fundamentals are stable.

---

# 5. Guiding Principles

## 5.1 Native first

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

`<input type="number">` must not be used for numeric entry. Its spinner buttons are roughly 10×10 CSS pixels and are not author-resizable, which makes it precisely the "tiny +/- control" that section 24.6 tells us to avoid — and numeric entry is the single most frequent interaction in a character sheet. It has further problems documented by the GOV.UK Design System team after user testing: a scroll wheel or trackpad gesture passing over the field silently changes the value, and there are zoom and autofill issues on top.

Use instead:

```html
<input type="text" inputmode="numeric" enterkeyhint="done">
```

Use `inputmode="decimal"` where fractional values are possible. This still summons the numeric keypad on phones. Pair it with the large explicit stepper buttons described in section 26.4 rather than relying on browser-supplied spinners.

The principle is unchanged: prefer the native control when the browser implements the behavior correctly. `type="number"` is the case where it does not.

WAI-ARIA must not be used as a substitute for native HTML. The WAI-ARIA Authoring Practices Guide explicitly emphasizes that a custom ARIA role is a behavioral promise: authors must provide the corresponding interaction behavior themselves.

## 5.2 Accessibility is part of the component contract

Accessibility is not a separate theme.

A component is considered complete only when its semantics, keyboard behavior, focus behavior, touch behavior, scaling, and visual states have been considered.

## 5.3 Never rely on color alone

Color may reinforce meaning but must not be the sole carrier of information.

For example, a failed roll should not be represented only by a red number. It should also have an explicit state such as “Failure” or an icon/text indicator.

This is particularly important for color vision deficiency. MDN explicitly recommends using additional text or indicators instead of relying on red/green distinctions alone.

## 5.4 Respect browser and operating-system preferences

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

## 5.5 WCAG is the floor, not the UX ceiling

WCAG 2.2 AA should be the minimum engineering baseline. The project should then test whether users can actually use the interface comfortably.

WCAG covers critical requirements including use of color, contrast, text resizing, reflow, keyboard operation, animation, focus, and target size.

## 5.6 Customize instead of assuming

A profile labelled “low vision” should be treated as a starting point, not a universal answer.

Two people with similar visual impairment may prefer different font sizes, spacing, colors, contrast, or interaction patterns.

## 5.7 Prefer reversible adaptations

Accessibility settings should be easy to change and easy to reset. Users should never have to “commit” to a particular profile permanently.

## 5.8 Avoid unnecessary movement

Motion should be functional, restrained, and compatible with reduced-motion preferences. The browser already exposes `prefers-reduced-motion`; the application should honor it.

---

# 6. Research Foundation

This project should maintain a living research/standards document as implementation proceeds. The initial foundation is below.

## 6.1 WCAG 2.2

WCAG 2.2 is the primary standards baseline.

Relevant areas include:

- **1.3 Adaptable** — preserve relationships and meaningful sequence;
- **1.4.1 Use of Color** — do not use color as the only visual means of conveying information;
- **1.4.3 Contrast (Minimum)**;
- **1.4.4 Resize Text**;
- **1.4.10 Reflow**;
- **1.4.11 Non-text Contrast**;
- **1.4.12 Text Spacing**;
- **2.1 Keyboard Accessible**;
- **2.2.2 Pause, Stop, Hide**;
- **2.2.3 No Timing**;
- **2.3 Seizures and Physical Reactions**;
- **2.3.3 Animation from Interactions**;
- **2.4 Navigable**;
- **2.4.7 Focus Visible**;
- **2.4.11 Focus Not Obscured (Minimum)**;
- **2.4.12 Focus Not Obscured (Enhanced)**;
- **2.4.13 Focus Appearance**;
- **2.5.3 Label in Name**;
- **2.5.7 Dragging Movements**;
- **2.5.8 Target Size (Minimum)**;
- **3.3 Input Assistance**;
- **4.1 compatibility-related requirements where applicable**.

WCAG 2.2 currently defines a minimum pointer target size of 24×24 CSS pixels under its Target Size (Minimum) criterion, subject to exceptions. The toolkit should generally use considerably larger targets as a deliberate usability choice, especially for phone use.

## 6.2 WAI-ARIA and the Authoring Practices Guide

The Accessible Rich Internet Applications specification and the WAI-ARIA Authoring Practices Guide are references for semantics and widget behavior.

The APG provides patterns for components such as buttons, checkboxes, sliders, dialogs, disclosures, menus, grids, and tabs. It also provides guidance on accessible names and descriptions.

Important rule: if native HTML can implement the control correctly, prefer native HTML. The APG itself warns that incorrectly applied ARIA can misrepresent the interface to assistive technology.

## 6.3 Native browser accessibility features

The toolkit should actively integrate with browser behavior rather than replace it.

Important current platform features include:

- `prefers-reduced-motion`;
- `prefers-contrast`;
- `forced-colors`;
- `prefers-color-scheme`;
- `prefers-reduced-transparency`;
- `inverted-colors`;
- `scripting`;
- CSS system colors such as `Canvas`, `CanvasText`, `ButtonFace`, and `ButtonText` where appropriate.

`forced-colors` is especially important because browsers can expose OS-selected high-contrast/forced-color palettes and authors are expected to make small targeted adjustments rather than recreate a separate forced-colors design system.

## 6.4 Low vision and disability-specific requirements

W3C's Accessibility Initiative maintains disability-specific research, including research for low vision and cognitive/learning disabilities. The project should treat these resources as research inputs rather than assuming that WCAG alone captures the complete user experience.

## 6.5 Touch and slider behavior

Complex touch widgets deserve special testing. The WAI-ARIA APG warns that some touch-based assistive technology interactions with slider patterns may not reliably synthesize the keyboard behavior expected by sliders. This is a strong argument for minimizing custom controls and testing every advanced control on real mobile devices with assistive technology enabled.

## 6.6 D&D content and licensing

The first application should use rules/content that the project is actually permitted to redistribute.

As of the current D&D Beyond SRD documentation, SRD 5.2.1 is available under Creative Commons and is explicitly intended as a foundation for third-party products. The official page also states that future SRD versions will continue under Creative Commons. The project should use the current official SRD where rules content is required, include the required attribution, and avoid copying protected presentation/text from proprietary character-sheet products.

The application should be described as D&D-compatible rather than implying endorsement by Wizards of the Coast unless such endorsement actually exists.

### The required attribution string

CC-BY-4.0 obliges us to reproduce a specific sentence. Record it in the repository now, before any SRD content lands:

> This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd.

The license also states that no *other* attribution to Wizards or its affiliates should be included. Adding a well-meant extra credit line is itself a license violation, so the wording above should be treated as fixed text rather than a template.

---

# 7. What We Are Building

The project consists of three closely related parts.

## 7.1 Accessible UI toolkit

A collection of Vue components whose baseline behavior is intentionally accessibility-aware.

Initial primitives:

### Text and structure

- `Text`
- `Heading`
- `Link`
- `Icon`
- `VisuallyHidden`

### Form controls

- `TextField`
- `NumberField` (never `<input type="number">` — see section 5.1)
- `TextArea`
- `Select`
- `Checkbox`
- `Switch`
- `RadioGroup`
- `StepChoice` — a set of named discrete options, the default control for any adaptive setting (section 16.2)
- `Slider` — detailed mode only, and always paired with a `NumberField` so drag is never the only route to a value (sections 16.3, 24.7)

### Actions

- `Button`
- `IconButton`

### Layout

- `Stack`
- `Row`
- `Grid`
- `Panel`
- `Card`
- `Divider`
- `ScrollArea`

### Interaction / overlay

- `Dialog`
- `Disclosure`
- `Popover` (built on the native `popover` attribute)

`Menu` is deliberately excluded. The APG menu and menubar pattern models desktop application menus and requires roving tabindex, type-ahead, and full arrow-key semantics; it belongs on the list of high-burden custom widgets in section 23.6. It is also one of the most frequently mis-implemented patterns on the web — applied to ordinary navigation it produces worse assistive-technology output than a plain list of links. Nothing in the character sheet or the settings panel needs a true menu widget.

### Feedback

- `Status`
- `Alert`
- `Progress`
- `LiveRegion`

The initial implementation should not attempt to produce dozens of specialized controls.

---

# 8. Component Contract

Every interactive component should document and test at least the following.

## 8.1 Semantics

- What native HTML element is used?
- What accessible role/state/value does it expose?
- How is it named?
- How are descriptions/errors associated?

Interactive controls must have an accessible name. The APG gives explicit guidance on naming controls and warns that careless use of `aria-label` can hide useful descendant content from assistive technology.

## 8.2 Keyboard behavior

Every interactive component should define:

- Tab behavior;
- Enter behavior;
- Space behavior;
- Arrow behavior where appropriate;
- Escape behavior where appropriate;
- focus movement;
- focus restoration after dialogs/menus.

## 8.3 Pointer/touch behavior

Every interactive target should:

- have an appropriately large target;
- avoid requiring precise dragging where not essential;
- tolerate accidental taps where practical;
- provide an alternative to gestures that are difficult or impossible for some users.

WCAG 2.2 specifically addresses dragging movements and minimum target size.

## 8.4 Focus behavior

Focus must be:

- visible;
- sufficiently contrasted;
- not clipped;
- not obscured by overlays/sticky UI;
- predictable;
- restored appropriately after transient interactions.

## 8.5 Scaling

Components must survive:

- browser zoom;
- increased root font size;
- increased line height;
- larger spacing;
- 200% text enlargement;
- 400% zoom/reflow testing for relevant layouts.

Do not use JavaScript to fake browser zoom. Use relative CSS units and responsive layout.

## 8.6 State

Every state should be perceivable without relying on color alone.

Examples:

- checked/unchecked;
- selected/unselected;
- enabled/disabled;
- valid/invalid;
- success/failure;
- expanded/collapsed;
- loading/complete.

## 8.7 Change feedback and reversibility

Any component that mutates a value the user cares about is an **updatable element**, and updatable elements carry two extra obligations beyond the ones above.

**Textual change feedback.** When the value changes, the component must be able to render what changed as text, adjacent to the control that changed it. Not a colour flash, not an animation, not only a distant status bar. Whether this feedback is shown is profile-configurable — some users will want it always, some only for destructive changes, some not at all — but every updatable component must be *capable* of it.

**A route back.** Section 8.3 requires controls to "tolerate accidental taps." That requirement needs a mechanism, not just an intention. Large adjacent targets operated one-handed under time pressure will be mistapped; this is the expected case, not an edge case. An updatable element should therefore offer a way to undo its last change.

Combined, these give a single pattern:

```text
Hit Points

Current: 29 / 42

  −5 → 29 HP   [ Undo ]
```

One line does four jobs: it satisfies 8.3, it gives the change a text representation for assistive technology, it places the feedback next to the control that caused it (see 8.8), and it makes the change reversible.

This generalizes past hit points to every resource, toggle, and stepper in the application — spell slots, proficiency toggles, ability scores, conditions.

## 8.8 Magnification

Components must survive **screen magnification**, which is a different mechanism from browser zoom and is not covered by the scaling requirements in 8.5.

Magnifier software — ZoomText, macOS Zoom, Android magnification, commonly 2×–16× — does not reflow the layout at all. The user pans a small window across an unchanged page and may see a fifth of the screen or less at any moment. Every reflow fix listed in section 23.7 does nothing for them.

The design rule that follows:

> **Feedback appears adjacent to the control that caused it.**

Concretely:

- a dice result renders next to the button that rolled it, not only in a status region elsewhere on the page;
- the settings preview updates a sample control sitting inline beside each setting, rather than in a single preview pane below the whole stack;
- nothing important is communicated by a toast or banner anchored to a page corner;
- validation errors sit with their field, not only in a summary at the top.

A live region may still be used in addition, for screen-reader users. It must not be the only place the information appears.

This constrains layout, so it is much cheaper to decide now than to retrofit.

---

# 9. Design Tokens

The toolkit should centralize accessibility-sensitive values in CSS custom properties.

Example categories:

```text
Typography
    font family
    base size
    scale
    weight
    line height
    letter spacing

Spacing
    spacing scale
    control padding
    section gap
    content width

Interaction
    minimum target size
    target spacing
    control height

Focus
    focus color
    focus width
    focus offset
    focus style

Color
    text
    surface
    control surface
    border
    primary
    selected
    success
    warning
    error

Motion
    transition duration
    animation duration
    animation policy

Elevation / decoration
    shadows
    borders
    radius
```

A component should use tokens, not hard-coded accessibility values wherever practical.

Example:

```css
.a-button {
  min-height: var(--a11y-target-size);
  padding-inline: var(--a11y-control-padding-inline);
  border-width: var(--a11y-border-width);
  font-size: var(--a11y-control-font-size);
}
```

This is the mechanism by which profiles adapt the library.

---

# 10. Accessibility Profiles

## 10.1 Profile philosophy

Profiles are **collections of UI preferences/adaptations**, not diagnoses.

For example:

- `large-text`;
- `high-contrast`;
- `reduced-motion`;
- `large-targets`;
- `red-green-color-vision`;
- `monochrome/high visual simplification`.

A profile should contain a description and explain that it is a starting point.

It must not imply that all users with a particular disability need identical settings.

## 10.2 Profile structure

Initial JSON example:

```json
{
  "$schema": "https://example.org/accessibility-profile.schema.json",
  "formatVersion": 1,
  "id": "large-text",
  "name": "Large Text",
  "description": "A starting profile for users who benefit from larger text and controls.",
  "tags": ["vision", "low-vision", "text-size"],
  "settings": {
    "typography": {
      "scale": 1.5,
      "lineHeight": 1.5,
      "weight": 500
    },
    "spacing": {
      "scale": 1.25
    },
    "interaction": {
      "targetSize": 56
    },
    "focus": {
      "width": 3,
      "offset": 3
    },
    "motion": {
      "preference": "system"
    },
    "color": {
      "mode": "system"
    }
  }
}
```

## 10.3 Recommended profile categories

### Visual size

- text scale;
- heading scale;
- control text scale;
- line height;
- letter spacing;
- font weight;
- content spacing.

### Contrast

- normal/system/high/custom contrast;
- border strength;
- focus strength;
- background treatment.

Contrast needs a stated method, not visual intuition. Section 41 asks how to test palettes scientifically; this is the answer the project should adopt.

**Contrast is a property of a triple, not a colour pair.** Legibility depends on foreground colour, background colour, *and* the size and weight of the text drawn in it. Section 9 currently separates colour, typography, and spacing into independent token groups that are never evaluated together, which makes it structurally impossible to check. Define a contrast token as:

```text
(foreground, background, minimum size, minimum weight)
```

**Validate the matrix in CI.** Walk every colour token against every type token, for every shipped profile and every profile combination the merge rules can produce. This is a computation over a finite space, not a judgement call, and it is the only honest way to answer whether a given profile combination is safe. It is also cheap — it needs no screenshots and no browser.

**The computed result is a floor, not the setting.** This is deliberate and should not be optimized away. Automated validation establishes that a palette is not broken; it does not establish that a palette is comfortable, and those are different questions. Explicit user configuration of contrast remains a first-class feature precisely so that the project can calibrate against real preferences with people who have relevant lived experience, rather than shipping whatever a ratio calculation permits.

WCAG 2.x contrast ratios are the practical baseline for the CI check. APCA is worth watching but belongs in the research backlog (section 39) rather than in a milestone — WCAG 3 is not close to stable.

### Color

- color palette;
- color-independent state indicators;
- color-vision-supporting palettes;
- optional developer simulation mode.

The application should primarily eliminate reliance on color rather than applying a page-wide color transformation filter.

### Motion

- system preference;
- reduced animation;
- reduced transitions;
- disable decorative motion;
- optionally replace animated dice with a static result representation.

### Interaction

- minimum target size;
- spacing between targets;
- button density;
- precision requirements;
- gesture alternatives.

### Focus/navigation

- focus width;
- focus offset;
- focus contrast;
- whether focus is accompanied by additional visual text/state.

### Audio

Future capability:

- speak important state changes;
- announce dice results;
- read focused field information;
- optional sound cues.

Audio must never be the only channel for information.

### Layout

Future capabilities:

- single-column mode;
- dense/comfortable spacing;
- simplified navigation;
- reduced peripheral decoration.

---

# 11. Browser/OS Preference Integration

Profiles should be able to use system preferences as defaults rather than overriding them blindly.

Relevant browser capabilities include:

```css
@media (prefers-reduced-motion: reduce) {
  /* remove non-essential animation */
}

@media (prefers-contrast: more) {
  /* strengthen boundaries/focus where useful */
}

@media (forced-colors: active) {
  /* make only targeted adjustments needed for compatibility */
}

@media (prefers-color-scheme: dark) {
  /* dark-theme defaults */
}
```

These should be treated as inputs to the profile system, not replaced by application-specific copies. MDN documents these media features as current web platform capabilities, with varying degrees of browser/platform support.

---

# 12. Profile Precedence and Overrides

The implementation should make precedence deterministic.

## 12.1 Layer order

Later layers win. Toolkit defaults are the base of the stack, not a layer above the platform:

```text
built-in toolkit defaults          base layer
        ↓
browser / OS preference            seeds initial values
        ↓
selected profile(s)
        ↓
user customizations
        ↓
explicit per-component override
```

The ordering matters and is easy to get backwards. Toolkit defaults must sit *below* browser and OS preferences, because a default that overrides the operating system is a bug, not a default. Platform preferences are read as inputs that seed the initial value of a setting; every layer above them represents a choice the user has actually made.

## 12.2 Protected preferences

Three platform preferences are harm-avoidance settings rather than aesthetic ones, and they are exempt from ordinary layer precedence:

```text
prefers-reduced-motion
forced-colors
prefers-reduced-transparency
```

These may be relaxed only by an explicit, deliberate user action taken in the settings UI. They must never be changed as a side effect of loading, importing, or combining a profile.

The reason is that reduced motion in particular is not a preference in the way a font size is. For a user with a vestibular disorder, unexpected animation can cause nausea or a migraine. A profile that silently re-enables it has caused physical harm, and a shared or imported profile is exactly the vector by which that would happen.

Where a user does explicitly override a protected preference, the settings UI should say plainly what is being overridden and offer a one-action route back.

## 12.3 Merge semantics

Merge rules apply *within* a layer, not across layers. This distinction is what keeps adaptations reversible.

When two or more profiles are active at the same layer, combine by safest value:

```text
font scale        -> max
spacing scale     -> max
minimum target    -> max
reduced motion    -> OR
color dependency  -> OR
```

When two profiles disagree on a property that has no meaningful "safest" value, the later-selected profile replaces the earlier:

```text
font family       -> override
color palette     -> override
contrast theme    -> override
```

The layer above — user customization — sets absolute values that **replace** whatever the profile layer produced. It is not subject to max-merge.

This matters because the alternative fails a common case. A user loads a "Large Text" profile at 1.5×, finds it slightly too large, and asks for 1.25×. If max-merge applied to their own adjustment, they could not have it: the profile's value would act as a floor and a starting point would have quietly become a commitment. That directly contradicts section 5.7.

Stated as a rule: **profiles combine conservatively with each other; the user always has the final word over the result.**

The project should not silently merge conflicting profiles without making the result deterministic and explainable. The settings UI should be able to show, for any given setting, which layer supplied its current value.

---

# 13. Calibration System

Preset profiles are useful, but calibration is central to the long-term vision.

## 13.1 Principle

Do not ask the user to diagnose themselves if the application can ask about the actual desired outcome.

Bad question:

> Do you have low vision?

Better:

> Which text size is easiest for you to read?

Bad question:

> How severe is your impairment?

Better:

> Which button size is easiest to press accurately?

## 13.2 Initial calibration wizard

### Step 1 — Text

Show several sizes and spacing combinations.

User picks preferred presentation.

### Step 2 — Controls

Show several target sizes and spacing combinations.

User chooses the easiest to interact with.

### Step 3 — Contrast

Show representative controls and states.

User chooses the clearest option.

### Step 4 — Color dependence

Show states that would traditionally use color only.

Confirm that icon/text labels remain understandable.

### Step 5 — Motion

Show a subtle animation and a static alternative.

Allow the user to choose or defer to system preference.

### Step 6 — Preview

Render an actual character-sheet preview with the selected settings.

### Step 7 — Save

Create a custom JSON profile.

---

# 14. Profile Library

The repository should eventually contain a curated profile library.

Initial candidate profiles:

```text
profiles/
├── visual/
│   ├── large-text.json
│   ├── high-contrast.json
│   ├── red-green-color-vision.json
│   ├── blue-yellow-color-vision.json
│   └── monochrome.json
│
├── motion/
│   └── reduced-motion.json
│
├── motor/
│   └── large-targets.json
│
└── combinations/
    └── low-vision-starting-point.json
```

The exact taxonomy should remain conservative until informed by user research.

Each profile must include:

- human-readable name;
- description;
- intended use;
- limitations;
- affected settings;
- version;
- author/contributor information where appropriate;
- research references;
- testing status.

A profile should not be promoted to “recommended” solely because it was proposed by a developer.

---

# 15. D&D Application Scope

The first application should be intentionally small but useful.

## 15.1 Character information

- character name;
- player name;
- class;
- subclass where relevant;
- level;
- species/ancestry/race depending on the chosen ruleset terminology;
- background;
- alignment where desired;
- experience points where applicable;
- free-form notes.

## 15.2 Ability scores

- Strength;
- Dexterity;
- Constitution;
- Intelligence;
- Wisdom;
- Charisma.

Each should display:

- editable ability score;
- derived modifier;
- a clearly labelled roll action.

## 15.3 Saving throws

Each saving throw should expose:

- associated ability;
- proficiency state;
- resulting modifier;
- roll action.

## 15.4 Skills

The first implementation should support the standard 5e skill set used by the selected ruleset.

Each skill should expose:

- name;
- associated ability;
- proficiency/expertise state where applicable;
- resulting modifier;
- roll action.

The design should avoid encoding assumptions in the UI that make later rules changes impossible.

## 15.5 Combat

Initial fields:

- armor class;
- initiative;
- speed;
- proficiency bonus;
- maximum hit points;
- current hit points;
- temporary hit points.

The UI should make current HP particularly easy to change during combat.

## 15.6 Dice rolling

Initial supported notation:

- d4;
- d6;
- d8;
- d10;
- d12;
- d20;
- d100;
- modifiers;
- multiple dice where useful.

The first goal is not a complete virtual tabletop dice engine. It is dependable, readable, accessible rolling.

Example result:

```text
Strength Check
You rolled 14 + 3 = 17
```

The result must be available as text, not merely animation or color.

The result must be rendered next to the control that produced it, per section 8.8. A result that appears only in a status area elsewhere on the page is invisible to a magnifier user, who will tap Roll and see nothing happen.

A live region can be used in addition, for screen-reader users, but announcements should be intentional to avoid creating excessive screen-reader chatter. The live region must never be the only place the result appears.

---

# 16. Accessibility Settings UI

The settings interface should itself be built from the accessible UI toolkit.

It should be reachable from a persistent, prominent control on mobile.

## 16.1 The bootstrapping constraint

The settings panel is subject to a requirement no other screen has:

> **The settings UI must be operable at every configuration it is capable of producing, including the extremes — and at the user's current configuration, whatever state that is in.**

Someone who cannot read the text or hit the targets is exactly the person who needs to reach these controls. If the panel becomes unusable at 400% text scale, or requires a drag gesture from someone who cannot drag, the user is locked out of the one screen that could fix it.

This rules out drag-only interactions as the *primary* control for any setting, and it is why the default mode below uses discrete named steps.

## 16.2 Simple mode (default)

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

Note that there is no single `[ Preview ]` button. Per section 8.8, each setting carries its own live sample inline, so a magnifier user can see a control and its effect in the same viewport. The character-sheet preview from the calibration wizard remains available, but it supplements these samples rather than replacing them.

Discrete steps have a second benefit beyond operability: they make the calibration wizard's output reproducible and far easier to describe in an exported profile, in a bug report, or over the phone to someone helping.

## 16.3 Detailed mode

Discrete steps trade precision for operability, and for some users that trade is wrong — a person who knows they want 1.35× and not 1.5× should be able to say so.

Detailed mode is therefore available behind a single control, and exposes the same settings as sliders and numeric inputs with the full underlying range.

Rules for detailed mode:

- it is **opt-in** and never the default;
- it is reachable from simple mode, and simple mode is always reachable back from it;
- every slider in it has an adjacent numeric field, so drag is never the only route to a value;
- numeric fields follow section 5.1 — `inputmode="numeric"`, with steppers;
- values set here are preserved when returning to simple mode; the simple control shows the nearest named step and indicates that a custom value is active.

This is the section 24.9 principle applied to the settings panel itself: progressive disclosure, so a first-time user is not confronted with twenty technical knobs, while a user who wants the knobs can have them.

The result is best-effort accessibility by default, with full control one action away.

---

# 17. Data Persistence

The first implementation should be local-first.

Use browser storage rather than a server.

Suggested split:

```text
localStorage
    profile preferences
    small application settings

IndexedDB or structured local persistence
    character data
    future larger data
```

The exact storage mechanism can be chosen after profiling the complexity of the character model.

The user should be able to export:

```text
character.json
profile.json
```

and import them later.

No account should be required for the core application.

## 17.1 Durability

**Status: deferred. Not a first-milestone deliverable, but the abstraction should not preclude it.**

Local-first storage is evictable. Safari caps script-written storage for sites that have not been installed, private browsing discards it on exit, "clear site data" removes it, and IndexedDB can be evicted under storage pressure.

The failure mode is specific and worth naming, because it is worse here than in an ordinary application. A calibrated profile is the output of a multi-step wizard. If it is lost, the user must redo that calibration *in an application they can no longer read comfortably* — the settings are gone, so the app has reverted to a configuration that did not work for them.

Two consequences for the design:

**Persistence should be an interface, not a call to `localStorage`.** Write against a small storage abstraction with interchangeable backends so the choice can be revisited without touching application code:

```text
StorageBackend
├── localStorage        default; profile preferences, small settings
├── sessionStorage      ephemeral / shared-device use
├── cookie              small profiles, survives some eviction paths
├── IndexedDB           character data and anything larger
└── file                explicit JSON download / upload
```

Requesting `navigator.storage.persist()` once calibration completes is cheap and reduces eviction risk on supporting browsers.

**Export should be prompted, not buried.** Offering a profile download as the final step of the calibration wizard — rather than as a button in a settings panel the user may never open — is the difference between a recoverable loss and an unrecoverable one.

Encoding a profile in a URL fragment or QR code would let it move between devices with no server and no account, which fits the privacy stance in section 18 well. It needs tooling that does not exist yet, so it belongs in the research backlog rather than in a milestone.

---

# 18. Privacy

Accessibility settings can reveal sensitive information about a user.

Therefore:

- profiles should be stored locally by default;
- no impairment information should be transmitted automatically;
- analytics, if added later, must be opt-in and carefully minimized;
- profile export should contain only what the user chooses to export;
- sharing a character should not automatically expose the user's accessibility profile;
- telemetry must not infer disability from interaction behavior without explicit consent.

A useful distinction is:

```text
Character profile
≠
Accessibility profile
```

They may be used together locally but should remain independently transferable.

---

# 19. Project Structure

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

# 20. Technology Choices

## Vue 3

Use Vue 3 + TypeScript for component composition, state, and application structure.

Vue should not abstract away the DOM to the point where developers lose control over semantics.

## TypeScript

All component APIs, profile APIs, and application models should be strongly typed.

## Tailwind CSS v4

Target Tailwind CSS **v4**, which uses CSS-first configuration. There is no `tailwind.config.ts`; the theme is declared in CSS with `@theme`.

This is not a version-bump detail — it is a good architectural fit for the design-token system in section 9. Tailwind v4 compiles its theme to CSS custom properties, which is exactly the mechanism section 9 specifies:

```css
@import "tailwindcss";

@theme {
  --a11y-target-size: 44px;
  --a11y-control-font-size: 1rem;
  --a11y-focus-width: 2px;
  --a11y-spacing-scale: 1;
}
```

Because the tokens are ordinary custom properties at runtime, applying a profile becomes a matter of re-declaring variables on a scope — no rebuild, no alternate stylesheet, no duplicate component classes. The profile system in section 10 gets most of its adaptation mechanism from the platform rather than from application code, which is what section 3.1 Goal F asks for.

Tailwind remains useful for rapidly iterating on responsive layout, but it must not become a reason to scatter accessibility rules across hundreds of utility strings.

Shared design tokens and component styles should remain centralized where behavior is architectural rather than cosmetic. The rule of thumb: if a value is architectural — target size, focus width, spacing scale — it is a token in `@theme` and components reference it. If it is cosmetic and local, a utility class is fine.

## Vite

Use Vite for development and production builds.

## Testing

Recommended initial stack:

- Vitest for unit tests;
- Vue Test Utils for component tests;
- Playwright for browser/device behavior;
- axe-core integration for automated accessibility checks;
- manual testing with real browsers and assistive technologies.

The exact tool selection can be revisited if contributors have stronger alternatives.

---

# 21. Accessibility Testing Strategy

Automated testing is necessary but insufficient.

## 21.1 Automated checks

Every component should be tested for:

- accessible name;
- correct role/state;
- invalid ARIA usage;
- keyboard access;
- focus visibility;
- common WCAG violations;
- contrast where tooling can evaluate it.

## 21.2 Browser tests

The application should be tested at:

- mobile width;
- tablet width;
- desktop width;
- 100% zoom;
- 200% zoom;
- high browser text settings;
- narrow viewport/reflow conditions;
- forced colors where available.

### Magnification

Browser zoom is not a substitute for testing under a screen magnifier. Zoom reflows the layout; magnification does not (see section 8.8). Test with:

- macOS Zoom;
- Windows Magnifier, and ZoomText where available;
- Android magnification;
- iOS Zoom.

The specific check: with the viewport showing roughly a fifth of the page, does acting on a control produce feedback the user can actually see without panning?

## 21.3 Assistive technology

At least one screen-reader workflow should be tested on each major supported platform before a release is called accessibility-ready.

Candidates:

- NVDA + Windows;
- VoiceOver + macOS/iOS;
- TalkBack + Android.

The project should document exactly what was tested instead of making blanket claims of universal screen-reader support.

## 21.4 Keyboard-only

Every interaction must be possible without a mouse or touch.

Test:

- initial page navigation;
- character editing;
- opening settings;
- adjusting sliders;
- dialogs;
- rolling dice;
- reading results;
- closing overlays;
- returning focus.

## 21.5 Real-device testing

Because mobile assistive technology can behave differently from desktop screen readers, advanced touch widgets must be tested on actual devices. WAI-ARIA's slider guidance explicitly warns about limitations in touch-based assistive technology interactions.

---

# 22. Test Profiles

The repository should include a standard accessibility test matrix, **sorted by cost of execution and maintenance**.

The full conceptual matrix is twelve conditions across roughly twenty-five components. Run naively as visual regression that is around 300 snapshot baselines, every one of which needs re-approving whenever a token changes. That will be abandoned within two months on volunteer time, and a half-maintained snapshot suite is worse than none, because it teaches contributors to click through failures.

Sort the matrix into tiers and run each tier at the frequency its cost supports.

## 22.1 Tier 1 — computed assertions

Cheap, deterministic, no screenshots, no browser. Run these across the **full** matrix on every commit.

```text
computed target size >= profile minimum
contrast of every (fg, bg, size, weight) triple
accessible name present and non-empty
role and state correct
no horizontal scroll at 320px          (SC 1.4.10)
survives text-spacing overrides        (SC 1.4.12)
focus indicator present and contrasted
no color-only state distinction
```

These are numbers. They should be exhaustive because they cost almost nothing to be exhaustive about.

## 22.2 Tier 2 — visual snapshots

Expensive to maintain. Restrict to a named, deliberately short list of high-risk pairs rather than the cross-product:

```text
Dialog             × 400% zoom
HP resource control × large-targets
Settings panel     × forced-colors
Skill row          × large-text + high-spacing combined
Character sheet    × 320px reflow
```

Each entry needs a one-line justification in the repository explaining why that pair is high-risk. If nobody can write the justification, it does not belong in the tier.

## 22.3 Tier 3 — manual and assistive technology

Highest cost, not automatable, run per release rather than per commit. Screen-reader paths, real-device touch testing, magnifier passes, and user testing with people who have relevant lived experience.

## 22.4 Resourcing

This needs stating honestly rather than being discovered later: tier 3, and the real-device and assistive-technology testing described in section 21, exceed what a volunteer project can sustain at the full scope described in this document.

There are two viable responses, and the project should pick one deliberately rather than drifting:

1. reduce scope so the testing burden fits the available volunteer capacity; or
2. secure dedicated resourcing — sponsorship, institutional backing, or an employer supporting the work — for the tiers volunteers cannot carry.

Until one of those is settled, the project should scope its accessibility claims to what it has actually tested, per section 21.3, and say so plainly.

---

The test is not simply “does it render?”

It is:

> “Can the user still understand and operate this component?”

---

# 23. Known Issues and Difficult Problems

These should be recorded openly rather than pretending the project has solved them.

## 23.1 Accessibility cannot be reduced to visual styling

Increasing font size is straightforward. Improving interaction for screen-reader users, motor impairments, or cognitive load requires semantic and behavioral work.

## 23.2 Color blindness is not one thing

A single “colorblind mode” is likely to be misleading.

The project should eventually support several color-vision-related starting profiles, but the primary solution is to avoid color-only information entirely.

## 23.3 Low vision varies substantially

A profile labelled “low vision” cannot be assumed to suit every user.

Calibration must therefore be a first-class feature rather than a later add-on.

## 23.4 Browser support varies

Preferences such as `prefers-contrast` and `forced-colors` are useful, but not all browser/platform combinations expose them identically. The app needs sensible defaults and must continue functioning when a feature is absent.

## 23.5 Screen readers differ

There is no single universal screen-reader behavior. Testing needs to cover representative combinations and focus on standards-compliant semantics.

## 23.6 Complex widgets can be less accessible than simple controls

Custom sliders, comboboxes, draggable elements, and interactive grids carry a significant accessibility burden. Native controls should be preferred wherever possible.

## 23.7 Scaling exposes bad layout assumptions

A character sheet that looks excellent at 100% can become unusable at 200–400%.

The design must therefore avoid:

- fixed-height containers containing text;
- text embedded in images;
- absolute-positioned labels;
- UI that depends on one exact screen width;
- controls whose text cannot wrap;
- side-by-side layouts that cannot collapse.

WCAG's resize-text and reflow criteria make these issues particularly important.

## 23.8 Dense RPG information is inherently difficult

A character sheet contains a lot of information. Accessibility cannot simply mean “make everything huge.” Doing so can cause excessive scrolling and context switching.

The design needs progressive disclosure and prioritization.

## 23.9 Audio can become noisy

Announcing every state change to a screen reader or speech system would be frustrating. Announcements need to be purposeful and user-configurable.

## 23.10 Accessibility profiles can conflict

Large text, high spacing, and large touch targets can create an interface that becomes too tall or too fragmented.

Profile composition requires deterministic rules and visual testing.

## 23.11 Medical terminology can become misleading

The profile library must not present itself as medical advice or a clinical diagnostic system.

Profiles represent UI adaptations, not diagnoses.

## 23.12 Standardization is premature

The idea of a machine-readable accessibility profile is interesting, but the project should first gather evidence from implementation and user testing. Existing standards already cover many important pieces of the puzzle.

A future specification effort should be based on demonstrated gaps rather than assuming the gap exists because it has not yet been found.

---

# 24. UX Pitfalls to Avoid

## 24.1 Accessibility settings hidden behind tiny controls

The settings entry point must itself be accessible.

## 24.2 “High contrast” implemented as only black and white

High contrast is about distinguishability and legibility, not a single predefined color pair.

## 24.3 Relying on hover

Mobile users may not have hover at all.

## 24.4 Icon-only controls without an accessible name

An icon is not a reliable substitute for a label.

## 24.5 Color-only proficiency indicators

A proficient skill cannot merely have a green dot next to it.

Use text, shape, and/or iconography in addition to color.

## 24.6 Tiny +/- controls

Number adjustments are particularly common in a D&D sheet and should have comfortable interaction targets.

## 24.7 Requiring precise dragging

A slider may be useful, but every critical setting should have a precise non-drag interaction if practical.

## 24.8 Over-animation

Dice may be fun to animate, but the result must not depend on animation.

## 24.9 Too many simultaneous settings

The profile editor should use progressive disclosure so a first-time user does not face twenty technical knobs at once.

## 24.10 Confusing user preferences with application data

The character and accessibility profile should remain separate objects.

---

# 25. D&D Sheet Information Architecture

A proposed default structure:

```text
Character
├── Identity
├── Core stats
│   ├── Ability scores
│   ├── Saving throws
│   └── Skills
├── Combat
│   ├── HP
│   ├── AC
│   ├── Initiative
│   ├── Speed
│   └── Proficiency
├── Actions
│   ├── Attacks
│   └── Dice
└── Notes
```

The interface should not necessarily show all of these as giant open sections at once.

A user with low vision may benefit from a single-column progressive layout where the most frequently used information appears first.

For ordinary play the likely priority is:

```text
HP
AC
Initiative
Ability/skill rolls
Saving throws
Attacks
Everything else
```

This should be validated with actual players rather than treated as a universal truth.

---

# 26. Interactive Character Sheet Principles

## 26.1 Everything important is actionable

A displayed value that players commonly need to roll should have a clear roll action.

Examples:

```text
Strength +3        [ Roll ]
Perception +5      [ Roll ]
Wisdom Save +2     [ Roll ]
```

## 26.2 Every result is human-readable

Do not make the dice animation the canonical output.

Canonical result:

```text
Perception check: d20 14 + 5 = 19
```

Optional visual presentation:

```text
🎲 14
+ 5
────
19
```

## 26.3 Critical results need more than color

A critical result should be communicated using text/icon/state, not only a special color.

## 26.4 Resource editing should be fast

HP should be optimized for repeated use during combat.

A possible first interaction:

```text
Hit Points

Current: 29 / 42

[ -10 ] [ -5 ] [ -1 ]
[ +1 ]  [ +5 ] [ +10 ]

  -5 -> 29 HP   [ Undo ]

[ Edit ]
```

Six large adjacent targets, operated one-handed under time pressure, will be mistapped. That is the expected case rather than an edge case, which is why the change line and its undo are part of the control rather than a refinement to add later. This is the general updatable-element contract from section 8.7, not a special case for hit points.

The change line also places the feedback next to the control that caused it, which is what section 8.8 requires, and gives the change a text representation for assistive technology.

The exact interaction should come from user testing rather than being frozen here.

---

# 27. Future Components

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

---

# 28. Future Generic Game Support

Once the first application is stable, the project can consider extracting a game schema layer.

Potential later model:

```text
Game Definition
    ↓
Character Definition
    ↓
Fields / values / derived values
    ↓
Accessible UI components
```

At that point Pathfinder, Call of Cthulhu, and other systems could be added without redesigning the accessibility layer.

This is intentionally deferred.

The first question is not:

> “Can we represent every RPG?”

It is:

> “Can a real person comfortably play D&D with the interface?”

---

# 29. Volunteer Contributor Model

The target contributor audience includes people with very different backgrounds.

The repository should therefore support at least these contribution types:

### Software development

- Vue/TypeScript;
- CSS;
- testing;
- browser behavior.

### Accessibility expertise

- screen-reader testing;
- accessibility research;
- assistive technology testing;
- usability recommendations.

### UX/design

- component design;
- profile/calibration flows;
- mobile layouts;
- information hierarchy.

### D&D domain knowledge

- character-sheet fields;
- game usability;
- common table workflows;
- rules/content review.

### Documentation

- onboarding;
- examples;
- testing instructions;
- profile documentation.

### User testing

This should be treated as a first-class contribution type, especially from people with lived experience of disabilities or assistive-technology use.

---

# 30. Contribution Rules

Every new UI component should include:

- implementation;
- documentation;
- keyboard behavior definition;
- accessible naming approach;
- at least one automated accessibility test;
- browser test where relevant;
- scaling test;
- mobile/touch test where relevant.

Every new accessibility profile should include:

- description;
- intended adaptation;
- explicit statement that it is a starting point rather than a universal representation;
- relevant research/standards references;
- example screenshots or test cases where possible;
- compatibility notes.

Every new behavior should document whether it is:

- native HTML;
- browser API;
- CSS preference;
- ARIA behavior;
- custom JavaScript behavior.

---

# 31. Governance

Because this may become a volunteer project, decisions should be documented rather than remembered informally.

Create lightweight governance documents:

```text
CONTRIBUTING.md
CODE_OF_CONDUCT.md
ARCHITECTURE.md
ACCESSIBILITY.md
TESTING.md
PROFILE_GUIDELINES.md
```

Avoid excessive bureaucracy initially.

A small project needs clear rules, not committees.

As contributions grow, introduce maintainers for:

- UI toolkit;
- accessibility;
- application;
- documentation.

Accessibility-related behavior should require extra care because a seemingly small regression can materially affect users.

---

# 32. Open-Source Licensing

The project should use a permissive license suitable for community contributions, such as MIT or Apache-2.0, unless legal advice or project governance suggests otherwise.

The D&D content included in the application is a separate licensing concern from the toolkit itself.

The current official SRD documentation states that SRD 5.2.1 is available under CC-BY-4.0 and supplies the required attribution. The repository should keep the toolkit's source code, D&D-derived content, and third-party assets clearly separated so their licensing is obvious.

No artwork, fonts, icons, sounds, or copied character-sheet layouts should be added without verifying their licenses.

---

# 33. Security and Privacy Considerations

Even a client-only application has security concerns.

Consider:

- unsafe imported JSON;
- malicious profile data;
- untrusted SVGs/images;
- third-party fonts/scripts;
- future remote content;
- local storage exposure on shared devices.

Imported profile and character data should be validated against schemas before being applied.

The application should avoid using `innerHTML` with untrusted imported data.

If external APIs are introduced later, they must be treated as untrusted input.

---

# 34. Performance Goals

The first application should be lightweight enough to load quickly on a phone.

Avoid bringing in libraries for features that native HTML/CSS already solve.

Goals:

- small initial JavaScript bundle;
- lazy-load nonessential settings tools if useful;
- avoid heavy animation libraries;
- no mandatory network request after initial application load;
- work from cached assets when feasible;
- remain usable on older phones.

The application should still be functional if JavaScript enhancement fails, where practical. A fully interactive character sheet necessarily requires JavaScript, but its structure should still be semantic and understandable.

---

# 35. Offline / Installability

A later milestone may turn the web app into a PWA.

Potential benefits:

- home-screen installation;
- offline character sheets;
- cached application assets;
- app-like launch;
- local persistence.

This should happen after the basic web application is stable.

---

# 36. Proposed Roadmap

## Sequencing principle

Section 43 says: *"Do not turn it into a giant framework before there is a real application proving the need for the abstractions."*

The roadmap must not contradict that. Building eleven components, a token system, six profiles, and a calibration wizard before anyone sits at a table means every abstraction is designed without the feedback that would tell us whether it is the right abstraction. It also means the person this project exists for waits through three phases to get anything at all.

So the order below is a **vertical slice first**: get something usable in front of a real player quickly, then generalize from what that teaches us. The deliverables are the same as before; only the order changes.

There is a secondary reason. "Help me build an accessible component library" recruits differently from "help me get my friend playing D&D again." The second is the one that is true, and it is the one worth leading with.

## Phase 0 — Project foundation

Deliver:

- repository;
- Vue/TypeScript/Vite setup;
- Tailwind CSS v4 setup (CSS-first, `@theme`);
- CI, including the tier 1 assertions from section 22.1;
- basic linting/testing;
- contribution guide;
- accessibility principles;
- project architecture document.

Keep this phase genuinely small. It exists to make phase 1 possible, not to anticipate phases 3 through 6.

Exit criterion:

> A new volunteer can clone the repository, run it, and understand where components live.

## Phase 1 — One screen, on a real phone, with a real player

The narrowest thing that is actually useful during play:

- hit points, with steppers, textual change feedback, and undo (sections 8.7, 26.4);
- one skill row that rolls a d20 and shows a readable result next to the button that rolled it (section 8.8);
- local persistence of those two things.

Three or four components. Hard-coded values. No token system, no profiles, no calibration, no abstractions that are not forced by this screen.

The point is a session at an actual table. The questions it answers — how large is large enough, does the roll result get noticed, what did they reach for that was not there, what broke that we did not predict — are the questions every later abstraction depends on. Guessing at them in phase 3 is how the wrong abstraction gets frozen in.

Exit criterion:

> A player used this during a real D&D session to track HP and make at least one roll, and told us what was wrong with it.

## Phase 2 — Extract tokens from what that screen needed

Implement:

- CSS accessibility tokens, derived from the values that actually varied in phase 1;
- a default profile;
- one or two real profiles that phase 1 demonstrated a need for.

Everything that did not vary for a real person stays hard-coded until something makes it vary. The token list in section 9 is a menu of candidates, not a checklist to complete.

Exit criterion:

> The same components visibly and behaviorally adapt without creating alternate component classes.

## Phase 3 — Fill out the sheet, building components on demand

Implement the rest of the character sheet:

- identity;
- ability scores and modifiers;
- saving throws;
- skills and proficiency;
- combat stats;
- clickable rolls and result announcements.

Build a primitive when the sheet demands one — not because section 7.1 lists it. Components that never get demanded were never needed, and noticing that is the section 43 test working as designed.

Exit criterion:

> A player can use the application during an actual D&D session instead of paper for the supported character-sheet features.

## Phase 4 — Generalize into the profile system

Implement:

- the full precedence and merge rules from section 12, with protected preferences;
- the remaining shipped profiles;
- JSON schema for profiles;
- profile import/export;
- the storage abstraction from section 17.1;
- the settings UI from section 16, simple mode first, detailed mode behind it.

Doing this now rather than in phase 2 means the merge rules are tested against profiles that real use produced, instead of hypothetical ones.

Exit criterion:

> A user can combine profiles and predict the result, and the settings panel remains operable at every configuration it can produce.

## Phase 5 — Calibration

Implement:

- text-size, spacing, and target-size calibration;
- contrast selection;
- motion preference;
- profile save/reset;
- an actual application preview;
- a prompted profile export at the end of the wizard (section 17.1).

Calibration comes last of the build phases because its output *is* a profile. It cannot be designed before the profile format has been proven by use. Building it earlier means building it twice.

Exit criterion:

> A user can produce a useful custom profile without knowing accessibility terminology.

## Phase 6 — Hardening

Test:

- 200% text size;
- high zoom;
- screen magnification (section 8.8);
- mobile browsers;
- keyboard;
- screen reader;
- reduced motion;
- forced colors;
- color-vision scenarios;
- profile combinations.

Conduct user testing with people who have relevant lived experience.

Exit criterion:

> The project has evidence that the toolkit works in practice, not merely an automated test report.

## Phase 7 — Community release

Deliver:

- polished documentation;
- example profiles;
- component gallery;
- contribution workflows;
- release process;
- public issue templates;
- accessibility feedback process.

Only after this phase should the project seriously consider extracting a generalized game schema.

---

# 37. Definition of Done

A feature is not “done” merely because it looks correct.

For a component:

```text
[ ] Native semantic element selected where appropriate
[ ] Accessible name implemented
[ ] Accessible description/error relationship tested
[ ] Keyboard behavior documented and tested
[ ] Focus behavior tested
[ ] Pointer/touch target tested
[ ] No color-only information
[ ] Works at increased text size
[ ] Works at browser zoom
[ ] Works in narrow/mobile layout
[ ] Reduced-motion behavior considered
[ ] Forced-colors behavior considered
[ ] No horizontal scroll at 320px            (SC 1.4.10)
[ ] Survives text-spacing overrides          (SC 1.4.12)
[ ] Legible within a magnified viewport      (section 8.8)
[ ] If updatable: textual change feedback + undo (section 8.7)
[ ] Automated accessibility checks pass
[ ] Documentation updated
```

For an accessibility profile:

```text
[ ] Profile has version
[ ] Profile has clear description
[ ] Profile explains intended use
[ ] Profile avoids medical claims
[ ] Settings are machine-readable
[ ] Profile can be customized
[ ] Merge behavior is deterministic
[ ] Relevant research references included
[ ] Tested on representative components
```

For a D&D feature:

```text
[ ] Data is editable
[ ] Value is understandable visually
[ ] Value is understandable to assistive technology
[ ] Common action can be performed by keyboard
[ ] Common action can be performed by touch
[ ] Critical state does not rely only on color
[ ] Roll/result is available as text
[ ] Persistence works
[ ] Mobile layout works
```

---

# 38. Success Metrics

The project should measure actual usability rather than number of components.

Useful metrics include:

### Component accessibility

- accessibility test pass rate;
- keyboard completion rate;
- screen-reader task completion;
- number of critical accessibility regressions.

### Character-sheet usability

- time to find and roll a skill;
- time to update HP;
- error rate when pressing controls;
- time to configure a profile;
- successful operation at increased zoom.

### User testing

Ask users whether they can:

- read the sheet comfortably;
- distinguish important states;
- find their common actions;
- operate the sheet one-handed;
- understand dice results;
- configure the app without assistance.

Qualitative feedback should be treated as equally important as automated metrics.

---

# 39. Research Backlog

Keep a dedicated research backlog rather than trying to answer everything before implementation.

Topics to investigate:

- low-vision web use;
- color vision deficiency and effective UI patterns;
- screen-reader behavior on mobile web;
- Android TalkBack + custom controls;
- iOS VoiceOver + custom controls;
- Windows high contrast / forced colors;
- font selection and readability;
- cognitive load and information density;
- motor impairments and touch target sizing;
- alternative input devices;
- switch control;
- voice input;
- haptic feedback;
- braille displays;
- dyslexia-related preferences and evidence;
- vestibular/motion sensitivity;
- accessible game interfaces;
- accessible virtual tabletops;
- existing open-source accessible component libraries.

W3C's current research/user-requirements material should be part of this research process, especially its disability-specific work for low vision and cognitive/learning disabilities.

---

# 40. Potential Future Research / Standards Work

The original idea of eventually defining a standardized machine-readable accessibility profile should remain a **research direction**, not a v1 deliverable.

A future standards-oriented project could investigate whether there is value in a portable representation of:

```text
user needs / preferences
        ↓
interface adaptations
        ↓
component behavior
```

Before proposing any formal standard, the project should:

1. document existing standards;
2. catalog existing approaches;
3. test the profile model in real applications;
4. demonstrate interoperability between implementations;
5. gather feedback from accessibility practitioners;
6. involve people with lived experience;
7. identify exactly what existing standards do not already cover;
8. define a small, interoperable core before adding optional extensions.

A formal publication should come only after the project has evidence that its model solves a real interoperability problem.

The existence of WCAG, ARIA, APG, browser preference media features, and disability-specific WAI research means any future standards work must clearly position itself as complementary rather than attempting to replace those standards.

---

# 41. Open Questions

These questions should remain visible to contributors.

### Profiles

- Should profiles support inheritance?
- How should conflicting profiles merge?
- Should profiles contain only design tokens or also behavior?
- Should profiles be portable between applications?
- How much semantic information is safe to include?

### Calibration

- Which settings can be calibrated reliably?
- How should calibration work for screen-reader users?
- Can calibration detect useful preferences without attempting diagnosis?
- How should calibration cope with changing environments?

### Color

- Which color-vision profiles are worth shipping?
- Should the project include simulation tools?
- How do we test color palettes scientifically rather than by visual intuition?

### Components

- Which custom components are actually worth implementing?
- When does an abstraction become too complicated?
- When is native HTML sufficient?

### Mobile

- Which interactions are reliable under VoiceOver/TalkBack?
- Which gestures should be avoided entirely?
- Which layouts are easiest to use one-handed?

### D&D

- Which character-sheet features matter most during actual play?
- How much rules automation is helpful before it becomes intrusive?
- How should multiple D&D rules versions be handled later?

---

# 42. First Milestone Proposal

The first milestone should be small enough for a single developer to finish quickly, and useful enough that a real person wants the next version. It corresponds to Phase 1 in section 36.

## Milestone A: One screen, at a real table

Deliver:

### UI toolkit

Only what this screen forces:

- `Button`;
- `NumberField` (text + `inputmode="numeric"`, with steppers);
- `Text` / `Heading`;
- `Stack`.

No `Slider`, no `Dialog`, no profile system. If the screen does not need it, it is not in this milestone.

### D&D sheet

- current / maximum HP;
- HP steppers with textual change feedback and undo (section 8.7);
- one skill row with a modifier and a roll action;
- d20 roll with a readable text result rendered next to the button that produced it (section 8.8);
- local persistence of both.

### Testing

- tier 1 computed assertions in CI (section 22.1);
- keyboard navigation;
- one mobile assistive-technology pass;
- one magnifier pass.

### The actual exit criterion

> A player used this during a real D&D session, and we wrote down what was wrong with it.

The written-down feedback is the deliverable that matters. Everything in milestone B is shaped by it.

## Milestone B: Accessible UI v0.1 + full sheet

Only after milestone A has produced feedback.

### UI toolkit

- `TextField`;
- `Checkbox`;
- `Switch`;
- `Select`;
- `Dialog`;
- `Disclosure`;
- `Row`;
- `Panel`;
- `Slider` — for detailed mode only, and always paired with a numeric field.

### Profiles

- Default;
- Large Text;
- High Contrast;
- Reduced Motion;
- Large Targets;
- Red-Green Color Vision starting point.

Each shipped profile carries the metadata required by section 14, and every combination of them passes the section 22.1 contrast matrix.

### Settings

- persistent, prominent settings control;
- profile selector;
- simple mode: discrete named steps for text size, spacing, control size, focus visibility, with inline live samples (section 16.2);
- contrast selection;
- motion selection;
- detailed mode behind a single control, exposing sliders and numeric inputs over the full range (section 16.3);
- reset;
- save / export profile.

### D&D sheet

- identity;
- six ability scores;
- six saving throws;
- standard skills;
- proficiency toggles;
- proficiency bonus;
- AC;
- initiative;
- speed;
- click-to-roll d20 checks;
- accessible roll results.

### Testing

- unit/component tests;
- basic Playwright coverage;
- axe-core checks;
- tier 2 visual snapshots for the named high-risk pairs (section 22.2);
- keyboard navigation;
- one desktop screen-reader test path;
- one iOS/Android assistive-technology test path;
- one magnifier path;
- mobile layout;
- 200% text/zoom testing;
- reduced motion;
- forced colors where available.

Together these milestones answer the project's most important question:

> **Can a real player comfortably use this D&D sheet with their own accessibility settings during a game?**

Milestone A answers it for one person with default settings. Milestone B answers it for people whose settings differ from the default. If both answers are yes, the project has a foundation worth expanding.

---

# 43. Final Project Philosophy

The project should resist two temptations.

First, do not turn it into a giant framework before there is a real application proving the need for the abstractions.

Second, do not treat accessibility as a collection of visual themes.

The intended relationship is:

```text
Native Web Platform
        ↓
Accessible UI Components
        ↓
User Preferences / Profiles
        ↓
Calibration and Personalization
        ↓
D&D Character Sheet
```

The D&D sheet is the reason to build the project.

The component library is what makes the solution reusable.

The profiles are what make it adaptable to different people.

The calibration system is what prevents those profiles from becoming rigid stereotypes.

And the web platform is what gives the project a chance to work anywhere without forcing users through an app store or proprietary ecosystem.

The project's success should ultimately be judged by a simple outcome:

> **Can more people sit down at a D&D table, open the sheet on whatever device they have, configure it to suit them, and participate without the interface getting in their way?**

Everything else should serve that goal.

---

# 44. Initial Reference Sources

These are the starting points for the project's standards and research work. They should be reviewed and updated as the project evolves.

- W3C — Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- W3C — WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/
- W3C — Accessible Names and Descriptions: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- W3C — Button Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
- W3C — Slider Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/
- W3C — Dialog Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- W3C — Digital Accessibility User Requirements / Research: https://www.w3.org/WAI/research/user-requirements/
- MDN — `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- MDN — `prefers-contrast`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-contrast
- MDN — `forced-colors`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors
- MDN — `prefers-color-scheme`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme
- MDN — Using color wisely: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Using_color_wisely
- D&D Beyond — System Reference Document v5.2.1: https://www.dndbeyond.com/srd

---

# 45. Proposed Repository Tagline

> **An accessibility-first web toolkit for building interfaces that adapt to people — starting with a better D&D character sheet.**
