# Sandbox Toggle Command (`sandbox`)

## Purpose
Configures the sandbox environment for command execution. Supports an interactive settings UI and an `exclude` subcommand to add command patterns that should bypass sandboxing. Checks platform support, dependencies, and policy locks.

## Imports
### External
- `figures` (for unicode icons)

### Stdlib
- `path` (`relative`)
- REACT

### Internal
- `getCwdState` from `.././bootstrap/state`
- `SandboxSettings` component from `.././components/sandbox/SandboxSettings`
- `color` function from `.././ink`
- `getPlatform` from `.././utils/platform`
- `SandboxManager` (including `isSupportedPlatform`, `checkDependencies`, `isPlatformInEnabledList`, `areSandboxSettingsLockedByPolicy`, `isSandboxingEnabled`, `isAutoAllowBashIfSandboxedEnabled`, `areUnsandboxedCommandsAllowed`) from `../../utils/sandbox/sandboxadapter`
- `getSettings_DEPRECATED`, `getSettingsFilePathForSource` from `.././utils/settings/settings`
- `ThemeName` type from `.././utils/theme`

## Logic
The `call` async function receives `onDone`, `_context`, and optional `args`:
1. Loads settings and determines theme (`light` default).
2. Validates platform support: if not supported, returns an error (WSL1 or non-mac/linux).
3. Checks dependencies via `SandboxManager.checkDependencies()`.
4. Checks if platform is in the enabled list (enterprise setting).
5. Checks if sandbox settings are locked by policy.
6. If any check fails, calls `onDone` with a colored error message and returns `null`.
7. If `args` is empty: renders `<SandboxSettings onComplete={onDone} depCheck={depCheck} />`.
8. If `args` starts with `'exclude'`: extracts the command pattern, removes surrounding quotes, calls `addToExcludedCommands(pattern)`, determines the local settings file path (relative to CWD), and calls `onDone` with success message. Returns `null`.
9. For unknown subcommands, calls `onDone` with an error.

## Exports
- `call` (async function) - Renders settings UI or modifies exclusions