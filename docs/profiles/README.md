# Accessibility profiles

*Collections of interface preferences — not diagnoses.*

[← Documentation index](../README.md)

---

## Profile philosophy

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

## Profile structure

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

## Recommended profile categories

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

Contrast needs a stated method, not visual intuition. [Open questions](../project/open-questions.md) asks how to test palettes scientifically; this is the answer the project should adopt.

**Contrast is a property of a triple, not a colour pair.** Legibility depends on foreground colour, background colour, *and* the size and weight of the text drawn in it. [Design tokens](../toolkit/design-tokens.md) currently separates colour, typography, and spacing into independent token groups that are never evaluated together, which makes it structurally impossible to check. Define a contrast token as:

```text
(foreground, background, minimum size, minimum weight)
```

**Validate the matrix in CI.** Walk every colour token against every type token, for every shipped profile and every profile combination the merge rules can produce. This is a computation over a finite space, not a judgement call, and it is the only honest way to answer whether a given profile combination is safe. It is also cheap — it needs no screenshots and no browser.

**The computed result is a floor, not the setting.** This is deliberate and should not be optimized away. Automated validation establishes that a palette is not broken; it does not establish that a palette is comfortable, and those are different questions. Explicit user configuration of contrast remains a first-class feature precisely so that the project can calibrate against real preferences with people who have relevant lived experience, rather than shipping whatever a ratio calculation permits.

WCAG 2.x contrast ratios are the practical baseline for the CI check. APCA is worth watching but belongs in the research backlog ([Research backlog](../project/research-backlog.md)) rather than in a milestone — WCAG 3 is not close to stable.

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
