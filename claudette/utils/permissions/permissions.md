# utils/permissions/permissions

## Purpose
Provides core permission checking and rule management utilities.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`, `@anthropic-ai/sdk`
- **Internal**: hooks, MCP mcpStringUtils, Tool, AgentTool constants, BashTool shouldUseSandbox/toolName, PowerShellTool, REPLTool, message types, bash commands, debug, errors, log, sandbox, settings constants, stringUtils, PermissionMode, PermissionResult, PermissionRule, PermissionUpdate, PermissionUpdateSchema, permissionRuleParser, permissionsLoader, classifierDecision, autoModeState, bootstrap state, growthbook, analytics, classifierApprovals, permissions filesystem/PermissionRuleParser

## Logic
1. `getToolNameForPermissionCheck` - gets tool name for permission check
2. `mcpInfoFromString` - extracts MCP info from tool name
3. `shouldUseSandbox` - checks if sandbox should be used
4. `checkPermissions` - checks permissions for tool use
5. Handles allow/deny/ask behaviors
6. Uses classifierDecision for TRANSCRIPT_CLASSIFIER feature
7. Uses autoModeState for auto mode state
8. `addToTurnClassifierDuration` - adds to classifier duration
9. `getTotalCacheCreationInputTokens` - gets cache creation tokens
10. `getTotalCacheReadInputTokens` - gets cache read tokens
11. `getTotalInputTokens` - gets total input tokens
12. `getTotalOutputTokens` - gets total output tokens
13. `getFeatureValue_CACHED_WITH_REFRESH` - gets feature value with refresh
14. `sanitizeToolNameForAnalytics` - sanitizes tool name
15. `clearClassifierChecking` - clears classifier checking
16. `setClassifierChecking` - sets classifier checking
17. `setClassifierApproval` - sets classifier approval
18. `setYoloClassifierApproval` - sets yolo classifier approval
19. `deleteClassifierApproval` - deletes classifier approval
20. `getClassifierApproval` - gets classifier approval
21. `getYoloClassifierApproval` - gets yolo classifier approval
22. `isClassifierChecking` - checks if classifier checking
23. `subscribeClassifierChecking` - subscribes to classifier checking
24. `permissionModeTitle` - gets permission mode title
25. `getSettingSourceDisplayNameLowercase` - gets source display name
26. `SETTING_SOURCES` - setting sources array
27. `plural` - pluralizes string
28. `permissionRuleValueFromString` - parses rule from string
29. `permissionRuleValueToString` - converts rule to string
30. `addPermissionRulesToSettings` - adds rules to settings
31. `deletePermissionRuleFromSettings` - deletes rule from settings
32. `PermissionRuleFromEditableSettings` - rule from settings type
33. `shouldAllowManagedPermissionRulesOnly` - checks managed-only flag

## Exports
- `getToolNameForPermissionCheck` - gets tool name
- `mcpInfoFromString` - extracts MCP info
- `shouldUseSandbox` - checks sandbox use
- `checkPermissions` - checks permissions
- `permissionModeTitle` - gets mode title
- `getSettingSourceDisplayNameLowercase` - gets source name
- `SETTING_SOURCES` - setting sources
- `plural` - pluralizes string
- `permissionRuleValueFromString` - parses rule
- `permissionRuleValueToString` - converts rule
- `addPermissionRulesToSettings` - adds rules
- `deletePermissionRuleFromSettings` - deletes rule
- `PermissionRuleFromEditableSettings` - rule type
- `shouldAllowManagedPermissionRulesOnly` - checks managed-only
- (Classifier functions)
