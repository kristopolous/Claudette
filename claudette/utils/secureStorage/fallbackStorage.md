# fallbackStorage

## Purpose
Creates a fallback storage wrapper that tries primary secure storage first, then falls back to secondary storage on read/write failures. Handles credential migration between storage backends.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: `./types` (SecureStorage, SecureStorageData)

## Logic
1. `createFallbackStorage(primary, secondary)` - returns a SecureStorage that wraps two storage backends
2. `read()` - tries primary first; if null/undefined, falls back to secondary (returns {} if both empty)
3. `readAsync()` - same logic as read() but async
4. `update(data)` - captures primary state before update; tries primary first; if primary succeeds and had no prior data, deletes secondary (preserves credentials when sharing .claude between host and containers); if primary fails, writes to secondary and deletes stale primary entry to prevent shadowing (fixes /login loop issue #30337); returns fallback result with success:true if secondary write succeeded
5. `delete()` - attempts delete on both; returns true if either succeeds
6. Storage name is `${primary.name}-with-${secondary.name}-fallback`

## Exports
- `createFallbackStorage(primary: SecureStorage, secondary: SecureStorage)` - creates fallback storage wrapper implementing SecureStorage interface
