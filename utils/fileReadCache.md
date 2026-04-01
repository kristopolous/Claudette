# utils/fileReadCache

## Purpose
Provides in-memory file content cache with mtime-based invalidation.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: file, fsOperations

## Logic
1. `CachedFileData` - { content, encoding, mtime }
2. `FileReadCache` class with Map-based storage
3. `maxCacheSize` (1000) - max cache entries
4. `readFile` - reads file with caching
5. Cache key includes file path
6. Checks mtime for automatic invalidation
7. Returns cached data if mtime matches
8. On cache miss: reads file, detects encoding, normalizes line endings
9. Updates cache with new data and mtime
10. Evicts oldest entry if cache exceeds max size
11. `clear` - clears entire cache
12. `invalidate` - removes specific file from cache
13. Eliminates redundant reads in FileEditTool operations
14. Uses getFsImplementation for cross-platform ops

## Exports
- `CachedFileData` - cached file data type
- `FileReadCache` - file read cache class
