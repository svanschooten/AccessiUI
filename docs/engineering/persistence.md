# Persistence

*Local-first storage, and why durability matters here.*

[← Documentation index](../README.md)

---

The first implementation should be local-first.

Use browser storage rather than a server.

Suggested split:

```text
localStorage
    profile preferences
    small application settings

IndexedDB or structured local persistence
    character data
    future larger data
```

The exact storage mechanism can be chosen after profiling the complexity of the character model.

The user should be able to export:

```text
character.json
profile.json
```

and import them later.

No account should be required for the core application.

## Durability

**Status: deferred. Not a first-milestone deliverable, but the abstraction should not preclude it.**

Local-first storage is evictable. Safari caps script-written storage for sites that have not been installed, private browsing discards it on exit, "clear site data" removes it, and IndexedDB can be evicted under storage pressure.

The failure mode is specific and worth naming, because it is worse here than in an ordinary application. A calibrated profile is the output of a multi-step wizard. If it is lost, the user must redo that calibration *in an application they can no longer read comfortably* — the settings are gone, so the app has reverted to a configuration that did not work for them.

Two consequences for the design:

**Persistence should be an interface, not a call to `localStorage`.** Write against a small storage abstraction with interchangeable backends so the choice can be revisited without touching application code:

```text
StorageBackend
├── localStorage        default; profile preferences, small settings
├── sessionStorage      ephemeral / shared-device use
├── cookie              small profiles, survives some eviction paths
├── IndexedDB           character data and anything larger
└── file                explicit JSON download / upload
```

Requesting `navigator.storage.persist()` once calibration completes is cheap and reduces eviction risk on supporting browsers.

**Export should be prompted, not buried.** Offering a profile download as the final step of the calibration wizard — rather than as a button in a settings panel the user may never open — is the difference between a recoverable loss and an unrecoverable one.

Encoding a profile in a URL fragment or QR code would let it move between devices with no server and no account, which fits the privacy stance in [Privacy and security](privacy-and-security.md) well. It needs tooling that does not exist yet, so it belongs in the research backlog rather than in a milestone.
