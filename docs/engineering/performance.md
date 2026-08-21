# Performance and offline

*Fast on an old phone; installable later.*

[← Documentation index](../README.md)

---

## Performance Goals

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

## Offline / Installability

A later milestone may turn the web app into a PWA.

Potential benefits:

- home-screen installation;
- offline character sheets;
- cached application assets;
- app-like launch;
- local persistence.

This should happen after the basic web application is stable.
