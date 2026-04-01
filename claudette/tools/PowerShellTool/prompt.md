# tools/PowerShellTool/prompt

## Purpose
Provides PowerShell tool prompt generation utilities.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: utils envUtils, utils shell outputLimits/powershellDetection, utils timeouts, FileEditTool constants, FileReadTool prompt, FileWriteTool prompt, GlobTool prompt, GrepTool prompt, PowerShellTool toolName

## Logic
1. `getDefaultTimeoutMs` - gets default timeout (uses bash default)
2. `getMaxTimeoutMs` - gets max timeout (uses bash max)
3. `getBackgroundUsageNote` - gets background usage note
4. Returns null if CLAUDE_CODE_DISABLE_BACKGROUND_TASKS is truthy
5. Explains run_in_background parameter for long-running commands
6. `getSleepGuidance` - gets sleep guidance
7. Returns null if CLAUDE_CODE_DISABLE_BACKGROUND_TASKS is truthy
8. Advises against unnecessary Start-Sleep commands
9. Recommends run_in_background for long-running commands
10. Advises against retry loops with sleep
11. Recommends short sleep durations (1-5 seconds) if necessary
12. `getEditionSection` - gets PowerShell edition-specific syntax guidance
13. For desktop (5.1): no && / ||, no ternary/null-coalescing/null-conditional, avoid 2>&1 on native executables, UTF-16 LE default encoding, ConvertFrom-Json returns PSCustomObject
14. For core (7+): && / || available, ternary/null-coalescing/null-conditional available, UTF-8 without BOM default encoding
15. For unknown: conservative 5.1-safe guidance
16. `getPrompt` - gets PowerShell tool prompt
17. Includes background note, sleep guidance, edition section
18. Explains tool is for terminal operations (git, npm, docker, PS cmdlets)
19. Advises against using for file operations
20. `isEnvTruthy` - checks env truthy
21. `getMaxOutputLength` - gets max output length
22. `getPowerShellEdition`, `PowerShellEdition` - PowerShell edition detection
23. `getDefaultBashTimeoutMs`, `getMaxBashTimeoutMs` - timeout utilities
24. `FILE_EDIT_TOOL_NAME`, `FILE_READ_TOOL_NAME`, `FILE_WRITE_TOOL_NAME`, `GLOB_TOOL_NAME`, `GREP_TOOL_NAME` - tool name constants
25. `POWERSHELL_TOOL_NAME` - PowerShell tool name

## Exports
- `getDefaultTimeoutMs` - gets default timeout
- `getMaxTimeoutMs` - gets max timeout
- `getBackgroundUsageNote` - gets background note
- `getSleepGuidance` - gets sleep guidance
- `getEditionSection` - gets edition section
- `getPrompt` - gets PowerShell prompt
