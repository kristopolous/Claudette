# worktreeModeEnabled

## Purpose
Returns whether worktree mode is enabled. Now unconditionally returns `true` for all users.

## Imports
- None (dependency-free)

## Logic
Previously gated by a GrowthBook flag (`tengu_worktree_mode`), but the `CACHED_MAY_BE_STALE` pattern returned the default (`false`) on first launch before the cache was populated, silently swallowing `--worktree`. The flag was removed entirely — the function now always returns `true`.

## Exports
- `isWorktreeModeEnabled(): boolean` — always returns `true`

## Source
`worktreeModeEnabled`
