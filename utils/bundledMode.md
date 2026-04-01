# utils/bundledMode

## Purpose
Detects Bun runtime and bundled mode for standalone executables.

## Imports
- **Stdlib**: `process`
- **External**: (none)
- **Internal**: (none)

## Logic
1. `isRunningWithBun` - detects if running with Bun runtime
2. Checks process.versions.bun !== undefined
3. Returns true for JS files via `bun` command
4. Returns true for Bun-compiled standalone executables
5. `isInBundledMode` - detects Bun-compiled standalone executable
6. Checks typeof Bun !== 'undefined'
7. Checks Bun.embeddedFiles is array with length > 0
8. Embedded files present in compiled binaries
9. Used for feature detection and conditional imports
10. Enables DCE (dead code elimination) for external builds

## Exports
- `isRunningWithBun` - detects Bun runtime
- `isInBundledMode` - detects bundled mode
