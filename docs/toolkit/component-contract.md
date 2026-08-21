# Component contract

*What every interactive component must document and test.*

[← Documentation index](../README.md)

---

Every interactive component should document and test at least the following.

## Semantics

- What native HTML element is used?
- What accessible role/state/value does it expose?
- How is it named?
- How are descriptions/errors associated?

Interactive controls must have an accessible name. The APG gives explicit guidance on naming controls and warns that careless use of `aria-label` can hide useful descendant content from assistive technology.

## Keyboard behavior

Every interactive component should define:

- Tab behavior;
- Enter behavior;
- Space behavior;
- Arrow behavior where appropriate;
- Escape behavior where appropriate;
- focus movement;
- focus restoration after dialogs/menus.

## Pointer/touch behavior

Every interactive target should:

- have an appropriately large target;
- avoid requiring precise dragging where not essential;
- tolerate accidental taps where practical;
- provide an alternative to gestures that are difficult or impossible for some users.

WCAG 2.2 specifically addresses dragging movements and minimum target size.

## Focus behavior

Focus must be:

- visible;
- sufficiently contrasted;
- not clipped;
- not obscured by overlays/sticky UI;
- predictable;
- restored appropriately after transient interactions.

## Scaling

Components must survive:

- browser zoom;
- increased root font size;
- increased line height;
- larger spacing;
- 200% text enlargement;
- 400% zoom/reflow testing for relevant layouts.

Do not use JavaScript to fake browser zoom. Use relative CSS units and responsive layout.

## State

Every state should be perceivable without relying on color alone.

Examples:

- checked/unchecked;
- selected/unselected;
- enabled/disabled;
- valid/invalid;
- success/failure;
- expanded/collapsed;
- loading/complete.

## Change feedback and reversibility

Any component that mutates a value the user cares about is an **updatable element**, and updatable elements carry two extra obligations beyond the ones above.

**Textual change feedback.** When the value changes, the component must be able to render what changed as text, adjacent to the control that changed it. Not a colour flash, not an animation, not only a distant status bar. Whether this feedback is shown is profile-configurable — some users will want it always, some only for destructive changes, some not at all — but every updatable component must be *capable* of it.

**A route back.** above requires controls to "tolerate accidental taps." That requirement needs a mechanism, not just an intention. Large adjacent targets operated one-handed under time pressure will be mistapped; this is the expected case, not an edge case. An updatable element should therefore offer a way to undo its last change.

Combined, these give a single pattern:

```text
Hit Points

Current: 29 / 42

  −5 → 29 HP   [ Undo ]
```

One line does four jobs: it satisfies 8.3, it gives the change a text representation for assistive technology, it places the feedback next to the control that caused it (see 8.8), and it makes the change reversible.

This generalizes past hit points to every resource, toggle, and stepper in the application — spell slots, proficiency toggles, ability scores, conditions.

## Magnification

Components must survive **screen magnification**, which is a different mechanism from browser zoom and is not covered by the scaling requirements in 8.5.

Magnifier software — ZoomText, macOS Zoom, Android magnification, commonly 2×–16× — does not reflow the layout at all. The user pans a small window across an unchanged page and may see a fifth of the screen or less at any moment. Every reflow fix listed in [Known issues](../known-issues.md) does nothing for them.

The design rule that follows:

> **Feedback appears adjacent to the control that caused it.**

Concretely:

- a dice result renders next to the button that rolled it, not only in a status region elsewhere on the page;
- the settings preview updates a sample control sitting inline beside each setting, rather than in a single preview pane below the whole stack;
- nothing important is communicated by a toast or banner anchored to a page corner;
- validation errors sit with their field, not only in a summary at the top.

A live region may still be used in addition, for screen-reader users. It must not be the only place the information appears.

This constrains layout, so it is much cheaper to decide now than to retrofit.
