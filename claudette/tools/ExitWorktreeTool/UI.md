## Purpose
Provides UI rendering functions for the ExitWorktree tool, displaying worktree exit status and branch information.

## Imports
- **Stdlib**: None
- **External**: `react`
- **Internal**: `ink`, `ToolProgressData`, `types/message`, `utils/theme`, `ExitWorktreeTool`

## Logic
Implements UI components for displaying ExitWorktree tool interactions in the terminal interface. Renders a simple 'Exiting worktree…' message during tool use, and on completion displays whether the worktree was kept or removed, the associated branch name (if any), and the original working directory that was restored.

## Exports
- `renderToolUseMessage` - Renders 'Exiting worktree…' during tool execution
- `renderToolResultMessage` - Renders the exit result showing keep/remove action, branch info, and restored directory
