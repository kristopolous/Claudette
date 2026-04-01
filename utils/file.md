# utils/file

## Purpose
Provides file utilities for path operations, reading, and modification tracking.

## Imports
- **Stdlib**: `fs`, `fs/promises`, `os`, `path`
- **External**: (none)
- **Internal**: analytics, growthbook, cwd, debug, errors, fileRead, fileReadCache, fsOperations, log, path, platform

## Logic
1. `File` - { filename, content } type
2. `pathExists` - async path existence check
3. `MAX_OUTPUT_SIZE` (0.25MB) - max output size limit
4. `readFileSafe` - sync read with error logging
5. `getFileModificationTime` - gets normalized mtime in ms (floor for consistency)
6. `getFileModificationTimeAsync` - async variant for slow-operation indicator
7. `convertLeadingTabsToSpaces` - converts leading tabs to spaces
8. `isBinaryFile` - checks if file is binary
9. `getChangedFiles` - gets files changed since timestamp
10. `readFileWithEncoding` - reads file with detected encoding
11. `writeFileWithLineEndings` - writes file preserving line endings
12. `detectFileEncoding` - detects file encoding from BOM
13. `detectLineEndings` - detects CRLF vs LF line endings
14. `expandTilde` - expands ~ to home directory
15. `normalizePathSeparators` - normalizes path separators for platform
16. `isSubpath` - checks if path is subpath of another
17. `getRelativePath` - gets relative path between two paths

## Exports
- `File` - file type
- `pathExists` - checks path existence
- `MAX_OUTPUT_SIZE` - max output size
- `readFileSafe` - safe file read
- `getFileModificationTime` - gets file mtime
- `getFileModificationTimeAsync` - async file mtime
- `convertLeadingTabsToSpaces` - converts tabs to spaces
- `isBinaryFile` - checks binary file
- `getChangedFiles` - gets changed files
- (File operation utilities)
