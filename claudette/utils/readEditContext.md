# readEditContext

## Purpose
Finds a needle string in a file and returns a context-window slice containing the match plus surrounding lines. Uses chunked scanning with CRLF support for memory-efficient file reading.

## Imports
- **Stdlib**: `fs/promises` (open, FileHandle)
- **Internal**: `./errors` (isENOENT)

## Logic
1. Scans files in 8KB chunks (CHUNK_SIZE) with a straddle overlap so matches crossing chunk boundaries are found
2. Capped at MAX_SCAN_BYTES (10MB) — returns `{ truncated: true }` if needle not found within limit
3. Handles both LF and CRLF line endings: tries LF first, falls back to CRLF if needle contains newlines
4. `sliceContext` reads backward and forward from match position to find contextLines boundaries, reusing the scratch buffer for zero new allocations when context fits
5. `readCapped` reads entire file into a growing buffer (doubling on fill) for multi-edit paths that need the full string
6. Returns null on ENOENT (file not found)

## Exports
- `CHUNK_SIZE` - constant: 8192 (8KB chunk size for scanning)
- `MAX_SCAN_BYTES` - constant: 10485760 (10MB scan limit)
- `EditContext` - type: `{ content: string, lineOffset: number, truncated: boolean }`
- `readEditContext(path, needle, contextLines?)` - main entry point; opens file, scans for needle, returns EditContext with surrounding context or null on ENOENT
- `openForScan(path)` - opens file for reading, returns null on ENOENT
- `scanForContext(handle, needle, contextLines)` - core scanning logic; accepts an open FileHandle, returns EditContext
- `readCapped(handle)` - reads entire file up to MAX_SCAN_BYTES, returns null if exceeded; used for multi-edit paths
