## Purpose
Provides UI rendering functions for the EnterWorktree tool, displaying worktree creation status and branch information.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `ink`, `ToolProgressData`, `types/message`, `utils/theme`, `EnterWorktreeTool`

## Logic
Implements UI components for displaying EnterWorktree tool interactions in the terminal interface. Renders a 'Creating worktree…' message during tool use, and on completion displays the worktree branch name and path in a formatted layout using Ink components.

## Exports
- `renderToolUseMessage` - Renders 'Creating worktree…' during tool execution
- `renderToolResultMessage` - Renders the result showing the worktree branch and path
