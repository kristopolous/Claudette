# remoteManagedSettings/syncCacheState

## Purpose
Leaf state module for remote-managed-settings sync cache, isolated to break circular dependencies.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: envUtils, fileRead, jsonRead, settingsCache, settings types, JSON utils

## Logic
1. `SETTINGS_FILENAME` - remote-settings.json
2. `sessionCache` - in-memory session cache
3. `eligible` - tri-state: undefined (not determined), false (ineligible), true (proceed)
4. `setSessionCache` - sets session cache value
5. `resetSyncCache` - clears session cache and eligibility
6. `setEligibility` - sets eligibility boolean
7. `getSettingsPath` - returns path to remote settings file
8. `loadSettings` - sync IO loading settings from disk
9. Strips BOM, parses JSON, validates object type
10. `getRemoteManagedSettingsSyncFromCache` - gets settings from cache
11. Returns null if not eligible
12. Returns sessionCache if populated
13. Loads from disk if cache empty, updates sessionCache
14. Flushes settings cache when remote settings first become available

## Exports
- `setSessionCache` - sets session cache
- `resetSyncCache` - resets cache state
- `setEligibility` - sets eligibility flag
- `getSettingsPath` - gets settings file path
- `getRemoteManagedSettingsSyncFromCache` - gets settings from cache
