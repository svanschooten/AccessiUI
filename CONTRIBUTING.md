# Contributing

Contributions of many kinds are useful here, not only code. Testing with a screen reader, telling us a layout is unusable at your text size, or explaining what a character sheet actually needs during play are all first-class contributions.

## Before you start

Read [docs/accessibility.md](docs/accessibility.md). It is short, and it covers the rules that most often send a change back.

## Setting up

```bash
npm install
npm run dev
```

## Before opening a pull request

```bash
npm run verify
```

Then run through the manual checklist in [docs/accessibility.md](docs/accessibility.md#what-to-check-before-opening-a-pull-request). Automated checks catch a minority of accessibility problems; the manual list catches the ones that matter.

## Adding a component

Every new component needs:

- a native HTML element underneath it, or a written reason why that was not possible;
- an accessible name, and a documented way for callers to set one;
- defined keyboard behaviour;
- at least one automated test covering semantics;
- tokens rather than hard-coded sizes, spacing, or colours;
- no colour-only state.

## Adding a profile

Every profile needs a description, a statement of what it adapts, an explicit note that it is a starting point rather than a universal answer, and references for any research behind it.

Profiles are collections of interface preferences. They are not diagnoses, and they must not be written as though everyone with a given condition needs the same settings.

## Reporting an accessibility problem

Tell us what you were trying to do, what happened, and what you are using — browser, assistive technology, text size, any OS accessibility settings. "The HP buttons are too close together with TalkBack on" is a good report. You do not need to know the standard involved or propose a fix.
