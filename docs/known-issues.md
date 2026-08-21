# Known issues

*Hard problems, recorded rather than hidden.*

[← Documentation index](README.md)

---

These should be recorded openly rather than pretending the project has solved them.

## Accessibility cannot be reduced to visual styling

Increasing font size is straightforward. Improving interaction for screen-reader users, motor impairments, or cognitive load requires semantic and behavioral work.

## Color blindness is not one thing

A single “colorblind mode” is likely to be misleading.

The project should eventually support several color-vision-related starting profiles, but the primary solution is to avoid color-only information entirely.

## Low vision varies substantially

A profile labelled “low vision” cannot be assumed to suit every user.

Calibration must therefore be a first-class feature rather than a later add-on.

## Browser support varies

Preferences such as `prefers-contrast` and `forced-colors` are useful, but not all browser/platform combinations expose them identically. The app needs sensible defaults and must continue functioning when a feature is absent.

## Screen readers differ

There is no single universal screen-reader behavior. Testing needs to cover representative combinations and focus on standards-compliant semantics.

## Complex widgets can be less accessible than simple controls

Custom sliders, comboboxes, draggable elements, and interactive grids carry a significant accessibility burden. Native controls should be preferred wherever possible.

## Scaling exposes bad layout assumptions

A character sheet that looks excellent at 100% can become unusable at 200–400%.

The design must therefore avoid:

- fixed-height containers containing text;
- text embedded in images;
- absolute-positioned labels;
- UI that depends on one exact screen width;
- controls whose text cannot wrap;
- side-by-side layouts that cannot collapse.

WCAG's resize-text and reflow criteria make these issues particularly important.

## Dense RPG information is inherently difficult

A character sheet contains a lot of information. Accessibility cannot simply mean “make everything huge.” Doing so can cause excessive scrolling and context switching.

The design needs progressive disclosure and prioritization.

## Audio can become noisy

Announcing every state change to a screen reader or speech system would be frustrating. Announcements need to be purposeful and user-configurable.

## Accessibility profiles can conflict

Large text, high spacing, and large touch targets can create an interface that becomes too tall or too fragmented.

Profile composition requires deterministic rules and visual testing.

## Medical terminology can become misleading

The profile library must not present itself as medical advice or a clinical diagnostic system.

Profiles represent UI adaptations, not diagnoses.

## Standardization is premature

The idea of a machine-readable accessibility profile is interesting, but the project should first gather evidence from implementation and user testing. Existing standards already cover many important pieces of the puzzle.

A future specification effort should be based on demonstrated gaps rather than assuming the gap exists because it has not yet been found.
