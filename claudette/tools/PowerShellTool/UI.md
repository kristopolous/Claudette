# tools/PowerShellTool/UI.tsx

## Purpose
Renders PowerShell tool UI messages for tool use, progress, queued, result, and error states in the terminal interface.

## Imports
- **Stdlib**: none
- **External**: REACT, @anthropic-ai/sdk
- **Internal**: KeyboardShortcutHint, FallbackToolUseErrorMessage, MessageResponse, OutputLine, ShellProgressMessage, ShellTimeDisplay, Box, Text, Tool, ProgressMessage, PowerShellProgress, ThemeName, PowerShellTool types

## Logic
Provides UI component renderers for each stage of PowerShell tool execution. The tool use message renderer truncates long commands for display (max 2 lines, 160 chars) unless verbose mode is on. The progress message renderer shows elapsed time, output lines/bytes, and timeout info. The result renderer displays stdout/stderr output, handles background task indicators, interrupted state, and image data detection. Error rendering delegates to a fallback component.

## Exports
- `renderToolUseMessage` - renders the command being executed, with truncation in non-verbose mode
- `renderToolUseProgressMessage` - renders progress updates including elapsed time, output, and line/byte counts
- `renderToolUseQueuedMessage` - renders a waiting indicator for queued commands
- `renderToolResultMessage` - renders stdout/stderr output with handling for background tasks, interrupts, and image data
- `renderToolUseErrorMessage` - renders error state using the fallback error message component
