# Design tokens

*The values profiles adapt.*

[← Documentation index](../README.md)

---

The toolkit should centralize accessibility-sensitive values in CSS custom properties.

Example categories:

```text
Typography
    font family
    base size
    scale
    weight
    line height
    letter spacing

Spacing
    spacing scale
    control padding
    section gap
    content width

Interaction
    minimum target size
    target spacing
    control height

Focus
    focus color
    focus width
    focus offset
    focus style

Color
    text
    surface
    control surface
    border
    primary
    selected
    success
    warning
    error

Motion
    transition duration
    animation duration
    animation policy

Elevation / decoration
    shadows
    borders
    radius
```

A component should use tokens, not hard-coded accessibility values wherever practical.

Example:

```css
.a-button {
  min-height: var(--a11y-target-size);
  padding-inline: var(--a11y-control-padding-inline);
  border-width: var(--a11y-border-width);
  font-size: var(--a11y-control-font-size);
}
```

This is the mechanism by which profiles adapt the library.
