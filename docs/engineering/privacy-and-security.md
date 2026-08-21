# Privacy and security

*Accessibility settings are health-adjacent data.*

[← Documentation index](../README.md)

---

## Privacy

Accessibility settings can reveal sensitive information about a user.

Therefore:

- profiles should be stored locally by default;
- no impairment information should be transmitted automatically;
- analytics, if added later, must be opt-in and carefully minimized;
- profile export should contain only what the user chooses to export;
- sharing a character should not automatically expose the user's accessibility profile;
- telemetry must not infer disability from interaction behavior without explicit consent.

A useful distinction is:

```text
Character profile
≠
Accessibility profile
```

They may be used together locally but should remain independently transferable.

---

## Security and Privacy Considerations

Even a client-only application has security concerns.

Consider:

- unsafe imported JSON;
- malicious profile data;
- untrusted SVGs/images;
- third-party fonts/scripts;
- future remote content;
- local storage exposure on shared devices.

Imported profile and character data should be validated against schemas before being applied.

The application should avoid using `innerHTML` with untrusted imported data.

If external APIs are introduced later, they must be treated as untrusted input.
