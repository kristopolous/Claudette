# utils/settings/settings

## Purpose
Provides settings loading and management utilities.

## Imports
- **Stdlib**: `path`
- **External**: BUILDFLAGS, `lodash-es/mergeWith`, `zod/v4`
- **Internal**: bootstrap state, remoteManagedSettings syncCacheState, array, debug, diagLogs, envUtils, errors, file, fileRead, fsOperations, git gitignore, json, log, platform, JSON utils, startupProfiler, settings constants/internalWrites/managedPath/mdm/settings/settingsCache/types/validation

## Logic
1. `getManagedSettingsFilePath` - gets managed settings file path (~/.claude/managedsettingson)
2. `loadManagedFileSettings` - loads file-based managed settings
3. managedsettingson merged first (lowest precedence/base)
4. Drop-in files sorted alphabetically and merged on top (higher precedence, later files win)
5. Matches systemd/sudoers drop-in convention
6. Separate teams can ship independent policy fragments (10otelon, 20securityon) without coordinating edits
7. `getSettingsForSource` - gets settings for specific source
8. `getSettings_DEPRECATED` - gets settings (deprecated, use getSettingsForSource)
9. `getInitialSettings` - gets initial settings
10. `getSettingsWithErrors` - gets settings with validation errors
11. `updateSettingsForSource` - updates settings for source
12. `saveSettingsForSource` - saves settings for source
13. `loadSettingsFromDisk` - loads settings from disk
14. `parseSettingsFile` - parses settings file
15. `mergeSettingsCascade` - merges settings cascade
16. `getEnabledSettingSources` - gets enabled setting sources
17. `getFlagSettingsInline`, `getFlagSettingsPath` - flag settings functions
18. `getOriginalCwd`, `getUseCoworkPlugins` - bootstrap state functions
19. `getRemoteManagedSettingsSyncFromCache` - gets remote managed settings from cache
20. `uniq` - unique array elements
21. `logForDebugging` - debug logging
22. `logForDiagnosticsNoPII` - diagnostics logging
23. `getClaudeConfigHomeDir`, `isEnvTruthy` - env utils
24. `getErrnoCode`, `isENOENT` - error functions
25. `writeFileSyncAndFlush_DEPRECATED` - writes file with flush
26. `readFileSync` - reads file synchronously
27. `getFsImplementation`, `safeResolvePath` - fs functions
28. `addFileGlobRuleToGitignore` - adds gitignore rule
29. `safeParseJSON` - safely parses JSON
30. `logError` - logs error
31. `getPlatform` - gets platform
32. `clone`, `jsonStringify` - JSON utilities
33. `profileCheckpoint` - startup profiler checkpoint
34. `EditableSettingSource`, `SettingSource`, `getEnabledSettingSources` - setting source types/functions
35. `markInternalWrite` - marks internal write
36. `getManagedFilePath`, `getManagedSettingsDropInDir` - managed path functions
37. `getHkcuSettings`, `getMdmSettings` - MDM settings functions
38. `getCachedParsedFile`, `getCachedSettingsForSource`, `getPluginSettingsBase`, `getSessionSettingsCache`, `resetSettingsCache`, `setCachedParsedFile`, `setCachedSettingsForSource`, `setSessionSettingsCache` - cache functions
39. `SettingsJson`, `SettingsSchema` - settings types
40. `filterInvalidPermissionRules`, `formatZodError`, `SettingsWithErrors`, `ValidationError` - validation types/functions

## Exports
- `getManagedSettingsFilePath` - gets managed settings file path
- `loadManagedFileSettings` - loads managed file settings
- `getSettingsForSource` - gets settings for source
- `getSettings_DEPRECATED` - gets settings (deprecated)
- `getInitialSettings` - gets initial settings
- `getSettingsWithErrors` - gets settings with errors
- `updateSettingsForSource` - updates settings for source
- `saveSettingsForSource` - saves settings for source
- `loadSettingsFromDisk` - loads settings from disk
- `parseSettingsFile` - parses settings file
- `mergeSettingsCascade` - merges settings cascade
- (Settings management functions)
