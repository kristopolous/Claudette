# remoteManagedSettings/types

## Purpose
Provides Zod schemas and types for remotely managed settings response.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: lazySchema, settings types

## Logic
1. `RemoteManagedSettingsResponseSchema` - permissive schema using z.record
2. Avoids circular dependency with SettingsSchema
3. Full validation performed in index.ts using SettingsSchema.safeParse
4. Fields: uuid (settings UUID), checksum, settings (SettingsJson)
5. `RemoteManagedSettingsResponse` - inferred response type
6. `RemoteManagedSettingsFetchResult` - fetch result type
7. success, settings (null = 304 Not Modified), checksum, error, skipRetry
8. skipRetry prevents retry on auth errors and similar

## Exports
- `RemoteManagedSettingsResponseSchema` - response schema
- `RemoteManagedSettingsResponse` - response type
- `RemoteManagedSettingsFetchResult` - fetch result type
