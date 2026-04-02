# dangerousCmdlets

## Purpose
Shared constants for PowerShell cmdlets that execute arbitrary code. Consumed by both the permission-engine validators (powershellSecurity.ts) and the UI suggestion gate (staticPrefix.ts). Centralized to avoid sync drift.

## Imports
- **Internal**: ../permissions/dangerousPatterns, ./parser

## Logic
Defines categorized Sets of dangerous cmdlets:
1. FILEPATH_EXECUTION_CMDLETS — cmdlets accepting -FilePath to execute script files
2. DANGEROUS_SCRIPT_BLOCK_CMDLETS — cmdlets where scriptblock args execute arbitrary code
3. MODULE_LOADING_CMDLETS — cmdlets that load/execute module code (.psm1 runs top-level on import)
4. NETWORK_CMDLETS — wildcard rules enable exfil/download without prompt
5. ALIAS_HIJACK_CMDLETS — Set-Alias/Set-Variable can rebind command resolution or poison defaults
6. WMI_CIM_CMDLETS — process spawn that bypasses checkStartProcess
7. ARG_GATED_CMDLETS — allowlisted cmdlets with additionalCommandIsDangerousCallback; suggesting wildcards for these bypasses the callback
8. NEVER_SUGGEST — derived union of all above plus shells/spawners, ForEach-Object (method resolution via pipeline), and cross-platform interpreters from dangerousPatterns. Expanded with aliases via `aliasesOf()`.

## Exports
- `FILEPATH_EXECUTION_CMDLETS` - Set: invoke-command, start-job, start-threadjob, register-scheduledjob
- `DANGEROUS_SCRIPT_BLOCK_CMDLETS` - Set: invoke-command, invoke-expression, start-job, etc.
- `MODULE_LOADING_CMDLETS` - Set: import-module, ipmo, install-module, save-module, update-module, install-script, save-script
- `NETWORK_CMDLETS` - Set: invoke-webrequest, invoke-restmethod
- `ALIAS_HIJACK_CMDLETS` - Set: set-alias, sal, new-alias, nal, set-variable, sv, new-variable, nv
- `WMI_CIM_CMDLETS` - Set: invoke-wmimethod, iwmi, invoke-cimmethod
- `ARG_GATED_CMDLETS` - Set: select-object, sort-object, where-object, format-*, out-*, plus native executables (ipconfig, hostname, route)
- `NEVER_SUGGEST` - ReadonlySet: union of all dangerous cmdlets + shells/spawners + ForEach-Object + cross-platform interpreters, expanded with aliases

## Source
`dangerousCmdlets`
