# utils/fileRead

## Purpose
Provides sync file read utilities with encoding and line ending detection.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: debug, fsOperations

## Logic
1. `LineEndingType` - 'CRLF' | 'LF'
2. `detectEncodingForResolvedPath` - detects encoding from file BOM
3. Reads first 4096 bytes for BOM detection
4. Empty files default to utf8 (fixes emoji/CJK corruption bug)
5. Detects: utf16le (FF FE), utf8 BOM (EF BB BF), defaults utf8
6. `detectLineEndingsForString` - counts CRLF vs LF in string
7. Returns 'CRLF' if more CRLF than LF, else 'LF'
8. `readFileSyncWithMetadata` - reads file with encoding and line endings
9. Single filesystem pass for content + encoding + line endings
10. Callers writing back can reuse metadata instead of re-detecting
11. Avoids separate detectFileEncoding/detectLineEndings calls
12. Uses getFsImplementation for cross-platform file ops
13. safeResolvePath for path resolution

## Exports
- `LineEndingType` - line ending type
- `detectEncodingForResolvedPath` - detects file encoding
- `detectLineEndingsForString` - detects line endings in string
- `readFileSyncWithMetadata` - reads file with metadata
