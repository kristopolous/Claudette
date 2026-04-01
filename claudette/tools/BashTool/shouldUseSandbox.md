# BashTool/shouldUseSandbox.ts

## Purpose

Determines whether a Bash command should be executed in the sandbox based on global settings, explicit overrides, and user-configured excluded command patterns. This is a policy decision function, not a security boundary; actual enforcement happens elsewhere.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**:
  - Analytics: `getFeatureValue_CACHED_MAY_BE_STALE` from GrowthBook
  - Bash utils: `splitCommand_DEPRECATED`
  - Sandbox: `SandboxManager`
  - Settings: `getSettings_DEPRECATED`
  - Bash permissions: `BINARY_HIJACK_VARS`, `bashPermissionRule`, `matchWildcardPattern`, `stripAllLeadingEnvVars`, `stripSafeWrappers`

## Logic

**Input** `SandboxInput`:
- `command?: string`
- `dangerouslyDisableSandbox?: boolean`

**`containsExcludedCommand(command): boolean`** (internal):
- **Ant-specific dynamic disabled commands** (GrowthBook `tengu_sandbox_disabled_commands`):
  - Checks if command contains any of the `substrings` anywhere
  - Splits command with `splitCommand_DEPRECATED` and checks if any part's base command (first word) is in `commands` list
- **User settings** (`settings.sandbox.excludedCommands`):
  - Splits command into subcommands via `&&` using `splitCommand_DEPRECATED`
  - For each subcommand, generates candidate command strings:
    - Starts with trimmed subcommand
    - Iteratively applies: `stripAllLeadingEnvVars` (removes env assignments like `FOO=bar`) and `stripSafeWrappers` (removes wrappers like `timeout`, `sudo`) until fixed point
  - Each candidate is checked against each pattern via `bashPermissionRule`:
    - `prefix`: matches if candidate equals prefix or starts with `prefix + ' '`
    - `exact`: exact equality
    - `wildcard`: uses `matchWildcardPattern`
  - Returns true if any candidate matches any pattern
- Returns false otherwise

**`shouldUseSandbox(input): boolean`**:
- If `!SandboxManager.isSandboxingEnabled()` → false
- If `dangerouslyDisableSandbox` AND `SandboxManager.areUnsandboxedCommandsAllowed()` → false
- If no command → false
- If `containsExcludedCommand(command)` → false
- Otherwise → true (sandbox is required)

## Exports

- `shouldUseSandbox(input: Partial<SandboxInput>): boolean`
