## Purpose
Generates the prompt documentation for the ExitWorktree tool that ends a worktree session and returns to the original working directory.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic
Returns a comprehensive prompt string documenting the ExitWorktree tool's behavior. Covers scope (only worktrees created by EnterWorktree in the current session), when to use (only on explicit user request), parameters (action: keep/remove, discard_changes), and behavior (restores directory, clears caches, handles tmux sessions). Explains that calling outside an EnterWorktree session is a no-op.

## Exports
- `getExitWorktreeToolPrompt` - Returns the full prompt string documenting tool scope, usage, parameters, and behavior
