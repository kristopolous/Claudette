## Purpose
Performs AST-based security analysis on PowerShell commands, detecting dangerous patterns like code injection, download cradles, privilege escalation, and dynamic execution.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal** (selected):
  - `ParsedCommandElement`, `ParsedPowerShellCommand`, `COMMON_ALIASES`, `commandHasArgAbbreviation`, `deriveSecurityFlags`, `getAllCommands`, `getVariablesByScope`, `hasCommandNamed`, `parsePowerShellCommand`, `stripModulePrefix` (utils/powershell/parser)
  - `DANGEROUS_SCRIPT_BLOCK_CMDLETS`, `FILEPATH_EXECUTION_CMDLETS`, `MODULE_LOADING_CMDLETS` (utils/powershell/dangerousCmdlets)
  - `isClmAllowedType` (PowerShellTool/clmTypes)
  - `containsVulnerableUncPath` (utils/shell/readOnlyCommandValidation)

## Logic
`powershellCommandIsSafe(parsed)` runs 19+ AST-based validators in sequence. If any returns `ask`, that result is returned immediately. Validators check for:
- `Invoke-Expression`/`iex` (code eval)
- Dynamic command names (expressions in command position)
- Encoded commands (-EncodedCommand)
- Nested PowerShell processes (pwsh/powershell invocations)
- Download cradles (IWR/IRM + IEX)
- Download utilities (Start-BitsTransfer, certutil -urlcache, bitsadmin)
- `Add-Type` (runtime compilation)
- `New-Object -ComObject`
- Script file execution (`Invoke-Command -FilePath`, `Start-Job -FilePath`, etc.)
- `ForEach-Object -MemberName` (method invocation by string)
- `Start-Process` with -Verb RunAs or PowerShell target
- Script blocks with dangerous cmdlets
- AST features: subexpressions `$()`, expandable strings, splatting `@`, stop-parsing `--%`, member invocations `.`/`::`
- Type literals outside ConstrainedLanguage allowlist (`[Reflection.Assembly]`, etc.)
- `Invoke-Item` (ShellExecute hazard)
- Scheduled task creation
- Environment variable manipulation
- Module loading (`Import-Module`, `Install-Module`)
- Runtime state changes (`Set-Alias`, `Set-Variable`)
- WMI process spawning (`Invoke-WmiMethod`, `Invoke-CimMethod`)

## Exports
- `powershellCommandIsSafe(_command, parsed)` - Returns `{ behavior: 'passthrough' | 'ask', message? }`
