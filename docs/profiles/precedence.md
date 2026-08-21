# Precedence and merging

*How conflicting settings resolve, deterministically.*

[← Documentation index](../README.md)

---

The implementation should make precedence deterministic.

## Layer order

Later layers win. Toolkit defaults are the base of the stack, not a layer above the platform:

```text
built-in toolkit defaults          base layer
        ↓
browser / OS preference            seeds initial values
        ↓
selected profile(s)
        ↓
user customizations
        ↓
explicit per-component override
```

The ordering matters and is easy to get backwards. Toolkit defaults must sit *below* browser and OS preferences, because a default that overrides the operating system is a bug, not a default. Platform preferences are read as inputs that seed the initial value of a setting; every layer above them represents a choice the user has actually made.

## Protected preferences

Three platform preferences are harm-avoidance settings rather than aesthetic ones, and they are exempt from ordinary layer precedence:

```text
prefers-reduced-motion
forced-colors
prefers-reduced-transparency
```

These may be relaxed only by an explicit, deliberate user action taken in the settings UI. They must never be changed as a side effect of loading, importing, or combining a profile.

The reason is that reduced motion in particular is not a preference in the way a font size is. For a user with a vestibular disorder, unexpected animation can cause nausea or a migraine. A profile that silently re-enables it has caused physical harm, and a shared or imported profile is exactly the vector by which that would happen.

Where a user does explicitly override a protected preference, the settings UI should say plainly what is being overridden and offer a one-action route back.

## Merge semantics

Merge rules apply *within* a layer, not across layers. This distinction is what keeps adaptations reversible.

When two or more profiles are active at the same layer, combine by safest value:

```text
font scale        -> max
spacing scale     -> max
minimum target    -> max
reduced motion    -> OR
color dependency  -> OR
```

When two profiles disagree on a property that has no meaningful "safest" value, the later-selected profile replaces the earlier:

```text
font family       -> override
color palette     -> override
contrast theme    -> override
```

The layer above — user customization — sets absolute values that **replace** whatever the profile layer produced. It is not subject to max-merge.

This matters because the alternative fails a common case. A user loads a "Large Text" profile at 1.5×, finds it slightly too large, and asks for 1.25×. If max-merge applied to their own adjustment, they could not have it: the profile's value would act as a floor and a starting point would have quietly become a commitment. That directly contradicts [Guiding principles](../principles/README.md).

Stated as a rule: **profiles combine conservatively with each other; the user always has the final word over the result.**

The project should not silently merge conflicting profiles without making the result deterministic and explainable. The settings UI should be able to show, for any given setting, which layer supplied its current value.
