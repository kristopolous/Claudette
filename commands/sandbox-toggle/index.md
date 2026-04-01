# Sandbox Toggle Command Definition (`index`)

## Purpose
Defines the `sandbox` command, which toggles the command sandbox and displays its current status. Supports an immediate mode and an `exclude` subcommand. The command is hidden on unsupported platforms or when sandboxing is disabled by policy.

## Imports
### External
- `figures` (for warning, tick, circle icons)

### Internal
- `Command` type from `../../commands.js`
- `SandboxManager` from `../../utils/sandbox/sandbox-adapter.js`

## Logic
Creates a command object:
- `name`: `'sandbox'`
- `description`: Getter that builds a status string:
  - Uses warning icon if dependencies are missing.
  - Otherwise tick if enabled, circle if disabled.
  - Appends "sandbox enabled (auto-allow)" if auto-allow is on; "sandbox enabled" otherwise.
  - Appends ", fallback allowed" if unsandboxed commands are allowed.
  - Appends " (managed)" if settings are locked by policy.
  - Suffix `" (⏎ to configure)"` indicates interactive configuration.
- `argumentHint`: `'exclude "command pattern"'`
- `isHidden`: Getter returns true if `!isSupportedPlatform()` or `!isPlatformInEnabledList()`.
- `immediate`: `true` (executes immediately when typed).
- `type`: `'local-jsx'`
- `load`: Dynamic import of `./sandbox-toggle.js` (or `.tsx`)

## Exports
- `command` (Command) - The command definition (exported as default)