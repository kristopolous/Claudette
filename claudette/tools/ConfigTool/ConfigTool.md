## Purpose
Tool for getting and setting Claude Code configuration settings (theme, model, permissions, etc.).

## Imports
- **External**: `zod/v4`
- **Internal**: 
  - Analytics: `logEvent`, `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS`
  - Tool: `buildTool`, `ToolDef`
  - Config utilities: `getGlobalConfig`, `getRemoteControlAtStartup`, `saveGlobalConfig`
  - Utils: `errorMessage`, `lazySchema`, `logError`
  - Settings: `getInitialSettings`, `updateSettingsForSource`
  - Slow operations: `jsonStringify`
  - Local: `CONFIG_TOOL_NAME`, `DESCRIPTION`, `generatePrompt`, `getConfig`, `getOptionsForSetting`, `getPath`, `isSupported`
  - UI: `renderToolResultMessage`, `renderToolUseMessage`, `renderToolUseRejectedMessage`

## Logic
1. Validates setting is supported
2. For GET (no value): retrieves and formats current value
3. For SET: validates type, options, and runs async validation if configured
4. Handles special "default" value for remoteControlAtStartup (unsets to use platform default)
5. Coerces string booleans to actual boolean type
6. Saves to global config or user settings depending on setting source
7. For voice settings, performs extensive pre-flight checks (auth, dependencies, permissions)
8. Syncs relevant settings to AppState for immediate UI effect
9. Logs analytics event on successful change
10. Returns formatted result or error

## Exports
- `ConfigTool` - Main tool definition
- `Input` - Type for input (setting, optional value)
- `Output` - Type for output (success, operation, setting, value/previousValue/newValue, error)
- Helper: `getValue` ( retrieves value from global or settings source)
- Helper: `buildNestedObject` (builds nested object from path array)
