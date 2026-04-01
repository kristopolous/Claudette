## Purpose
Provides a dialog for users to decide whether to keep or remove a worktree session when exiting.

## Imports
- **Stdlib**: none
- **External**: `react`
- **Internal**: `src/commands`, `src/services/analytics/index`, `src/utils/debug`, `../ink`, `../utils/execFileNoThrow`, `../utils/plans`, `../utils/Shell`, `../utils/worktree`, `./CustomSelect/select`, `./design-system/Dialog`, `./Spinner`

## Logic
On mount, loads git status to detect uncommitted changes and commits in the worktree. If no changes exist, silently removes the worktree. Otherwise presents a dialog with options to keep (with or without tmux), remove, or cancel. Handles cleanup operations including tmux session management, directory changes, and state persistence. Analytics events are logged for keep/remove actions.

## Exports
- `WorktreeExitDialog` - dialog that prompts users to keep or remove a worktree session on exit
