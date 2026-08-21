# Roadmap

*Vertical slice first, then generalise.*

[← Documentation index](../README.md)

---

> **Where we are:** Phase 0 is complete. Phase 1 is code-complete and tested; what remains is a screen-reader pass and one session at a real table. See [Current phase](phase-1.md).

## Sequencing principle

[Overview](../vision/overview.md) says: *"Do not turn it into a giant framework before there is a real application proving the need for the abstractions."*

The roadmap must not contradict that. Building eleven components, a token system, six profiles, and a calibration wizard before anyone sits at a table means every abstraction is designed without the feedback that would tell us whether it is the right abstraction. It also means the person this project exists for waits through three phases to get anything at all.

So the order below is a **vertical slice first**: get something usable in front of a real player quickly, then generalize from what that teaches us. The deliverables are the same as before; only the order changes.

There is a secondary reason. "Help me build an accessible component library" recruits differently from "help me get my friend playing D&D again." The second is the one that is true, and it is the one worth leading with.

## Phase 0 — Project foundation

Deliver:

- repository;
- Vue/TypeScript/Vite setup;
- Tailwind CSS v4 setup (CSS-first, `@theme`);
- CI, including the tier 1 assertions from [Test matrix](../testing/test-matrix.md);
- basic linting/testing;
- contribution guide;
- accessibility principles;
- project architecture document.

Keep this phase genuinely small. It exists to make phase 1 possible, not to anticipate phases 3 through 6.

Exit criterion:

> A new volunteer can clone the repository, run it, and understand where components live.

## Phase 1 — One screen, on a real phone, with a real player

The narrowest thing that is actually useful during play:

- hit points, with steppers, textual change feedback, and undo ([Component contract](../toolkit/component-contract.md) and [Interaction principles](../application/interaction-principles.md));
- one skill row that rolls a d20 and shows a readable result next to the button that rolled it ([Component contract](../toolkit/component-contract.md));
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

Everything that did not vary for a real person stays hard-coded until something makes it vary. The token list in [Design tokens](../toolkit/design-tokens.md) is a menu of candidates, not a checklist to complete.

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

Build a primitive when the sheet demands one — not because [Components](../toolkit/components.md) lists it. Components that never get demanded were never needed, and noticing that is the [Overview](../vision/overview.md) test working as designed.

Exit criterion:

> A player can use the application during an actual D&D session instead of paper for the supported character-sheet features.

## Phase 4 — Generalize into the profile system

Implement:

- the full precedence and merge rules from [Precedence and merging](../profiles/precedence.md), with protected preferences;
- the remaining shipped profiles;
- JSON schema for profiles;
- profile import/export;
- the storage abstraction from [Persistence](../engineering/persistence.md);
- the settings UI from [Settings UI](../application/settings-ui.md), simple mode first, detailed mode behind it.

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
- a prompted profile export at the end of the wizard ([Persistence](../engineering/persistence.md)).

Calibration comes last of the build phases because its output *is* a profile. It cannot be designed before the profile format has been proven by use. Building it earlier means building it twice.

Exit criterion:

> A user can produce a useful custom profile without knowing accessibility terminology.

## Phase 6 — Hardening

Test:

- 200% text size;
- high zoom;
- screen magnification ([Component contract](../toolkit/component-contract.md));
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
