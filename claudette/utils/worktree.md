# utils/worktree

## Purpose
Provides git worktree management utilities.

## Imports
- **Stdlib**: `child_process`, `fs/promises`, `path`
- **External**: BUILDFLAGS, STYLER, `ignore`
- **Internal**: config, cwd, debug, errors, execFileNoThrow, git gitConfigParser/gitFilesystem/git, hooks, path, platform, settings settings, sleep, swarm backends/detection

## Logic
1. `VALID_WORKTREE_SLUG_SEGMENT` - regex for valid slug segment: /^[a-zA-Z0-9._-]+$/
2. `MAX_WORKTREE_SLUG_LENGTH` (64) - max slug length
3. `validateWorktreeSlug` - validates worktree slug to prevent path traversal
4. Slug joined into .claude/worktrees/<slug> via path.join, which normalizes .. segments
5. ../../../target would escape worktrees directory
6. Absolute path (leading / or C:\) would discard prefix entirely
7. Forward slashes allowed for nesting (e.g. asm/feature-foo)
8. Each segment validated independently against allowlist
9. . / .. segments and drive-spec characters still rejected
10. Throws synchronously - callers rely on this running before any side effects
11. `createWorktree` - creates git worktree
12. `removeWorktree` - removes git worktree
13. `listWorktrees` - lists git worktrees
14. `getWorktreePath` - gets worktree path
15. `getWorktreeBranch` - gets worktree branch
16. `getWorktreeHead` - gets worktree HEAD
17. `isWorktree` - checks if path is worktree
18. `getWorktreeCount` - gets worktree count
19. `getWorktreePaths` - gets all worktree paths
20. `cleanupStaleAgentWorktrees` - cleans up stale agent worktrees
21. `executeWorktreeCreateHook`, `executeWorktreeRemoveHook`, `hasWorktreeCreateHook` - worktree hook functions
22. `getCommonDir`, `readWorktreeHeadSha`, `resolveGitDir`, `resolveRef` - git filesystem functions
23. `findCanonicalGitRoot`, `findGitRoot`, `getBranch`, `getDefaultBranch`, `gitExe` - git functions
24. `parseGitConfigValue` - parses git config value
25. `getCwd` - gets current working directory
26. `logForDebugging` - debug logging
27. `errorMessage`, `getErrnoCode` - error functions
28. `execFileNoThrow`, `execFileNoThrowWithCwd` - exec functions
29. `containsPathTraversal` - checks path traversal
30. `getPlatform` - gets platform
31. `getInitialSettings`, `getRelativeSettingsFilePathForSource` - settings functions
32. `sleep` - sleep function
33. `isInITerm2` - checks if in iTerm2
34. `feature` - feature flag checker
35. STYLER - STYLER for terminal colors
36. `spawnSync` - sync spawn
37. `copyFile`, `mkdir`, `readdir`, `readFile`, `stat`, `symlink`, `utimes` - fs/promises functions
38. `ignore` - ignore library
39. `basename`, `dirname`, `join` - path functions
40. `saveCurrentProjectConfig` - saves current project config

## Exports
- `VALID_WORKTREE_SLUG_SEGMENT` - valid slug segment regex
- `MAX_WORKTREE_SLUG_LENGTH` - max slug length constant
- `validateWorktreeSlug` - validates worktree slug
- `createWorktree` - creates worktree
- `removeWorktree` - removes worktree
- `listWorktrees` - lists worktrees
- `getWorktreePath` - gets worktree path
- `getWorktreeBranch` - gets worktree branch
- `getWorktreeHead` - gets worktree HEAD
- `isWorktree` - checks if worktree
- `getWorktreeCount` - gets worktree count
- `getWorktreePaths` - gets worktree paths
- `cleanupStaleAgentWorktrees` - cleans stale worktrees
- (Worktree management functions)
