## Purpose
Tool for exiting a worktree session created by EnterWorktree, with options to either preserve or delete the worktree and its branch.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - State: `getOriginalCwd`, `getProjectRoot`, `setOriginalCwd`, `setProjectRoot`
  - Constants: `clearSystemPromptSections`
  - Analytics: `logEvent`
  - Tool: `buildTool`, `ToolDef`, `Tool`
  - Utils: `count`, `clearMemoryFileCaches`, `execFileNoThrow`, `updateHooksConfigSnapshot`, `lazySchema`, `getPlansDirectory`, `setCwd`, `saveWorktreeState`
  - Worktree: `cleanupWorktree`, `getCurrentWorktreeSession`, `keepWorktree`, `killTmuxSession`
  - Local: `EXIT_WORKTREE_TOOL_NAME`, `getExitWorktreeToolPrompt`, `renderToolResultMessage`, `renderToolUseMessage`

## Logic
1. Validates an EnterWorktree session is active (getCurrentWorktreeSession() non-null)
2. For action='remove' without discard_changes: counts uncommitted files and commits ahead of original base; rejects if any exist
3. countWorktreeChanges uses git status and rev-list; returns null on failure (treated as unsafe)
4. On call:
   - Captures session info (originalCwd, worktreePath, branch, tmux, originalHeadCommit)
   - Determines if projectRoot was set to worktree (for restoration)
   - Re-counts changes for accurate output
5. keep action:
   - Calls keepWorktree() (preserves worktree on disk)
   - Restores session CWD to original, clears caches
   - Logs analytics, returns message with tmux note if applicable
6. remove action:
   - Kills tmux session if any
   - Calls cleanupWorktree() (deletes worktree dir and branch)
   - Restores session CWD
   - Logs analytics, returns message with discard summary
7. restoreSessionToOriginalCwd handles state reset: CWD, originalCwd, projectRoot (if it was the worktree), worktree state, caches

## Exports
- `ExitWorktreeTool` - Main tool definition
- `Output` - Type (action, originalCwd, worktreePath, worktreeBranch?, tmuxSessionName?, discardedFiles?, discardedCommits?, message)
- Helper: `countWorktreeChanges` (returns changedFiles and commits or null)
- Helper: `restoreSessionToOriginalCwd`
