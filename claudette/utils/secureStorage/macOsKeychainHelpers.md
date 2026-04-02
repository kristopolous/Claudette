# utils/secureStorage/macOsKeychainHelpers

## Purpose
Lightweight helpers for macOS keychain operations shared between keychainPrefetch.ts and macOsKeychainStorage.ts. Must not import heavy dependencies (execa, etc.) to avoid defeating keychain prefetch optimization.

## Imports
- **Stdlib**: `crypto` (createHash), `os` (userInfo)
- **External**: (none)
- **Internal**: `src/constants/oauth` (getOauthConfig), `../envUtils` (getClaudeConfigHomeDir), `./types` (SecureStorageData)

## Logic
1. MUST NOT import execa, execFileNoThrow, or execFileNoThrowPortable - keychainPrefetch fires at very top of main before ~65ms module evaluation, and Bun's __esm wrapper evaluates ENTIRE module when any symbol accessed
2. `CREDENTIALS_SERVICE_SUFFIX` ('-credentials') - suffix for OAuth credentials keychain entry; DO NOT change - part of keychain lookup key, would orphan existing credentials
3. `getMacOsKeychainStorageServiceName(serviceSuffix?)` - builds service name with optional suffix; adds hash of config dir path for non-default directories (backwards compatibility); format: `Claude Code${OAUTH_FILE_SUFFIX}${serviceSuffix}${dirHash}`
4. `getUsername()` - returns USER env var or userInfo().username; falls back to 'claude-code-user' on error
5. `KEYCHAIN_CACHE_TTL_MS` (30000) - cache TTL for keychain reads; balances cross-process staleness with avoiding repeated ~500ms security spawns; 30s is fine since OAuth tokens expire in hours
6. `keychainCacheState` - shared cache object with three fields:
   - `cache`: { data: SecureStorageData | null, cachedAt: number } (cachedAt 0 = invalid)
   - `generation`: incremented on every invalidation; readAsync() skips cache write if newer generation exists
   - `readInFlight`: deduplicates concurrent readAsync() calls
7. `clearKeychainCache()` - resets cache, increments generation, clears readInFlight
8. `primeKeychainCacheFromPrefetch(stdout)` - primes cache from prefetch result; only writes if cache hasn't been touched (cachedAt === 0); parses JSON from stdout; discards if sync read() or update() already ran

## Exports
- `CREDENTIALS_SERVICE_SUFFIX` - credentials service suffix constant ('-credentials')
- `getMacOsKeychainStorageServiceName(serviceSuffix?: string)` - builds keychain service name
- `getUsername()` - returns username from env or userInfo
- `KEYCHAIN_CACHE_TTL_MS` - cache TTL constant (30000ms)
- `keychainCacheState` - shared cache state object (cache, generation, readInFlight)
- `clearKeychainCache()` - invalidates all cache state
- `primeKeychainCacheFromPrefetch(stdout: string | null)` - primes cache from prefetch result
