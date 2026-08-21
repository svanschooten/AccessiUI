# Interaction principles

*Everything important is actionable and readable.*

[← Documentation index](../README.md)

---

## Everything important is actionable

A displayed value that players commonly need to roll should have a clear roll action.

Examples:

```text
Strength +3        [ Roll ]
Perception +5      [ Roll ]
Wisdom Save +2     [ Roll ]
```

## Every result is human-readable

Do not make the dice animation the canonical output.

Canonical result:

```text
Perception check: d20 14 + 5 = 19
```

Optional visual presentation:

```text
🎲 14
+ 5
────
19
```

## Critical results need more than color

A critical result should be communicated using text/icon/state, not only a special color.

## Resource editing should be fast

HP should be optimized for repeated use during combat.

A possible first interaction:

```text
Hit Points

Current: 29 / 42

[ -10 ] [ -5 ] [ -1 ]
[ +1 ]  [ +5 ] [ +10 ]

  -5 -> 29 HP   [ Undo ]

[ Edit ]
```

Six large adjacent targets, operated one-handed under time pressure, will be mistapped. That is the expected case rather than an edge case, which is why the change line and its undo are part of the control rather than a refinement to add later. This is the general updatable-element contract from [Component contract](../toolkit/component-contract.md), not a special case for hit points.

The change line also places the feedback next to the control that caused it, which is what [Component contract](../toolkit/component-contract.md) requires, and gives the change a text representation for assistive technology.

The exact interaction should come from user testing rather than being frozen here.
