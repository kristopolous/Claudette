# settingsSync/types

## Purpose
Provides Zod schemas and types for the user settings sync API.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: lazySchema utils

## Logic
1. `UserSyncContentSchema` - flat key-value storage with entries record
2. Keys are opaque strings (typically file paths)
3. Values are UTF-8 string content (JSON, Markdown, etc.)
4. `UserSyncDataSchema` - full response with userId, version, lastModified, checksum, content
5. `lastModified` - ISO 8601 timestamp
6. `checksum` - MD5 hash for change detection
7. `SettingsSyncFetchResult` - fetch result with success, data, isEmpty (404), error, skipRetry
8. `SettingsSyncUploadResult` - upload result with success, checksum, lastModified, error
9. `SYNC_KEYS` - constants for user settings/memory and project settings/memory paths

## Exports
- `UserSyncContentSchema` - content schema for sync entries
- `UserSyncDataSchema` - full user sync data schema
- `UserSyncData` - inferred sync data type
- `SettingsSyncFetchResult` - fetch result type
- `SettingsSyncUploadResult` - upload result type
- `SYNC_KEYS` - sync key constants
