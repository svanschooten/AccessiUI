# Overview

*Why this project exists, and what success looks like.*

[← Documentation index](../README.md)

---

## Executive Summary

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

## Vision

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

## Final Project Philosophy

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

## Proposed Repository Tagline

> **An accessibility-first web toolkit for building interfaces that adapt to people — starting with a better D&D character sheet.**
