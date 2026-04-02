# rawRead (mdm)

## Purpose
Minimal module for firing MDM subprocess reads without blocking the event loop. Designed for early startup use — fires at main.tsx module evaluation with minimal imports.

## Imports
- **Stdlib**: `child_process` (execFile), `fs` (existsSync)
- **External**: (none)
- **Internal**: `./constants.js` (MDM paths, plutil config, timeout)

## Logic
Two usage patterns:
1. **Startup**: `startMdmRawRead()` fires once at module evaluation, results consumed later via `getMdmRawReadPromise()`
2. **Poll/fallback**: `fireRawRead()` creates a fresh read on demand (used by changeDetector and SDK entrypoint)

Platform-specific reads:
- **macOS**: Spawns `plutil` for each plist path in parallel, skips non-existent files via sync `existsSync` (avoids ~5ms spawn overhead), returns first successful result ("first source wins")
- **Windows**: Spawns `reg query` for HKLM and HKCU in parallel
- **Linux**: Returns empty result (no MDM equivalent)

`execFilePromise` wraps `execFile` in a Promise, resolving with stdout and exit code even on error.

## Exports
- `RawReadResult` — type: `{ plistStdouts: Array<{stdout, label}> | null, hklmStdout: string | null, hkcuStdout: string | null }`
- `fireRawRead()` — fires fresh subprocess reads, returns `Promise<RawReadResult>`
- `startMdmRawRead()` — fires startup read once, stores promise for later retrieval
- `getMdmRawReadPromise()` — returns the startup promise or null if `startMdmRawRead()` was not called
