## Purpose
Prevents git-based sandbox escape attacks by detecting when PowerShell arguments reference git internal paths (hooks, objects, refs) that could lead to arbitrary code execution.

## Imports
- **Stdlib**: `path` (basename, posix, resolve, sep)
- **External**: none
- **Internal**:
  - `getCwd` (utils/cwd)
  - `PS_TOKENIZER_DASH_CHARS` (utils/powershell/parser)

## Logic
Normalizes PowerShell path arguments via `normalizeGitPathArg` (handles parameter syntax, quotes, provider prefixes, drive-relative paths, NTFS trailing dot/space stripping). `isGitInternalPathPS` detects paths that resolve to git internals like `hooks/`, `refs/`, `objects/` either as bare-repo root-level or within `.git/`. It handles cwd re-entry attacks (`../<cwd-basename>/`) and resolves paths escaping via `resolveEscapingPathToCwdRelative`. `isDotGitPathPS` matches only standard `.git/` paths, excluding bare-repo style roots. `matchesGitInternalPrefix` and `matchesDotGitPrefix` implement prefix checks including 8.3 short names.

## Exports
- `isGitInternalPathPS(arg)` - True if arg resolves to any git-internal path (bare or standard)
- `isDotGitPathPS(arg)` - True if arg resolves to path inside `.git/` only
- `normalizeGitPathArg(arg)` - Normalizes raw PowerShell path argument to canonical form
- `GIT_INTERNAL_PREFIXES` - Constant array of internal git path components
