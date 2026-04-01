# utils/secureStorage/macOsKeychainStorage

## Purpose
Provides macOS keychain storage implementation.

## Imports
- **Stdlib**: (none)
- **External**: `execa`
- **Internal**: debug, execFileNoThrow, execFileNoThrowPortable, JSON utils, secureStorage macOsKeychainHelpers/types

## Logic
1. `SECURITY_STDIN_LINE_LIMIT` (4032) - stdin line limit for security -i command
2. security -i reads stdin with 4096-byte fgets() buffer (BUFSIZ on darwin)
3. Command line longer than this truncated mid-argument
4. First 4096 bytes consumed as one command (unterminated quote → fails)
5. Overflow interpreted as second unknown command
6. Net: non-zero exit with NO data written, but PREVIOUS keychain entry left intact (stale)
7. Headroom of 64B guards against edge-case line-terminator accounting differences
8. `macOsKeychainStorage` - storage implementation
9. name: 'keychain'
10. `read()` - sync read with TTL cache
11. Returns cached data if within TTL (30s)
12. Uses execSyncWithDefaults_DEPRECATED for security find-generic-password
13. Stale-while-error: if had value before and refresh failed, keep serving stale value
14. Since #23192 clears upstream memoize on every API request, single transient failure would poison cache
15. clearKeychainCache() sets data=null, so explicit invalidation (logout, delete) still reads through
16. `readAsync()` - async read with TTL cache and deduplication
17. Returns cached data if within TTL
18. Joins in-flight read if one exists (deduplicates concurrent calls)
19. Captures generation before spawning, skips cache write if newer generation exists
20. `update()` - async update with generation increment
21. `delete()` - async delete with cache clear
22. `clearKeychainCache()` - clears keychain cache (sets data=null, increments generation)

## Exports
- `SECURITY_STDIN_LINE_LIMIT` - stdin line limit constant
- `macOsKeychainStorage` - macOS keychain storage implementation
