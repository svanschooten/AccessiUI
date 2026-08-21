# Information architecture

*How a dense character sheet is organised.*

[← Documentation index](../README.md)

---

A proposed default structure:

```text
Character
├── Identity
├── Core stats
│   ├── Ability scores
│   ├── Saving throws
│   └── Skills
├── Combat
│   ├── HP
│   ├── AC
│   ├── Initiative
│   ├── Speed
│   └── Proficiency
├── Actions
│   ├── Attacks
│   └── Dice
└── Notes
```

The interface should not necessarily show all of these as giant open sections at once.

A user with low vision may benefit from a single-column progressive layout where the most frequently used information appears first.

For ordinary play the likely priority is:

```text
HP
AC
Initiative
Ability/skill rolls
Saving throws
Attacks
Everything else
```

This should be validated with actual players rather than treated as a universal truth.
