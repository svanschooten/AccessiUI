# Accessible UI Toolkit + D&D Character Sheet

An accessibility-first web toolkit for building interfaces that adapt to people — starting with a better D&D character sheet.

This project exists because playing D&D should not depend on being able to read small text or hit small targets. The character sheet is the reason to build it; the toolkit is what makes the solution reusable.

See [the project plan](accessible-ui-project-plan.md) for the full design. It is long, but sections 5 (guiding principles) and 8 (component contract) are the ones you need before writing code.

## Quick start

```bash
npm install
npm run dev
```

Then open the printed URL. The current build is the **Phase 1 vertical slice**: hit points and one skill roll, persisted locally.

## Verifying your changes

```bash
npm run verify
```

That runs lint, typecheck, and tests — the same checks CI runs.

## Where things live

```
packages/accessible-ui/     The toolkit. Components, composables, tokens.
  src/components/           Vue components. One file each.
  src/composables/          Reusable behaviour (undo, persistence).
  src/storage/              Storage backends behind one interface.
  src/theme/theme.css       Design tokens. The values profiles adapt.
  src/utils/                Pure helpers, including contrast maths.
  tests/                    Unit and component tests.

apps/character-sheet/       The D&D application.
  src/dnd/                  Game logic: dice, character model.
  src/views/                Screens and sections.

profiles/                   Accessibility profiles (Phase 4).
schemas/                    JSON schemas for profiles and characters.
docs/                       Architecture, accessibility, testing guides.
```

## The rules that matter most

Three things will get a pull request sent back more than anything else:

1. **No colour-only information.** Every state needs text, shape, or an icon as well.
2. **Native HTML first.** Do not build from a `div` what a `<button>` already does. The one exception is `<input type="number">` — see [docs/accessibility.md](docs/accessibility.md).
3. **Feedback goes next to the control that caused it.** Not in a corner toast, not only in a live region.

## Current status

Phase 1 of [the roadmap](accessible-ui-project-plan.md). The exit criterion is not "the code works" — it is that a player used this at a real table and told us what was wrong with it.

## Licence

Code is under the licence in [LICENSE](LICENSE).

D&D content, where present, comes from the System Reference Document 5.2.1 and carries its own attribution:

> This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd.

The SRD licence forbids adding any other attribution to Wizards, so treat that sentence as fixed text.

This project is D&D-compatible. It is not endorsed by Wizards of the Coast.
