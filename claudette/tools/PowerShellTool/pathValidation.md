# tools/PowerShellTool/pathValidation.ts

## Purpose
Validates file system paths in PowerShell commands, extracting paths from AST and enforcing permission rules while handling PowerShell-specific syntax and security edge cases.

## Imports
- **Stdlib**: `os` (homedir), `path` (isAbsolute, resolve)
- **External**: none
- **Internal**:
  - `ToolPermissionContext` (Tool)
  - `PermissionRule` (types/permissions)
  - `getCwd` (utils/cwd)
  - `getFsImplementation`, `safeResolvePath` (utils/fsOperations)
  - `containsPathTraversal`, `getDirectoryForPath` (utils/path)
  - Various permission utils: `allWorkingDirectories`, `checkEditableInternalPath`, `checkPathSafetyForAutoEdit`, `checkReadableInternalPath`, `matchingRuleForInput`, `pathInAllowedWorkingPath`
  - `createReadRuleSuggestion` (utils/permissions/PermissionUpdate)
  - `PermissionUpdate` (utils/permissions/PermissionUpdateSchema)
  - `isDangerousRemovalPath`, `isPathInSandboxWriteAllowlist` (utils/permissions/pathValidation)
  - `getPlatform` (utils/platform)
  - `ParsedCommandElement`, `ParsedPowerShellCommand`, `isNullRedirectionTarget`, `isPowerShellParameter` (utils/powershell/parser)
  - `COMMON_SWITCHES`, `COMMON_VALUE_PARAMS` (PowerShellTool/commonParameters)
  - `resolveToCanonical` (PowerShellTool/readOnlyValidation)

## Logic
Huge module mirroring BashTool/pathValidation with PowerShell-specific adaptations. Key parts:
- `CMDLET_PATH_CONFIG`: per-cmdlet configuration (pathParams, switches, valueParams, etc.) for 30+ cmdlets
- `validatePath`: core path validation with security checks for provider paths, UNC, globs, backticks, etc. Returns ResolvedPathCheckResult
- `extractPathsFromCommand`: parses AST to extract file paths from cmdlet arguments, handling PowerShell's parameter syntax (colon-bound, abbreviations)
- `checkPathConstraints(input, parsed, context, compoundCommandHasCd?)`: main exported function. Iterates statements, applies security guards (cwd-change, expression sources, unvalidatable args), checks each path against allow/deny rules, handles redirections. Returns 'deny', 'ask', or 'passthrough'
- Hard-deny removal of system-critical paths (/, ~, /etc) via `isDangerousRemovalRawPath`/`dangerousRemovalDeny`

## Exports
- `checkPathConstraints(input, parsed, toolPermissionContext, compoundCommandHasCd?)` - Main validation function, returns PermissionResult
- `isDangerousRemovalRawPath(filePath)` - Boolean pre-check for dangerous removal targets
- `dangerousRemovalDeny(path)` - Constructs deny PermissionResult for system path removal
