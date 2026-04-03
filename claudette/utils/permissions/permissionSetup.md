# utils/permissions/permissionSetup

## Purpose
Provides permission mode setup and transition utilities.

## Imports
- **Stdlib**: `path`
- **External**: BUILDFLAGS
- **Internal**: bootstrap state, Tool, cwd, envUtils, settings constants/settings, PermissionMode, permissions, permissionsLoader, autoModeState, growthbook, commands add-dir validation, analytics, AgentTool, BashTool, PowerShellTool, tools, fsOperations, betas, debug, gracefulShutdown, model model, permissions dangerousPatterns/PermissionRule/PermissionUpdate/PermissionUpdateSchema/permissionRuleParser

## Logic
1. `getOriginalCwd`, `handleAutoModeTransition`, `handlePlanModeTransition` - bootstrap state functions
2. `setHasExitedPlanMode`, `setNeedsAutoModeExitAttachment` - state setters
3. `ToolPermissionContext`, `ToolPermissionRulesBySource` - permission context types
4. `getCwd` - gets current working directory
5. `isEnvTruthy` - checks env var truthy
6. `SettingSource`, `SETTING_SOURCES` - setting source types
7. `getSettings_DEPRECATED`, `getSettingsFilePathForSource`, `getUseAutoModeDuringPlan`, `hasAutoModeOptIn` - settings functions
8. `permissionModeFromString` - converts string to PermissionMode
9. `applyPermissionRulesToPermissionContext` - applies rules to context
10. `loadAllPermissionRulesFromDisk` - loads rules from disk
11. `autoModeStateModule` - auto mode state module (TRANSCRIPT_CLASSIFIER feature-gated)
12. `checkSecurityRestrictionGate` - checks security restriction gate
13. `checkStatsigFeatureGate_CACHED_MAY_BE_STALE` - checks Statsig gate
14. `getDynamicConfig_BLOCKS_ON_INIT` - gets dynamic config
15. `getFeatureValue_CACHED_MAY_BE_STALE` - gets feature value
16. `addDirHelpMessage`, `validateDirectoryForWorkspace` - add-dir validation
17. `AGENT_TOOL_NAME`, `BASH_TOOL_NAME`, `POWERSHELL_TOOL_NAME` - tool name constants
18. `getToolsForDefaultPreset`, `parseToolPreset` - tool preset functions
19. `getFsImplementation`, `safeResolvePath` - filesystem functions
20. `modelSupportsAutoMode` - checks model auto mode support
21. `logForDebugging` - debug logging
22. `gracefulShutdown` - graceful shutdown
23. `getMainLoopModel` - gets main loop model
24. `CROSS_PLATFORM_CODE_EXEC`, `DANGEROUS_BASH_PATTERNS` - dangerous patterns
25. `PermissionRule`, `PermissionRuleSource`, `PermissionRuleValue` - rule types
26. `AdditionalWorkingDirectory`, `applyPermissionUpdate` - update types/functions
27. `PermissionUpdateDestination` - destination type
28. `normalizeLegacyToolName`, `permissionRuleValueFromString` - parser functions

## Exports
- (Permission setup functions)
