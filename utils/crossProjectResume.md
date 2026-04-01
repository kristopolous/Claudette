# utils/crossProjectResume

## Purpose
Checks if session log is from different project and generates resume command.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: bootstrap state, logs types, bash shellQuote, sessionStorage

## Logic
1. `CrossProjectResumeResult` - union of resume result types
2. `isCrossProject: false` - same project, no action needed
3. `isCrossProject: true, isSameRepoWorktree: true` - same repo worktree
4. `isCrossProject: true, isSameRepoWorktree: false` - different repo with command
5. `checkCrossProjectResume` - checks if log is from different project
6. Returns early if not showing all projects or same cwd
7. Gates worktree detection to ants only (staged rollout)
8. For non-ants: generates cd command with quoted path
9. For ants: checks if projectPath is under worktree of same repo
10. Uses worktreePaths array for detection
11. Same repo worktree: returns projectPath without command
12. Different repo: generates `cd <path> && claude --resume <sessionId>`
13. Uses quote() for proper shell escaping of paths

## Exports
- `CrossProjectResumeResult` - resume result type
- `checkCrossProjectResume` - checks cross-project resume
