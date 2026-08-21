# Research backlog

*What to investigate, including future standards work.*

[← Documentation index](../README.md)

---

## Research Backlog

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

## Potential Future Research / Standards Work

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

## Future Generic Game Support

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
