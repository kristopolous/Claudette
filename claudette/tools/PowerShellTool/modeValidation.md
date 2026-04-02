# tools/PowerShellTool/modeValidation.ts

## Purpose
Implements permission mode validation for PowerShellTool's acceptEdits mode, auto-allowing filesystem-modifying cmdlets while rejecting complex or dangerous constructs.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**:
  - `ToolPermissionContext` (Tool)
  - `PermissionResult` (utils/permissions/PermissionResult)
  - `ParsedPowerShellCommand` (utils/powershell/parser)
  - `deriveSecurityFlags`, `getPipelineSegments`, `PS_TOKENIZER_DASH_CHARS` (utils/powershell/parser)
  - `argLeaksValue`, `isAllowlistedPipelineTail`, `isCwdChangingCmdlet`, `isSafeOutputCommand`, `resolveToCanonical` (PowerShellTool/readOnlyValidation)

## Logic
`checkPermissionMode` examines the parsed AST. In `acceptEdits` mode, it auto-allows only if:
- Command is parsed (`valid` true)
- No security flags: subexpressions, script blocks, member invocations, splatting, assignments, stop parsing, expandable strings
- No compound command mixing cwd changes (Set-Location etc.) with writes (TOCTOU guard)
- No symlink creation (New-Item with SymbolicLink/Junction/HardLink) in compound commands
- Every command is either a safe output cmdlet/allowlisted pipeline tail OR one of:
  `Set-Content`, `Add-Content`, `Remove-Item`, `Clear-Content` (canonical names via alias resolution)
- Arguments are statically resolvable (elementTypes limited to StringConstant/Parameter, no colon-bound expressions)
- `argLeaksValue` returns false
Non-`acceptEdits` modes return `passthrough`. Returns `allow` with updatedInput if all checks pass; otherwise `passthrough` with explanatory message.

## Exports
- `checkPermissionMode(input, parsed, toolPermissionContext)` - Returns PermissionResult
- `isSymlinkCreatingCommand(cmd)` - Detects New-Item creating links
