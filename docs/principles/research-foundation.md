# Research foundation

*The standards and research this project builds on.*

[← Documentation index](../README.md)

---

## Research Foundation

This project should maintain a living research/standards document as implementation proceeds. The initial foundation is below.

### WCAG 2.2

WCAG 2.2 is the primary standards baseline.

Relevant areas include:

- **1.3 Adaptable** — preserve relationships and meaningful sequence;
- **1.4.1 Use of Color** — do not use color as the only visual means of conveying information;
- **1.4.3 Contrast (Minimum)**;
- **1.4.4 Resize Text**;
- **1.4.10 Reflow**;
- **1.4.11 Non-text Contrast**;
- **1.4.12 Text Spacing**;
- **2.1 Keyboard Accessible**;
- **2.2.2 Pause, Stop, Hide**;
- **2.2.3 No Timing**;
- **2.3 Seizures and Physical Reactions**;
- **2.3.3 Animation from Interactions**;
- **2.4 Navigable**;
- **2.4.7 Focus Visible**;
- **2.4.11 Focus Not Obscured (Minimum)**;
- **2.4.12 Focus Not Obscured (Enhanced)**;
- **2.4.13 Focus Appearance**;
- **2.5.3 Label in Name**;
- **2.5.7 Dragging Movements**;
- **2.5.8 Target Size (Minimum)**;
- **3.3 Input Assistance**;
- **4.1 compatibility-related requirements where applicable**.

WCAG 2.2 currently defines a minimum pointer target size of 24×24 CSS pixels under its Target Size (Minimum) criterion, subject to exceptions. The toolkit should generally use considerably larger targets as a deliberate usability choice, especially for phone use.

### WAI-ARIA and the Authoring Practices Guide

The Accessible Rich Internet Applications specification and the WAI-ARIA Authoring Practices Guide are references for semantics and widget behavior.

The APG provides patterns for components such as buttons, checkboxes, sliders, dialogs, disclosures, menus, grids, and tabs. It also provides guidance on accessible names and descriptions.

Important rule: if native HTML can implement the control correctly, prefer native HTML. The APG itself warns that incorrectly applied ARIA can misrepresent the interface to assistive technology.

### Native browser accessibility features

The toolkit should actively integrate with browser behavior rather than replace it.

Important current platform features include:

- `prefers-reduced-motion`;
- `prefers-contrast`;
- `forced-colors`;
- `prefers-color-scheme`;
- `prefers-reduced-transparency`;
- `inverted-colors`;
- `scripting`;
- CSS system colors such as `Canvas`, `CanvasText`, `ButtonFace`, and `ButtonText` where appropriate.

`forced-colors` is especially important because browsers can expose OS-selected high-contrast/forced-color palettes and authors are expected to make small targeted adjustments rather than recreate a separate forced-colors design system.

### Low vision and disability-specific requirements

W3C's Accessibility Initiative maintains disability-specific research, including research for low vision and cognitive/learning disabilities. The project should treat these resources as research inputs rather than assuming that WCAG alone captures the complete user experience.

### Touch and slider behavior

Complex touch widgets deserve special testing. The WAI-ARIA APG warns that some touch-based assistive technology interactions with slider patterns may not reliably synthesize the keyboard behavior expected by sliders. This is a strong argument for minimizing custom controls and testing every advanced control on real mobile devices with assistive technology enabled.

### D&D content and licensing

The first application should use rules/content that the project is actually permitted to redistribute.

As of the current D&D Beyond SRD documentation, SRD 5.2.1 is available under Creative Commons and is explicitly intended as a foundation for third-party products. The official page also states that future SRD versions will continue under Creative Commons. The project should use the current official SRD where rules content is required, include the required attribution, and avoid copying protected presentation/text from proprietary character-sheet products.

The application should be described as D&D-compatible rather than implying endorsement by Wizards of the Coast unless such endorsement actually exists.

#### The required attribution string

CC-BY-4.0 obliges us to reproduce a specific sentence. Record it in the repository now, before any SRD content lands:

> This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd.

The license also states that no *other* attribution to Wizards or its affiliates should be included. Adding a well-meant extra credit line is itself a license violation, so the wording above should be treated as fixed text rather than a template.

---

## Initial Reference Sources

These are the starting points for the project's standards and research work. They should be reviewed and updated as the project evolves.

- W3C — Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- W3C — WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/
- W3C — Accessible Names and Descriptions: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- W3C — Button Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
- W3C — Slider Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/
- W3C — Dialog Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- W3C — Digital Accessibility User Requirements / Research: https://www.w3.org/WAI/research/user-requirements/
- MDN — `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- MDN — `prefers-contrast`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-contrast
- MDN — `forced-colors`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors
- MDN — `prefers-color-scheme`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme
- MDN — Using color wisely: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Using_color_wisely
- D&D Beyond — System Reference Document v5.2.1: https://www.dndbeyond.com/srd
