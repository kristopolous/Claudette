# utils/shell/shellToolUtils

## Purpose
Provides shell tool utilities including PowerShell tool enablement gate.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: BashTool toolName, PowerShellTool toolName, envUtils, platform

## Logic
1. `SHELL_TOOL_NAMES` - [BASH_TOOL_NAME, POWERSHELL_TOOL_NAME]
2. `isPowerShellToolEnabled` - runtime gate for PowerShellTool
3. Windows-only (permission engine uses Win32-specific path normalizations)
4. Ant defaults on (opt-out via env=0)
5. External defaults off (opt-in via env=1)
6. Used by tools.ts (tool-list visibility), processBashCommand (! routing), promptShellExecution (skill frontmatter routing)
7. Gate is consistent across all paths that invoke PowerShellTool.call()
8. Checks platform is Windows first
9. For ant users: returns !isEnvDefinedFalsy(CLAUDE_CODE_USE_POWERSHELL_TOOL)
10. For external users: returns isEnvTruthy(CLAUDE_CODE_USE_POWERSHELL_TOOL)
11. `BASH_TOOL_NAME`, `POWERSHELL_TOOL_NAME` - tool name constants
12. `isEnvDefinedFalsy`, `isEnvTruthy` - env check functions
13. `getPlatform` - gets platform

## Exports
- `SHELL_TOOL_NAMES` - shell tool names array
- `isPowerShellToolEnabled` - checks if PowerShell tool enabled
