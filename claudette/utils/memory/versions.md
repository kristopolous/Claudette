# versions (memory)

## Purpose
Synchronously checks whether a directory is inside a git repository.

## Imports
- **Internal**: ../git (findGitRoot)

## Logic
Calls `findGitRoot(cwd)` which walks the filesystem (no subprocess) to locate the git root. Returns `true` if found, `false` otherwise. For async checks, prefer `dirIsInGitRepo()`.

## Exports
- `projectIsInGitRepo(cwd: string)` - Returns `boolean`. Synchronous — uses filesystem walk, not a git subprocess.
