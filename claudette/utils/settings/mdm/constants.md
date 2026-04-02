# constants (mdm)

## Purpose
Shared constants and path builders for MDM (Mobile Device Management) settings modules. Has zero heavy imports (only `os` and `path`) so it is safe to import from `rawRead.ts` during early startup.

## Imports
- **Stdlib**: `os` (homedir, userInfo), `path` (join)
- **External**: (none)
- **Internal**: (none)

## Logic
Defines platform-specific paths and constants for reading MDM-managed settings:
- **macOS**: Preference domain `com.anthropic.claudecode`, plutil binary path and args, plist paths in priority order (per-user managed → device-level managed → user preferences for ant builds only)
- **Windows**: Registry key paths under `SOFTWARE\Policies\ClaudeCode` for both HKLM (admin) and HKCU (user), plus the value name `Settings`
- `getMacOSPlistPaths()` builds plist paths at call time, checking `process.env.USER_TYPE` to conditionally include ant-only user-writable paths

## Exports
- `MACOS_PREFERENCE_DOMAIN` — macOS preference domain string (`com.anthropic.claudecode`)
- `WINDOWS_REGISTRY_KEY_PATH_HKLM` — HKLM registry key path for admin MDM policies
- `WINDOWS_REGISTRY_KEY_PATH_HKCU` — HKCU registry key path for user MDM policies
- `WINDOWS_REGISTRY_VALUE_NAME` — registry value name containing the JSON settings blob (`Settings`)
- `PLUTIL_PATH` — path to macOS plutil binary (`/usr/bin/plutil`)
- `PLUTIL_ARGS_PREFIX` — arguments for plutil to convert plist to JSON on stdout
- `MDM_SUBPROCESS_TIMEOUT_MS` — subprocess timeout (5000ms)
- `getMacOSPlistPaths()` — returns array of `{path, label}` objects for macOS plist files in priority order (highest first)
