# utils/path

## Purpose
Provides path expansion and normalization utilities.

## Imports
- **Stdlib**: `os`, `path`
- **External**: (none)
- **Internal**: cwd, fsOperations, platform, windowsPaths

## Logic
1. `expandPath` - expands path with tilde notation to absolute path
2. `~` expands to user's home directory
3. `~/path` expands to path within home directory
4. Absolute paths returned normalized
5. Relative paths resolved relative to baseDir (defaults to getCwd())
6. On Windows: converts POSIX paths (/c/Users/...) to Windows format
7. Security: checks for null bytes
8. Handles empty/whitespace-only paths
9. Returns NFC-normalized paths
10. `sanitizePath` - sanitizes path for safe use
11. `normalizePathForComparison` - normalizes for comparison
12. `normalizePathForConfigKey` - normalizes for config key
13. `pathInWorkingPath` - checks if path in working path
14. `safeResolvePath` - safely resolves path
15. `expandTilde` - expands tilde notation

## Exports
- `expandPath` - expands path with tilde
- `sanitizePath` - sanitizes path
- `normalizePathForComparison` - normalizes for comparison
- `normalizePathForConfigKey` - normalizes for config key
- `pathInWorkingPath` - checks path in working path
- `safeResolvePath` - safely resolves path
- `expandTilde` - expands tilde
