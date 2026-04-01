# utils/cwd

## Purpose
Provides working directory utilities with AsyncLocalStorage override support.

## Imports
- **Stdlib**: `async_hooks`
- **External**: (none)
- **Internal**: bootstrap state

## Logic
1. `cwdOverrideStorage` - AsyncLocalStorage for cwd override
2. Enables concurrent agents to each see their own working directory
3. `runWithCwdOverride` - runs function with overridden cwd
4. All pwd()/getCwd() calls within function return overridden cwd
5. Async descendants also see overridden cwd
6. `pwd` - gets current working directory
7. Returns overridden cwd from storage or global cwd state
8. `getCwd` - gets cwd with fallback to original
9. Tries pwd() first, falls back to getOriginalCwd() on error
10. Handles cases where current cwd becomes unavailable
11. Used for agent worktree isolation

## Exports
- `cwdOverrideStorage` - AsyncLocalStorage for cwd override
- `runWithCwdOverride` - runs with cwd override
- `pwd` - gets current working directory
- `getCwd` - gets cwd with fallback
