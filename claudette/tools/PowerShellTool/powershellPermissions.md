## Purpose
PowerShell-specific permission checking that evaluates commands against user permission rules, integrating exact/prefix matching, mode validation, and path constraints.

## Imports
- **Stdlib**: `path` (resolve)
- **External**: none
- **Internal** (selected):
  - `ToolPermissionContext`, `ToolUseContext` (Tool)
  - `PermissionDecisionReason`, `PermissionResult` (types/permissions)
  - `getCwd` (utils/cwd)
  - `isCurrentDirectoryBareGitRepo` (utils/git)
  - `PermissionRule`, `PermissionUpdate` (utils/permissions/...)
  - `createPermissionRequestMessage`, `getRuleByContentsForToolName` (utils/permissions/permissions)
  - `matchWildcardPattern`, `parsePermissionRule`, `suggestionForExactCommand` (utils/permissions/shellRuleMatching)
  - Parser functions: `classifyCommandName`, `deriveSecurityFlags`, `getAllCommandNames`, `getFileRedirections`, `parsePowerShellCommand`, `stripModulePrefix` (utils/powershell/parser)
  - `containsVulnerableUncPath` (utils/shell/readOnlyCommandValidation)
  - `isDotGitPathPS`, `isGitInternalPathPS` (PowerShellTool/gitSafety)
  - `checkPermissionMode`, `isSymlinkCreatingCommand` (PowerShellTool/modeValidation)
  - `checkPathConstraints`, `dangerousRemovalDeny`, `isDangerousRemovalRawPath` (PowerShellTool/pathValidation)
  - `powershellCommandIsSafe` (PowerShellTool/powershellSecurity)
  - `argLeaksValue`, `isAllowlistedCommand`, `isCwdChangingCmdlet`, `isProvablySafeStatement`, `isReadOnlyCommand`, `isSafeOutputCommand`, `resolveToCanonical` (PowerShellTool/readOnlyValidation)
  - `POWERSHELL_TOOL_NAME` (PowerShellTool/toolName)

## Logic
Implements the permission decision flow for PowerShell:
1. `powershellToolCheckPermission` orchestrates: exact match check, then prefix matching.
2. `powershellToolCheckExactMatchPermission` evaluates exact command rules (deny/ask/allow). If none, returns passthrough with suggestions.
3. Prefix matching via `matchingRulesForInput` applies deny/ask/allow from prefix patterns.
4. If no rule matches, integrates additional checks: mode (`checkPermissionMode`), path constraints (`checkPathConstraints`), read-only safety (`powershellCommandIsSafe`), git safety (internal path guards), and compound command cwd-change detection.
5. Constructs `PermissionResult` with behavior (`allow`/`deny`/`ask`/`passthrough`), message, decisionReason, and suggestions (exact command, add directories, set mode).

## Exports
- `powershellPermissionRule(permissionRule)` - Parses rule string into ShellPermissionRule
- `powershellToolCheckExactMatchPermission(input, context)` - Checks exact command rule match
- `powershellToolCheckPermission(input, context)` - Main permission check with prefix and integration
