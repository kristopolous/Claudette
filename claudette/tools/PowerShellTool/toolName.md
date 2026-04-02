# tools/PowerShellTool/toolName.ts

## Purpose
Provides PowerShell tool name constant to break circular dependency.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `POWERSHELL_TOOL_NAME` - 'PowerShell' constant
2. Exported to break circular dependency from prompt

## Exports
- `POWERSHELL_TOOL_NAME` - PowerShell tool name constant
