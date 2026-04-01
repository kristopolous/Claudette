# tools/BashTool/bashCommandHelpers

## Purpose
Validates and evaluates permissions for bash commands, handling compound commands, pipelines, and cross-segment patterns like cd+git, while respecting user permissions.

## Imports
- **Stdlib**: None
- **External**: `zod/v4` (type `z`)
- **Internal**:
  - `utils/bash/commands` - `isUnsafeCompoundCommand_DEPRECATED`, `splitCommand_DEPRECATED`
  - `utils/bash/ParsedCommand` - `IParsedCommand`, `ParsedCommand`, `buildParsedCommandFromRoot`
  - `utils/bash/parser` - `Node`, `PARSE_ABORTED`
  - `utils/permissions/PermissionResult` - `PermissionResult`
  - `utils/permissions/PermissionUpdateSchema` - `PermissionUpdate`
  - `utils/permissions/permissions` - `createPermissionRequestMessage`
  - `tools/BashTool/BashTool` - `BashTool` (tool metadata)
  - `tools/BashTool/bashSecurity` - `bashCommandIsSafeAsync_DEPRECATED`

## Logic
- `segmentedCommandPermissionResult`: Handles piped/segmented commands.
  - Rejects if multiple `cd` commands appear across segments.
  - Detects cross-segment `cd` + `git` combinations (security: prevents bare repo fsmonitor bypass) by splitting each segment into subcommands.
  - Evaluates each segment's permission via `bashToolHasPermissionFn`.
  - If any segment denies, returns deny with aggregate `decisionReason`.
  - If all allow, returns allow.
  - Otherwise returns `ask` with collected permission suggestions from non-allow segments.
- `buildSegmentWithoutRedirections`: Strips output redirections (`>`) from a segment while preserving quoting, using `ParsedCommand`.
- `checkCommandOperatorPermissions`: Entry point that accepts either an AST root or parses the command; calls `bashToolCheckCommandOperatorPermissions`.
- `bashToolCheckCommandOperatorPermissions`:
  - Checks for unsafe compound commands (subshells/command groups) using TreeSitter analysis or deprecated function; if unsafe, may ask with a message from `bashCommandIsSafeAsync_DEPRECATED`.
  - If pipes exist (via `getPipeSegments`), strips redirections and delegates to `segmentedCommandPermissionResult`.
  - If no pipes, returns `passthrough` to let normal flow handle it.

## Exports
- `checkCommandOperatorPermissions` - async function returning `Promise<PermissionResult>`
- `CommandIdentityCheckers` - type with `isNormalizedCdCommand` and `isNormalizedGitCommand` functions
