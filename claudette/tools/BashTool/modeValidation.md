# tools/BashTool/modeValidation

## Purpose
Validates bash commands against the current permission mode, allowing auto-approval for certain modes.

## Imports
- **Internal**:
  - `splitCommand_DEPRECATED` from utils/bash/commands
  - `PermissionResult` type from utils/permissions/PermissionResult
  - `ToolPermissionContext` from Tool
  - `BashTool` inputSchema type
  - `ACCEPT_EDITS_ALLOWED_COMMANDS` constant (mkdir, touch, rm, rmdir, mv, cp, sed)

## Logic
Exports:
- `checkPermissionMode(input, toolPermissionContext)`: Main entry. If mode is 'bypassPermissions' or 'dontAsk', returns passthrough. Splits command (may be compound) and for each subcommand calls `validateCommandForMode`. For 'acceptEdits' mode and filesystem commands, returns 'allow' with updated input. Otherwise passthrough.
- `getAutoAllowedCommands(mode)`: Returns ACCEPT_EDITS_ALLOWED_COMMANDS if mode is 'acceptEdits', else empty array.
- `validateCommandForMode(cmd, toolPermissionContext)`: Checks if base command is in the acceptEdits allowlist; returns 'allow' if so; else 'passthrough'.

Used in permission flow to auto-allow common filesystem operations when the session is in Accept Edits mode.

## Exports
- `checkPermissionMode(input, context)` - function
- `getAutoAllowedCommands(mode)` - function
