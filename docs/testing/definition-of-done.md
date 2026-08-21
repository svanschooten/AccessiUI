# Definition of done

*Checklists for components, profiles, and features.*

[← Documentation index](../README.md)

---

A feature is not “done” merely because it looks correct.

For a component:

```text
[ ] Native semantic element selected where appropriate
[ ] Accessible name implemented
[ ] Accessible description/error relationship tested
[ ] Keyboard behavior documented and tested
[ ] Focus behavior tested
[ ] Pointer/touch target tested
[ ] No color-only information
[ ] Works at increased text size
[ ] Works at browser zoom
[ ] Works in narrow/mobile layout
[ ] Reduced-motion behavior considered
[ ] Forced-colors behavior considered
[ ] No horizontal scroll at 320px            (SC 1.4.10)
[ ] Survives text-spacing overrides          (SC 1.4.12)
[ ] Legible within a magnified viewport      ([Component contract](../toolkit/component-contract.md))
[ ] If updatable: textual change feedback + undo ([Component contract](../toolkit/component-contract.md))
[ ] Automated accessibility checks pass
[ ] Documentation updated
```

For an accessibility profile:

```text
[ ] Profile has version
[ ] Profile has clear description
[ ] Profile explains intended use
[ ] Profile avoids medical claims
[ ] Settings are machine-readable
[ ] Profile can be customized
[ ] Merge behavior is deterministic
[ ] Relevant research references included
[ ] Tested on representative components
```

For a D&D feature:

```text
[ ] Data is editable
[ ] Value is understandable visually
[ ] Value is understandable to assistive technology
[ ] Common action can be performed by keyboard
[ ] Common action can be performed by touch
[ ] Critical state does not rely only on color
[ ] Roll/result is available as text
[ ] Persistence works
[ ] Mobile layout works
```
