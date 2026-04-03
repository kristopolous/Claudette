# zip

## Purpose
Securely extracts and validates zip archives with protection against zip bombs, path traversal attacks, and excessive file counts/sizes. Also parses Unix file modes from zip central directory to preserve executable bits lost during fflate extraction. The `fflate` library is lazy-imported to avoid ~196KB of top-level lookup tables at startup.

## Imports
- **Stdlib**: `path`
- **External**: `fflate` (lazy-imported at runtime)
- **Internal**: `../debug`, `../errors`, `../fsOperations`, `../path`

## Logic
1. Security limits: 512MB per file, 1GB total uncompressed, 100K files max, compression ratio 0.5:1 to 50:1 (zip bomb detection)
2. `isPathSafe` - checks for path traversal and absolute paths (only relative paths allowed in archives)
3. `validateZipFile` - validates each file during extraction: checks file count, path safety, individual file size, total uncompressed size, and compression ratio
4. `unzipFile` - uses fflate's unzipSync (sync for simplicity and to avoid async worker issues), validates each file via filter callback, throws on any validation failure
5. `parseZipModes` - manually parses PKZIP central directory to extract Unix file modes (versionMadeBy high byte == 3). Scans backwards for EOCD record, walks entries, extracts st_mode from externalAttr high 16 bits. Returns name→mode map; missing keys mean use default mode. Does not handle ZIP64.
6. `readAndUnzipFile` - reads zip from disk via fsOperations, calls unzipFile, wraps errors (re-throws ENOENT as-is)

## Exports
- `isPathSafe(filePath: string)` - sync, returns true if path has no traversal attempts and is not absolute
- `validateZipFile(file: ZipFileMetadata, state: ZipValidationState)` - sync, validates a single file during extraction, returns `{ isValid, error? }`
- `unzipFile(zipData: Buffer)` - async, returns `Record<string, Uint8Array>` of extracted files, throws on validation failure
- `parseZipModes(data: Uint8Array)` - sync, returns `Record<string, number>` mapping entry names to Unix mode bits (only for Unix-made entries with non-zero mode)
- `readAndUnzipFile(filePath: string)` - async, reads zip from disk and extracts, returns `Record<string, Uint8Array>`

## Source
`zip`