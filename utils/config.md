# utils/config

## Purpose
Manages global and project configuration with file watching and migration support.

## Imports
- **Stdlib**: `crypto`, `fs`, `path`
- **External**: `bun:bundle`, `lodash-es/memoize/pickBy`
- **Internal**: bootstrap state, memdir paths, analytics, oauth types, cwd, cleanupRegistry, debug, diagLogs, env, envUtils, errors, file, fsOperations, git, json, jsonRead, lockfile, log, memory types, path, privacyLevel, settings managedPath, theme, teamMemPaths, bridge bridgeEnabled, imageResizer, model modelOptions, JSON utils

## Logic
1. `insideGetConfig` - re-entrancy guard for getConfig → logEvent recursion
2. `PastedContent` - { id, type, content, mediaType, filename, dimensions, sourcePath }
3. `HistoryEntry` - { display, pastedContents }
4. `SerializedStructuredHistoryEntry` - serialized history entry
5. `ReleaseChannel` - stable, latest
6. `ProjectConfig` - allowedTools, mcpContextUris, mcpServers, lastAPIDuration
7. `getGlobalClaudeFile` - gets global config file path
8. Legacy fallback to .config.json
9. Uses fileSuffixForOauthConfig for oauth config suffix
10. `getGlobalConfig` - gets global config with memoization
11. `saveGlobalConfig` - saves global config with file watching
12. `getCurrentProjectConfig` - gets project-specific config
13. `saveCurrentProjectConfig` - saves project config
14. `getManagedClaudeRulesDir` - gets managed rules directory
15. `getUserClaudeRulesDir` - gets user rules directory
16. `getClaudeRulesDirs` - gets all rules directories
17. `getAutoMemEntrypoint` - gets auto memory entrypoint
18. `getMemoryPath` - gets memory file path
19. `getTeamsDir` - gets teams directory
20. `getSettingsFilePathForSource` - gets settings file path by source
21. `getManagedFilePath` - gets managed settings file path
22. File watching with unwatchFile/watchFile
23. Config migration support

## Exports
- `PastedContent` - pasted content type
- `HistoryEntry` - history entry type
- `ReleaseChannel` - release channel type
- `ProjectConfig` - project config type
- `getGlobalClaudeFile` - gets global config file
- `getGlobalConfig` - gets global config
- `saveGlobalConfig` - saves global config
- `getCurrentProjectConfig` - gets project config
- `saveCurrentProjectConfig` - saves project config
- (Config management functions)
