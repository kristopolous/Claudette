# utils/plugins/pluginIdentifier

## Purpose
Provides plugin identifier parsing and building utilities.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: settings constants, plugins schemas

## Logic
1. `ExtendedPluginScope` - PluginScope | 'flag' (session-only)
2. `PersistablePluginScope` - excludes 'flag' (persisted to installed_plugins.json)
3. `SETTING_SOURCE_TO_SCOPE` - maps SettingSource to ExtendedPluginScope
4. policySettings → 'managed', userSettings → 'user', projectSettings → 'project'
5. localSettings → 'local', flagSettings → 'flag'
6. `ParsedPluginIdentifier` - { name, marketplace? }
7. `parsePluginIdentifier` - parses plugin identifier string
8. Handles name or name@marketplace format
9. Only first '@' used as separator (marketplace names shouldn't contain '@')
10. `buildPluginId` - builds plugin ID from name and marketplace
11. Returns "name" or "name@marketplace" format
12. `isOfficialMarketplaceName` - checks if marketplace is official (Anthropic-controlled)
13. Used for telemetry redaction - official identifiers safe to log to general-access metadata
14. Third-party identifiers go only to PII-tagged _PROTO_* BQ columns
15. `settingSourceToScope` - converts setting source to scope
16. `scopeToSettingSource` - converts scope to setting source
17. `ALLOWED_OFFICIAL_MARKETPLACE_NAMES` - set of allowed official marketplace names

## Exports
- `ExtendedPluginScope` - extended scope type
- `PersistablePluginScope` - persistable scope type
- `SETTING_SOURCE_TO_SCOPE` - source to scope mapping
- `ParsedPluginIdentifier` - parsed identifier type
- `parsePluginIdentifier` - parses identifier
- `buildPluginId` - builds plugin ID
- `isOfficialMarketplaceName` - checks official marketplace
- `settingSourceToScope` - converts source to scope
- `scopeToSettingSource` - converts scope to source
