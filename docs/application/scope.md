# Application scope

*What the D&D character sheet covers.*

[← Documentation index](../README.md)

---

The first application should be intentionally small but useful.

## Character information

- character name;
- player name;
- class;
- subclass where relevant;
- level;
- species/ancestry/race depending on the chosen ruleset terminology;
- background;
- alignment where desired;
- experience points where applicable;
- free-form notes.

## Ability scores

- Strength;
- Dexterity;
- Constitution;
- Intelligence;
- Wisdom;
- Charisma.

Each should display:

- editable ability score;
- derived modifier;
- a clearly labelled roll action.

## Saving throws

Each saving throw should expose:

- associated ability;
- proficiency state;
- resulting modifier;
- roll action.

## Skills

The first implementation should support the standard 5e skill set used by the selected ruleset.

Each skill should expose:

- name;
- associated ability;
- proficiency/expertise state where applicable;
- resulting modifier;
- roll action.

The design should avoid encoding assumptions in the UI that make later rules changes impossible.

## Combat

Initial fields:

- armor class;
- initiative;
- speed;
- proficiency bonus;
- maximum hit points;
- current hit points;
- temporary hit points.

The UI should make current HP particularly easy to change during combat.

## Dice rolling

Initial supported notation:

- d4;
- d6;
- d8;
- d10;
- d12;
- d20;
- d100;
- modifiers;
- multiple dice where useful.

The first goal is not a complete virtual tabletop dice engine. It is dependable, readable, accessible rolling.

Example result:

```text
Strength Check
You rolled 14 + 3 = 17
```

The result must be available as text, not merely animation or color.

The result must be rendered next to the control that produced it, per [Component contract](../toolkit/component-contract.md). A result that appears only in a status area elsewhere on the page is invisible to a magnifier user, who will tap Roll and see nothing happen.

A live region can be used in addition, for screen-reader users, but announcements should be intentional to avoid creating excessive screen-reader chatter. The live region must never be the only place the result appears.
