# utils/fileStateCache

## Purpose
Provides LRU cache for file state with path normalization.

## Imports
- **Stdlib**: `path`
- **External**: `lru-cache`
- **Internal**: (none)

## Logic
1. `FileState` - { content, timestamp, offset, limit, isPartialView }
2. `isPartialView` - true when content was auto-injected and didn't match disk
3. Indicates model saw partial view (stripped HTML/frontmatter, truncated)
4. Edit/Write must require explicit Read first for partial views
5. `content` holds RAW disk bytes for diffing, not what model saw
6. `READ_FILE_STATE_CACHE_SIZE` (100) - default max entries
7. `DEFAULT_MAX_CACHE_SIZE_BYTES` (25MB) - default size limit
8. `FileStateCache` class with path normalization
9. Normalizes all path keys before access (handles relative/absolute, / vs \)
10. Ensures consistent cache hits regardless of path format
11. Uses LRUCache with sizeCalculation based on content byte length
12. Methods: get, set, has, delete, clear, size, max, maxSize, calculatedSize, keys
13. `createFileStateCacheWithSizeLimit` - creates cache with size limit
14. `mergeFileStateCaches` - merges two file state caches
15. `cloneFileStateCache` - clones file state cache

## Exports
- `FileState` - file state type
- `READ_FILE_STATE_CACHE_SIZE` - default cache size
- `DEFAULT_MAX_CACHE_SIZE_BYTES` - default max size
- `FileStateCache` - file state cache class
- `createFileStateCacheWithSizeLimit` - creates size-limited cache
- `mergeFileStateCaches` - merges caches
- `cloneFileStateCache` - clones cache
