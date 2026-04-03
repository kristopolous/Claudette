# ResumeConversation

## Purpose
Implements the session resume screen that allows users to search and resume previous conversations.

## Imports
- **Stdlib**: `path`
- **External**: `react/compiler-runtime`, BUILDFLAGS, `react`
- **Internal**: terminalSize, bootstrap state, commands, LogSelector, Spinner, cost-tracker, clipboard, ink components, keybindings, analytics, MCP types, state, Tool/Agent types, session search/restore/storage utils, REPL component

## Logic
1. `parsePrIdentifier` - extracts PR number from direct number or GitHub URL
2. Loads conversation logs progressively (same-repo or all-projects)
3. Handles cross-project resume validation
4. Restores session metadata, agent state, and worktree
5. Adopts resumed session file and enriches logs
6. Supports PR filtering for session search
7. Handles fork session and task list options
8. Manages loading/resuming state with spinner
9. Sets clipboard with session info
10. Transitions to REPL component after resume

## Exports
- `ResumeConversation` - React component for session resume flow
