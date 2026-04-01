# utils/commitAttribution

## Purpose
Provides commit attribution tracking for AI-generated code changes.

## Imports
- **Stdlib**: `crypto`, `fs/promises`, `path`
- **External**: (none)
- **Internal**: bootstrap state, logs types, cwd, debug, execFileNoThrow, fsOperations, generatedFiles, git gitFilesystem/git, log, model model, sequential

## Logic
1. `INTERNAL_MODEL_REPOS` - allowlist of private repos allowing internal model names
2. Includes anthropics/* and anthropic-experimental/* private repos
3. Intentionally repo allowlist, not org-wide (public repos need undercover mode ON)
4. `getRepoRoot` - gets repo root for attribution operations
5. Uses getCwd() respecting agent

AsyncLocalStorage
6. Handles `cd subdir` case by resolving to git root
7. `FileAttributionState` - tracks file attribution state
8. `AttributionSnapshotMessage` - attribution snapshot message type
9. `incrementPromptCount` - increments prompt count for tracking
10. `getAttributionState` - gets current attribution state
11. `updateAttributionState` - updates attribution state
12. `shouldUseUndercoverMode` - checks if undercover mode should be used
13. Returns true for internal model repos (allowlist)
14. `formatCommitTrailers` - formats commit trailers for attribution
15. `parseCommitTrailers` - parses commit trailers
16. `getGitAuthorFromModel` - gets git author info from model name
17. Uses sequential wrapper for file operations

## Exports
- `INTERNAL_MODEL_REPOS` - internal model repos allowlist
- `FileAttributionState` - file attribution state type
- `AttributionSnapshotMessage` - attribution snapshot type
- `incrementPromptCount` - increments prompt count
- `getAttributionState` - gets attribution state
- `updateAttributionState` - updates attribution state
- `shouldUseUndercoverMode` - checks undercover mode
- `formatCommitTrailers` - formats commit trailers
- `parseCommitTrailers` - parses commit trailers
