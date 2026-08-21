# Test matrix

*Three cost tiers, and what each can honestly prove.*

[← Documentation index](../README.md)

---

The repository should include a standard accessibility test matrix, **sorted by cost of execution and maintenance**.

The full conceptual matrix is twelve conditions across roughly twenty-five components. Run naively as visual regression that is around 300 snapshot baselines, every one of which needs re-approving whenever a token changes. That will be abandoned within two months on volunteer time, and a half-maintained snapshot suite is worse than none, because it teaches contributors to click through failures.

Sort the matrix into tiers and run each tier at the frequency its cost supports.

## Tier 1 — computed assertions

Cheap, deterministic, no screenshots, no browser. Run these across the **full** matrix on every commit.

```text
computed target size >= profile minimum
contrast of every (fg, bg, size, weight) triple
accessible name present and non-empty
role and state correct
no horizontal scroll at 320px          (SC 1.4.10)
survives text-spacing overrides        (SC 1.4.12)
focus indicator present and contrasted
no color-only state distinction
```

These are numbers. They should be exhaustive because they cost almost nothing to be exhaustive about.

## Tier 2 — visual snapshots

Expensive to maintain. Restrict to a named, deliberately short list of high-risk pairs rather than the cross-product:

```text
Dialog             × 400% zoom
HP resource control × large-targets
Settings panel     × forced-colors
Skill row          × large-text + high-spacing combined
Character sheet    × 320px reflow
```

Each entry needs a one-line justification in the repository explaining why that pair is high-risk. If nobody can write the justification, it does not belong in the tier.

## Tier 3 — manual and assistive technology

Highest cost, not automatable, run per release rather than per commit. Screen-reader paths, real-device touch testing, magnifier passes, and user testing with people who have relevant lived experience.

## Resourcing

This needs stating honestly rather than being discovered later: tier 3, and the real-device and assistive-technology testing described in [Testing strategy](README.md), exceed what a volunteer project can sustain at the full scope described in this document.

There are two viable responses, and the project should pick one deliberately rather than drifting:

1. reduce scope so the testing burden fits the available volunteer capacity; or
2. secure dedicated resourcing — sponsorship, institutional backing, or an employer supporting the work — for the tiers volunteers cannot carry.

Until one of those is settled, the project should scope its accessibility claims to what it has actually tested, per [Testing strategy](README.md), and say so plainly.

---

The test is not simply “does it render?”

It is:

> “Can the user still understand and operate this component?”
