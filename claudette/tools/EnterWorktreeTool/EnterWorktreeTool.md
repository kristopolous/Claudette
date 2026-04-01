## Purpose
Tool for creating an isolated git worktree and switching the current session into it, enabling focused work on a specific task or plan.

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - State: `getSessionId`, `setOriginalCwd`
  - Constants: `clearSystemPromptSections`
  - Analytics: `logEvent`
  - Tool: `buildTool`, `ToolDef`, `Tool`
  - Utils: `clearMemoryFileCaches`, `getCwd`, `findCanonicalGitRoot`, `lazySchema`, `getPlanSlug`, `getPlansDirectory`, `setCwd`, `saveWorktreeState`
  - Worktree: `createWorktreeForSession`, `getCurrentWorktreeSession`, `validateWorktreeSlug`
  - Local: `ENTER_WORKTREE_TOOL_NAME`, `getEnterWorktreeToolPrompt`, `renderToolResultMessage`, `renderToolUseMessage`

## Logic
1. Validates not already in a worktree session (created by this session)
2. Resolves to main repository root if called from within a worktree (ensures worktree is based on main repo)
3. Changes CWD to main repo root temporarily for worktree creation
4. Uses provided name or generates from plan slug
5. Creates worktree via createWorktreeForSession (creates branch, checks out)
6. Switches process CWD and session CWD to new worktree
7. Saves worktree state for ExitWorktree and session cleanup
8. Clears system prompt sections and memory file caches to recompute with new CWD
9. Clears getPlansDirectory cache
10. Logs analytics event
11. Returns worktree path, branch, and message

## Exports
- `EnterWorktreeTool` - Main tool definition
- `Output` - Type (worktreePath, worktreeBranch?, message)
