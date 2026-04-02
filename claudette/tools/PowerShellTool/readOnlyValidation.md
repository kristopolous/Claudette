# tools/PowerShellTool/readOnlyValidation.ts

## Purpose
Provides PowerShell read-only command validation utilities.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: utils powershell parser, utils platform, utils powershell parser, utils shell readOnlyCommandValidation, PowerShellTool commonParameters

## Logic
1. Cmdlets are case-insensitive; all matching done in lowercase
2. `ParsedStatement` - parsed statement type
3. `CommandConfig` - { safeFlags?, allowAllFlags?, regex?, additionalCommandIsDangerousCallback? }
4. `safeFlags` - safe subcommands or flags for command
5. `allowAllFlags` - when true, all flags allowed regardless of safeFlags
6. Use for commands whose entire flag surface is read-only (e.g., hostname)
7. Without this, empty/missing safeFlags rejects all flags (positional args only)
8. `regex` - regex constraint on original command
9. `additionalCommandIsDangerousCallback` - additional validation callback
10. Returns true if command is dangerous
11. `DOTNET_READ_ONLY_FLAGS` - Set of read-only flags for dotnet
12. `argLeaksValue` - checks if arg leaks value via print/coerce to stdout/stderr
13. Cmdlets that print or coerce args: Write-Output $env:SECRET prints directly
14. Start-Sleep $env:SECRET leaks via type-coerce error
15. Bash's echo regex whitelists safe chars per token
16. Two checks: elementTypes whitelist, colon-bound parameter value
17. elementTypes: StringConstant (literals) + Parameter (flag names)
18. Rejects Variable, Other (HashtableAst/ConvertExpressionAst/BinaryExpressionAst), ScriptBlock, SubExpression, ExpandableString
19. Colon-bound parameter: -InputObject:$env:SECRET creates single CommandParameterAst
20. VariableExpressionAst is .Argument child, not separate CommandElement
21. elementTypes = [..., 'Parameter'], whitelist passes
22. Query children[] for .Argument's mapped type
23. Anything other than StringConstant (Variable, ParenExpression, Hashtable, etc.) is leak vector
24. `getPlatform` - gets platform
25. `COMMON_ALIASES`, `deriveSecurityFlags`, `getPipelineSegments`, `isNullRedirectionTarget`, `isPowerShellParameter` - parser utilities
26. `ExternalCommandConfig` - external command config type
27. `DOCKER_READ_ONLY_COMMANDS`, `EXTERNAL_READONLY_COMMANDS`, `GH_READ_ONLY_COMMANDS`, `GIT_READ_ONLY_COMMANDS`, `validateFlags` - read-only validation utilities
28. `COMMON_PARAMETERS` - common parameters

## Exports
- `argLeaksValue(_cmd, element?)` - checks if arg leaks value via print/coerce to stdout/stderr
- `CMDLET_ALLOWLIST` - Record of allowlisted cmdlets with safeFlags/allowAllFlags/regex/callbacks
- `resolveToCanonical(name)` - resolves command name to canonical form (alias resolution, PATHEXT stripping)
- `isCwdChangingCmdlet(name)` - checks if cmdlet alters path-resolution namespace (Set-Location, Push-Location, Pop-Location, New-PSDrive)
- `isSafeOutputCommand(name)` - checks if cmdlet is a safe output cmdlet (Out-Null)
- `isAllowlistedPipelineTail(cmd, originalCommand)` - checks if command is a pipeline-tail transformer with argLeaksValue guard
- `isProvablySafeStatement(stmt)` - fail-closed gate: true only for PipelineAst with all CommandAst elements
- `hasSyncSecurityConcerns(command)` - regex-based pre-filter for dangerous patterns (subexpressions, splatting, member invocations, assignments, --%, UNC, ::)
- `isReadOnlyCommand(command, parsed?)` - main read-only check using allowlist + flag validation
- `isAllowlistedCommand(cmd, originalCommand)` - checks if a single command element passes allowlist + flag validation
