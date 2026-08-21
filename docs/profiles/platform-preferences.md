# Platform preferences

*Using what the browser and OS already know.*

[← Documentation index](../README.md)

---

Profiles should be able to use system preferences as defaults rather than overriding them blindly.

Relevant browser capabilities include:

```css
@media (prefers-reduced-motion: reduce) {
  /* remove non-essential animation */
}

@media (prefers-contrast: more) {
  /* strengthen boundaries/focus where useful */
}

@media (forced-colors: active) {
  /* make only targeted adjustments needed for compatibility */
}

@media (prefers-color-scheme: dark) {
  /* dark-theme defaults */
}
```

These should be treated as inputs to the profile system, not replaced by application-specific copies. MDN documents these media features as current web platform capabilities, with varying degrees of browser/platform support.
