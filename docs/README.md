# Documentation

Everything about the project, in small pages you can read one at a time.

**New here?** Read [Overview](vision/overview.md), then [Quick reference](principles/quick-reference.md). That is about ten minutes and covers most of what you need to contribute.

**Writing code right now?** [Quick reference](principles/quick-reference.md) and [Component contract](toolkit/component-contract.md).

**Wondering what to work on?** [Roadmap](project/roadmap.md), then [Current phase](project/phase-1.md).

---

## Why the project exists

| Page | |
| --- | --- |
| [Overview](vision/overview.md) | The problem, the vision, and how success is judged |
| [Goals](vision/goals.md) | The seven things v1 must achieve |
| [Non-goals](vision/non-goals.md) | What v1 deliberately does not do |

## How decisions get made

| Page | |
| --- | --- |
| [Guiding principles](principles/README.md) | The eight rules that settle arguments |
| [Quick reference](principles/quick-reference.md) | Those rules, condensed to one page |
| [Research foundation](principles/research-foundation.md) | WCAG, ARIA, platform features, SRD licensing |

## The toolkit

| Page | |
| --- | --- |
| [Components](toolkit/components.md) | What exists, what is deferred, and what is excluded |
| [Component contract](toolkit/component-contract.md) | What every interactive component must do |
| [Design tokens](toolkit/design-tokens.md) | The values profiles adapt |

## Accessibility profiles

| Page | |
| --- | --- |
| [Profiles](profiles/README.md) | Interface preferences, not diagnoses |
| [Platform preferences](profiles/platform-preferences.md) | Using what the browser and OS already know |
| [Precedence and merging](profiles/precedence.md) | How conflicting settings resolve |
| [Calibration](profiles/calibration.md) | Asking about outcomes, not conditions |
| [Profile library](profiles/library.md) | The curated starting profiles |

## The D&D application

| Page | |
| --- | --- |
| [Application scope](application/scope.md) | What the character sheet covers |
| [Settings UI](application/settings-ui.md) | Simple mode, detailed mode, bootstrapping |
| [Information architecture](application/information-architecture.md) | Organising a dense sheet |
| [Interaction principles](application/interaction-principles.md) | Actionable values, readable results |

## Engineering

| Page | |
| --- | --- |
| [Architecture](engineering/architecture.md) | Repository layout, technology, how adaptation works |
| [Persistence](engineering/persistence.md) | Local-first storage and durability |
| [Privacy and security](engineering/privacy-and-security.md) | Accessibility settings are health-adjacent data |
| [Performance and offline](engineering/performance.md) | Fast on an old phone |

## Testing

| Page | |
| --- | --- |
| [Testing strategy](testing/README.md) | What runs where, and what each tier can prove |
| [Test matrix](testing/test-matrix.md) | Three cost tiers |
| [Definition of done](testing/definition-of-done.md) | Checklists for components, profiles, features |

## Running the project

| Page | |
| --- | --- |
| [Roadmap](project/roadmap.md) | Vertical slice first, then generalise |
| [Current phase](project/phase-1.md) | What Phase 1 still needs, and how to run the field test |
| [Milestones](project/milestones.md) | The first two concrete deliverables |
| [Contributing](project/contributors.md) | Who can help and what each contribution needs |
| [Governance](project/governance.md) | Light rules, written down |
| [Licensing](project/licensing.md) | Code, D&D content, third-party assets |
| [Success metrics](project/success-metrics.md) | Measuring usability, not component count |
| [Open questions](project/open-questions.md) | Unresolved, and visible on purpose |
| [Research backlog](project/research-backlog.md) | What to investigate next |

## Things to watch out for

| Page | |
| --- | --- |
| [Known issues](known-issues.md) | Hard problems, recorded rather than hidden |
| [UX pitfalls](ux-pitfalls.md) | Mistakes this project must not make |

---

## About these documents

These pages were split out of a single 2,500-line project plan. That document is preserved in git history at commit `f8e81cb` if you ever need the original in one piece; nothing was dropped in the split.

Keep pages short. If one grows past roughly 200 lines, that is usually a sign it is holding two topics and should become two pages with a link between them.
