# utils/sessionEnvironment

## Purpose
Provides session environment script management for hook execution.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: (none)
- **Internal**: bootstrap state, debug, envUtils, errors, platform

## Logic
1. `sessionEnvScript` - cached session env script (undefined = not loaded, null = no files, string = cached)
2. `getSessionEnvDirPath` - gets session env directory path (~/.claude/session-env/{sessionId})
3. Creates directory recursively
4. `getHookEnvFilePath` - gets hook env file path for specific hook event and index
5. Supports: Setup, SessionStart, CwdChanged, FileChanged hook events
6. Format: {prefix}-hook-{index}.sh
7. `clearCwdEnvFiles` - clears cwd-related env files (filechanged-hook-*, cwdchanged-hook-*)
8. Filters files by prefix and HOOK_ENV_REGEX
9. Writes empty content to clear files
10. Ignores ENOENT errors
11. `invalidateSessionEnvCache` - invalidates session env cache (sets to undefined)
12. `getSessionEnvironmentScript` - gets session environment script
13. Returns null on Windows (not yet supported)
14. Returns cached script if already loaded
15. Checks CLAUDE_ENV_FILE from parent process (e.g., HFI trajectory runner)
16. Allows venv/conda activation to persist across shell commands
17. Loads and caches environment scripts from hook files
18. `HOOK_ENV_REGEX` - regex for hook env file names

## Exports
- `getSessionEnvDirPath` - gets session env directory
- `getHookEnvFilePath` - gets hook env file path
- `clearCwdEnvFiles` - clears cwd env files
- `invalidateSessionEnvCache` - invalidates cache
- `getSessionEnvironmentScript` - gets environment script
