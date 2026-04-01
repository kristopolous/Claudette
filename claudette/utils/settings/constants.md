# utils/settings/constants

## Purpose
Provides setting source constants and display name utilities.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state

## Logic
1. `SETTING_SOURCES` - array of all possible setting sources in priority order
2. Order: userSettings, projectSettings, localSettings, flagSettings, policySettings
3. Later sources override earlier ones
4. `SettingSource` - type derived from SETTING_SOURCES
5. `getSettingSourceName` - gets short name for setting source
6. userSettings → 'user', projectSettings → 'project', localSettings → 'project, gitignored'
7. flagSettings → 'cli flag', policySettings → 'managed'
8. `getSourceDisplayName` - gets short display name (capitalized, for context/skills UI)
9. userSettings → 'User', projectSettings → 'Project', localSettings → 'Local'
10. flagSettings → 'Flag', policySettings → 'Managed'
11. Also handles 'plugin' → 'Plugin', 'built-in' → 'Built-in'
12. `getSettingSourceDisplayNameLowercase` - gets display name (lowercase, for inline use)
13. userSettings → 'user settings', projectSettings → 'shared project settings'
14. localSettings → 'local project settings', flagSettings → 'CLI flag settings'
15. policySettings → 'managed settings'
16. Also handles 'cliArg', 'command', 'session' sources
17. `getAllowedSettingSources` - gets allowed setting sources
18. `isSettingSourceEnabled` - checks if setting source enabled
19. `SETTING_SOURCE_TO_SCOPE` - maps setting source to plugin scope
20. `scopeToSettingSource` - maps plugin scope to setting source

## Exports
- `SETTING_SOURCES` - setting sources array
- `SettingSource` - setting source type
- `getSettingSourceName` - gets source name
- `getSourceDisplayName` - gets display name
- `getSettingSourceDisplayNameLowercase` - gets lowercase display name
- `getAllowedSettingSources` - gets allowed sources
- `isSettingSourceEnabled` - checks if source enabled
- `SETTING_SOURCE_TO_SCOPE` - source to scope mapping
- `scopeToSettingSource` - scope to source mapping
