## Purpose
Provides the prompt and usage guidelines for the EnterWorktreeTool, which creates isolated git worktrees when explicitly requested.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic
Defines a function that returns a prompt string describing when and how to use the worktree tool. The tool is only used when the user explicitly mentions "worktree", requires a git repository or WorktreeCreate/WorktreeRemove hooks, and creates an isolated worktree in `.claude/worktrees/` or delegates to VCS-agnostic hooks outside a repository.

## Exports
- `getEnterWorktreeToolPrompt` - returns the prompt string describing worktree tool usage, requirements, and behavior
