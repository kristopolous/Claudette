# utils/secureStorage/macOsKeychainHelpers

## Purpose
Lightweight helpers shared between keychainPrefetch.ts and macOsKeychainStorage.ts.

## Imports
- **Stdlib**: `crypto`, `os`
- **External**: (none)
- **Internal**: oauth constants, envUtils, secureStorage types

## Logic
1. MUST NOT import execa, execFileNoThrow, or execFileNoThrowPortable
2. keychainPrefetch.ts fires at very top of main.tsx (before ~65ms module evaluation)
3. Bun's __esm wrapper evaluates ENTIRE module when any symbol accessed
4. Heavy transitive import defeats prefetch (execa → human-signals → cross-spawn ~58ms sync init)
5. Imports below (envUtils, oauth constants, crypto, os) already evaluated by startupProfiler.ts at main.tsx:5
6. `CREDENTIALS_SERVICE_SUFFIX` - '-credentials' suffix for OAuth credentials keychain entry
7. DO NOT change - part of keychain lookup key, would orphan existing credentials
8. `getMacOsKeychainStorageServiceName` - gets service name with optional suffix
9. Uses hash of config dir path for unique but stable suffix
10. Only adds suffix for non-default directories (backwards compatibility)
11. `getUsername` - gets username from env or userInfo
12. Falls back to 'claude-code-user' on error
13. `KEYCHAIN_CACHE_TTL_MS` (30s) - cache TTL for keychain reads
14. Bounds staleness for cross-process scenarios without forcing blocking spawnSync on every read
15. Sync read() path takes ~500ms per security spawn
16. With 50+ claude.ai MCP connectors, short TTL expiry triggers repeat sync reads (5.5s event-loop stall observed)
17. 30s cross-process staleness fine: OAuth tokens expire in hours
18. `keychainCacheState` - { cache, generation, readInFlight }
19. cache: { data, cachedAt } (cachedAt 0 = invalid)
20. generation: incremented on every cache invalidation
21. readInFlight: deduplicates concurrent readAsync() calls
22. `primeKeychainCacheFromPrefetch` - primes cache from prefetch result

## Exports
- `CREDENTIALS_SERVICE_SUFFIX` - credentials service suffix constant
- `getMacOsKeychainStorageServiceName` - gets service name
- `getUsername` - gets username
- `KEYCHAIN_CACHE_TTL_MS` - cache TTL constant
- `keychainCacheState` - cache state object
- `primeKeychainCacheFromPrefetch` - primes cache from prefetch
