# utils/authPortable

## Purpose
Portable auth utilities for API key management.

## Imports
- **Stdlib**: (none)
- **External**: `execa`
- **Internal**: secureStorage macOsKeychainHelpers

## Logic
1. `maybeRemoveApiKeyFromMacOSKeychainThrows` - removes API key from macOS keychain
2. Only runs on darwin (macOS) platform
3. Uses security delete-generic-password command
4. Uses $USER and storage service name
5. Throws error on non-zero exit code
6. `normalizeApiKeyForConfig` - normalizes API key for config storage
7. Returns last 20 characters of API key
8. Prevents storing full API key in config files

## Exports
- `maybeRemoveApiKeyFromMacOSKeychainThrows` - removes API key from keychain
- `normalizeApiKeyForConfig` - normalizes API key for config
