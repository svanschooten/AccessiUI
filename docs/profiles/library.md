# Profile library

*The curated starting profiles and what each must carry.*

[← Documentation index](../README.md)

---

The repository should eventually contain a curated profile library.

Initial candidate profiles:

```text
profiles/
├── visual/
│   ├── large-text.json
│   ├── high-contrast.json
│   ├── red-green-color-vision.json
│   ├── blue-yellow-color-vision.json
│   └── monochrome.json
│
├── motion/
│   └── reduced-motion.json
│
├── motor/
│   └── large-targets.json
│
└── combinations/
    └── low-vision-starting-point.json
```

The exact taxonomy should remain conservative until informed by user research.

Each profile must include:

- human-readable name;
- description;
- intended use;
- limitations;
- affected settings;
- version;
- author/contributor information where appropriate;
- research references;
- testing status.

A profile should not be promoted to “recommended” solely because it was proposed by a developer.
