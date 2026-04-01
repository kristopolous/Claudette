## Purpose
Provides path resolution, validation, and security checks for the team memory directory.

## Imports
- **Stdlib**: fs/promises, path
- **External**: none
- **Internal**: services/analytics/growthbook, utils/errors, paths

## Logic
Determines whether team memory features are enabled by checking auto memory status and a feature flag. Computes the team memory directory path and entrypoint path as subdirectories of the auto-memory directory scoped per-project. Implements multi-layer path validation including sanitization of path keys against null bytes, URL-encoded traversals, Unicode normalization attacks, backslashes, and absolute paths. Validates write paths and server-provided keys through two-pass checks: first resolving traversal segments with path.resolve, then resolving symlinks on the deepest existing ancestor with realpath to detect symlink-based escapes.

## Exports
- `PathTraversalError` - error class thrown when path validation detects traversal or injection attempts
- `isTeamMemoryEnabled` - returns whether team memory features are active
- `getTeamMemPath` - returns the team memory directory path
- `getTeamMemEntrypoint` - returns the team memory MEMORY.md entrypoint path
- `isTeamMemPath` - checks if a resolved absolute path is within the team memory directory
- `validateTeamMemWritePath` - validates that an absolute file path is safe for writing to the team memory directory
- `validateTeamMemKey` - validates a relative path key from the server against the team memory directory
- `isTeamMemFile` - checks if a file path is within the team memory directory and team memory is enabled
