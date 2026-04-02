# utils/secureStorage/keychainPrefetch

## Purpose
Fires macOS keychain reads in parallel with main module evaluation to avoid ~65ms sequential keychain lookup cost during startup.

## Imports
- **Stdlib**: `child_process` (execFile)
- **External**: (none)
- **Internal**: `../envUtils` (isBareMode), `./macOsKeychainHelpers` (CREDENTIALS_SERVICE_SUFFIX, getMacOsKeychainStorageServiceName, getUsername, primeKeychainCacheFromPrefetch)

## Logic
1. Avoids importing macOsKeychainStorage.ts which pulls in execa → human-signals → cross-spawn (~58ms sync module init)
2. `startKeychainPrefetch()` - fires both keychain reads in parallel via spawnSecurity(); called at main top-level immediately after startMdmRawRead(); no-op on non-darwin or in bare mode
3. `spawnSecurity(serviceName)` - spawns `security find-generic-password` via execFile with 10s timeout; exit 44 (entry not found) = valid "no key", safe to prime as null; timeout = don't prime, let sync path retry
4. `ensureKeychainPrefetchCompleted()` - awaits prefetch Promise.all; called in main preAction alongside ensureMdmSettingsLoaded()
5. `getLegacyApiKeyPrefetchResult()` - returns { stdout: string | null } | null; consumed by auth.ts before falling through to sync execSync; null means prefetch not started/completed
6. `clearLegacyApiKeyPrefetch()` - clears prefetch result; called alongside cache invalidation to prevent stale prefetch from shadowing fresh write
7. `legacyApiKeyPrefetch` - module-level cache shared with auth.ts getApiKeyFromConfigOrMacOSKeychain(); distinguishes "not started" (null) from "completed with no key" ({ stdout: null })
8. `prefetchPromise` - shared promise for both keychain reads
9. `KEYCHAIN_PREFETCH_TIMEOUT_MS` (10000) - timeout for security subprocess

## Exports
- `KEYCHAIN_PREFETCH_TIMEOUT_MS` - prefetch timeout constant (10000ms)
- `startKeychainPrefetch()` - fires both keychain reads in parallel
- `ensureKeychainPrefetchCompleted()` - awaits prefetch completion
- `getLegacyApiKeyPrefetchResult()` - returns cached legacy API key result or null
- `clearLegacyApiKeyPrefetch()` - clears legacy API key prefetch cache
