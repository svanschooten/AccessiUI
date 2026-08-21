# Milestones

*The first two concrete deliverables.*

[← Documentation index](../README.md)

---

The first milestone should be small enough for a single developer to finish quickly, and useful enough that a real person wants the next version. It corresponds to Phase 1 in [Roadmap](roadmap.md).

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
- HP steppers with textual change feedback and undo ([Component contract](../toolkit/component-contract.md));
- one skill row with a modifier and a roll action;
- d20 roll with a readable text result rendered next to the button that produced it ([Component contract](../toolkit/component-contract.md));
- local persistence of both.

### Testing

- tier 1 computed assertions in CI ([Test matrix](../testing/test-matrix.md));
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

Each shipped profile carries the metadata required by [Profile library](../profiles/library.md), and every combination of them passes the [Test matrix](../testing/test-matrix.md) contrast matrix.

### Settings

- persistent, prominent settings control;
- profile selector;
- simple mode: discrete named steps for text size, spacing, control size, focus visibility, with inline live samples ([Settings UI](../application/settings-ui.md));
- contrast selection;
- motion selection;
- detailed mode behind a single control, exposing sliders and numeric inputs over the full range ([Settings UI](../application/settings-ui.md));
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
- tier 2 visual snapshots for the named high-risk pairs ([Test matrix](../testing/test-matrix.md));
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
