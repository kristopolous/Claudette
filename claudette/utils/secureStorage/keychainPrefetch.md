# utils/secureStorage/keychainPrefetch

## Purpose
Fires macOS keychain reads in parallel with main.tsx module evaluation.

## Imports
- **Stdlib**: `child_process`
- **External**: (none)
- **Internal**: envUtils, secureStorage macOsKeychainHelpers

## Logic
1. `isRemoteManagedSettingsEligible` reads two keychain entries SEQUENTIALLY via sync execSync:
   - "Claudette-credentials" (OAuth tokens) ~32ms
   - "Claudette" (legacy API key) ~33ms
   - Sequential cost: ~65ms on every macOS startup
2. Firing both here lets subprocesses run in parallel with ~65ms of main.tsx imports
3. `ensureKeychainPrefetchCompleted` awaited alongside `ensureMdmSettingsLoaded` in main.tsx preAction
4. Nearly free since subprocesses finish during import evaluation
5. Sync read() and getApiKeyFromConfigOrMacOSKeychain() then hit their caches
6. Imports stay minimal: child_process + macOsKeychainHelpers.ts (NOT macOsKeychainStorage.ts)
7. macOsKeychainStorage.ts pulls in execa → human-signals → cross-spawn (~58ms sync module init)
8. Helpers file's import chain already evaluated by startupProfiler.ts at main.tsx:5
9. `KEYCHAIN_PREFETCH_TIMEOUT_MS` (10s) - prefetch timeout
10. `legacyApiKeyPrefetch` - shared with auth.ts getApiKeyFromConfigOrMacOSKeychain()
11. Distinguishes "not started" (null) from "completed with no key" ({ stdout: null })
12. Sync reader only trusts completed prefetch
13. `prefetchPromise` - prefetch promise
14. `SpawnResult` - { stdout, timedOut }
15. `spawnSecurity` - spawns security find-generic-password command
16. Exit 44 (entry not found) = valid "no key", safe to prime as null
17. Timeout (err.killed) = keychain MAY have key we couldn't fetch, don't prime
18. `startKeychainPrefetch` - fires both keychain reads in parallel
19. Called at main.tsx top-level immediately after startMdmRawRead()
20. Non-darwin is no-op, bare mode is no-op
21. `ensureKeychainPrefetchCompleted` - ensures prefetch completed
22. `getLegacyApiKeyPrefetchResult` - gets legacy API key prefetch result
23. `clearLegacyApiKeyPrefetch` - clears legacy API key prefetch

## Exports
- `KEYCHAIN_PREFETCH_TIMEOUT_MS` - prefetch timeout constant
- `startKeychainPrefetch` - starts keychain prefetch
- `ensureKeychainPrefetchCompleted` - ensures prefetch completed
- `getLegacyApiKeyPrefetchResult` - gets legacy API key prefetch result
- `clearLegacyApiKeyPrefetch` - clears legacy API key prefetch
