# settings (mdm)

## Purpose
MDM (Mobile Device Management) profile enforcement for managed settings. Parses raw subprocess output from OS-level MDM configuration into validated settings, applying a "first source wins" priority policy.

## Imports
- **Stdlib**: `path` (join)
- **External**: (none)
- **Internal**: debug, diagLogs, fileRead, fsOperations, json, startupProfiler, managedPath, types, validation, mdm/constants, mdm/rawRead

## Logic
Architecture split across three files:
- `constants.ts` — shared constants and plist path builder (zero heavy imports)
- `rawRead.ts` — subprocess I/O only (fires at main.tsx evaluation)
- `settings.ts` — parsing, caching, first-source-wins logic (this file)

**Startup flow**: `startMdmSettingsLoad()` kicks off async reads early. Uses the startup raw read if already fired, otherwise fires a fresh one. Results are parsed and cached.

**First-source-wins priority** (highest to lowest):
1. Remote MDM (macOS plist or Windows HKLM registry)
2. `managed-settings.json` file or `managed-settings.d/*.json` drop-in files
3. Windows HKCU registry (user-writable, lowest priority)

**Parsing**: Raw stdout is parsed via `parseCommandOutputAsSettings()` which JSON-parses, filters invalid permission rules (so one bad rule doesn't reject all settings), and validates against `SettingsSchema`. Windows registry output is parsed via `parseRegQueryStdout()` which matches `REG_SZ` and `REG_EXPAND_SZ` lines.

**Caching**: `mdmCache` and `hkcuCache` hold parsed results. `clearMdmSettingsCache()` resets all caches. `setMdmSettingsCache()` allows direct cache updates (used by change detector poll).

**Refresh**: `refreshMdmSettings()` fires a fresh raw read and returns parsed results without updating the cache.

## Exports
- `startMdmSettingsLoad()` — kicks off async MDM/HKCU reads early in startup
- `ensureMdmSettingsLoaded()` — awaits the in-flight MDM load; starts it if not already running
- `getMdmSettings()` — returns cached admin-controlled MDM settings (`{settings, errors}`)
- `getHkcuSettings()` — returns cached HKCU registry settings (user-writable, Windows only)
- `clearMdmSettingsCache()` — clears mdmCache, hkcuCache, and mdmLoadPromise
- `setMdmSettingsCache(mdm, hkcu)` — directly updates session caches
- `refreshMdmSettings()` — fires fresh raw read, parses and returns `{mdm, hkcu}` without caching
- `parseCommandOutputAsSettings(stdout, sourcePath)` — parses JSON stdout into validated `{settings, errors}`
- `parseRegQueryStdout(stdout, valueName?)` — extracts registry string value from `reg query` output
