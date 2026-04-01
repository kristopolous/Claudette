# fileStateCache.ts

## Purpose
Provides a file state caching system with LRU (Least Recently Used) eviction that normalizes all path keys before access. This ensures consistent cache hits regardless of path format variations (relative vs absolute paths, redundant segments like `/foo/../bar`, or mixed path separators on Windows).

## Imports
- **Stdlib**: `path` (for `normalize`)
- **External**: `lru-cache` (for `LRUCache`)
- **Internal**: None

## Types

### FileState
```typescript
type FileState = {
  content: string       // File content
  timestamp: number     // Last modification time
  offset: number | undefined      // Read offset (for partial reads)
  limit: number | undefined       // Read limit (for partial reads)
  isPartialView?: boolean         // True when populated by auto-injection (e.g. CLAUDE.md) where injected content did not match disk
}
```

### FileStateCache
```typescript
class FileStateCache {
  constructor(maxEntries: number, maxSizeBytes: number)
  
  // Basic cache operations (all normalize keys before access)
  get(key: string): FileState | undefined
  set(key: string, value: FileState): this
  has(key: string): boolean
  delete(key: string): boolean
  clear(): void
  
  // Size and capacity properties
  size: number          // Current number of entries
  max: number           // Maximum number of entries
  maxSize: number       // Maximum size in bytes
  calculatedSize: number // Current total size of all entries
  
  // Iteration
  keys(): Generator<string>
  entries(): Generator<[string, FileState]>
  
  // Serialization (LRU cache dump/load for persistence)
  dump(): ReturnType<LRUCache<string, FileState>['dump']>
  load(entries): void
}
```

## Constants
- `READ_FILE_STATE_CACHE_SIZE = 100` - Default max entries for read file state caches
- `DEFAULT_MAX_CACHE_SIZE_BYTES = 25 * 1024 * 1024` (25MB) - Default size limit to prevent unbounded memory growth

## Logic
1. Wraps `LRUCache` from the `lru-cache` package with path normalization on all key access
2. Size calculation uses `Buffer.byteLength(value.content)` with minimum of 1 byte per entry
3. Entry eviction is based on both max entry count AND max size in bytes
4. Path normalization ensures `/foo/../bar` and `/foo/bar` hit the same cache entry
5. Serialization via `dump()`/`load()` preserves cache state across restarts

## Exports
- `FileState` - type for cached file state
- `FileStateCache` - main cache class with path normalization
- `READ_FILE_STATE_CACHE_SIZE` - default cache size constant
- `createFileStateCacheWithSizeLimit()` - factory function to create a size-limited cache
- `cacheToObject()` - converts cache to plain object (used by compact.ts)
- `cacheKeys()` - returns all cache keys as array
- `cloneFileStateCache()` - clones a cache preserving size limit config
- `mergeFileStateCaches()` - merges two caches, with more recent entries (by timestamp) overriding older ones
