# desktopDeepLink

## Purpose
Manages deep links from CLI to Claude Desktop app, allowing users to resume a CLI session in the Desktop app. Handles install detection, version checking, and platform-specific URL opening.

## Imports
- **Stdlib**: `fs/promises` (readdir), `path` (join), `semver` (coerce)
- **Internal**: `../bootstrap/state` (getSessionId), `./cwd` (getCwd), `./debug` (logForDebugging), `./execFileNoThrow` (execFileNoThrow), `./file` (pathExists), `./semver` (gte)

## Logic
1. `isDevMode` checks `NODE_ENV === 'development'` or if `process.argv[1]`/`process.execPath` contains build directory markers (`/build-ant/`, `/build-ant-native/`, `/build-external/`, `/build-external-native/`).
2. `buildDesktopDeepLink` constructs a URL: `claude://resume?session={sessionId}&cwd={cwd}` (or `claude-dev://` in dev mode).
3. `isDesktopInstalled` checks per-platform:
   - macOS: `/Applications/Claude.app` exists
   - Linux: `xdg-mime query default x-scheme-handler/claude` returns a handler
   - Windows: `reg query HKEY_CLASSES_ROOT\claude` succeeds
   - Dev mode: always returns true
4. `getDesktopVersion` detects the installed version:
   - macOS: `defaults read` from `Info.plist` `CFBundleShortVersionString`
   - Windows: finds highest `app-X.Y.Z` directory in `%LOCALAPPDATA%\AnthropicClaude`
   - Linux: returns null (no version detection)
5. `getDesktopInstallStatus` returns a discriminated union: `not-installed`, `version-too-old` (below 1.1.2396), or `ready` (with version string).
6. `openDeepLink` opens the URL via platform mechanism: `osascript` (dev mode macOS), `open` (macOS), `xdg-open` (Linux), `cmd /c start` (Windows).
7. `openCurrentSessionInDesktop` is the main export: checks install status, builds the deep link, opens it, and returns `{ success, error?, deepLinkUrl? }`.

Constants: `MIN_DESKTOP_VERSION` = `'1.1.2396'`.

## Exports
- `DesktopInstallStatus` - discriminated union type: `{ status: 'not-installed' } | { status: 'version-too-old'; version: string } | { status: 'ready'; version: string }`
- `getDesktopInstallStatus` - async function returning `DesktopInstallStatus`
- `openCurrentSessionInDesktop` - async function returning `{ success: boolean; error?: string; deepLinkUrl?: string }`

## Source
`claude-code/src/utils/desktopDeepLink.ts`
