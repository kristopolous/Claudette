## Purpose
Print the version of Claude Code currently running (not the autoupdate downloaded version).

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: None (uses MACRO compile-time constants)

## Logic
1. Returns version string from MACRO.VERSION
2. If MACRO.BUILD_TIME exists, includes build timestamp
3. Simple text response with version information
4. Only enabled for Ant users (internal)

## Exports
- `call` - async function returning version text
- `version` - Command object with metadata
