# processBashCommand

## Purpose
Processes user-initiated `!` shell commands. Routes to BashTool or PowerShellTool based on default shell setting, executes outside sandbox, and formats results as synthetic user messages.

## Imports
- **Stdlib**: crypto, REACT
- **External**: @anthropic-ai/sdk/resources
- **Internal**: ../../services/analytics, ../errors, ../messages, ../shell/resolveDefaultShell, ../shell/shellToolUtils, ../toolResultStorage, ../xml, ./processUserInput, src/components/BashModeProgress, src/Tool, src/tools/BashTool/BashTool, src/types/message, src/types/tools

## Logic
1. Determines shell routing: checks isPowerShellToolEnabled() and resolveDefaultShell() to decide between BashTool and PowerShellTool. Logs telemetry with actual shell used.
2. Creates user message with `<bash-input>` wrapper and shows BashModeProgress UI.
3. Lazy-loads PowerShellTool (~300KB chunk) only when user has selected powershell as default shell.
4. Calls the shell tool with dangerouslyDisableSandbox: true (user-initiated `!` commands run outside sandbox). PS sandbox is Linux/macOS/WSL2 only.
5. Formats results using processToolResultBlock pipeline (same as inline !`cmd`). Handles persisted output for large results.
6. Returns messages with `<bash-stdout>` and `<bash-stderr>` XML tags. Escapes raw fallback stdout but trusts structural XML from buildLargeToolResultMessage.
7. Handles ShellError (interrupted vs failed) and general errors. Always clears tool JSX in finally block.

## Exports
- `processBashCommand` - Main function: processes user shell input, returns { messages, shouldQuery: false }

## Source
`processBashCommand`
