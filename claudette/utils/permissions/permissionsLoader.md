# utils/permissions/permissionsLoader

## Purpose
Provides permission rule loading from disk and settings management.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: fileRead, fsOperations, json, log, settings constants/settings, settings settings/types, permissions PermissionRule/permissionRuleParser

## Logic
1. `shouldAllowManagedPermissionRulesOnly` - checks if managed-only enabled
2. Returns true if policySettings.allowManagedPermissionRulesOnly === true
3. `shouldShowAlwaysAllowOptions` - checks if always-allow options should show
4. Returns !shouldAllowManagedPermissionRulesOnly
5. `SUPPORTED_RULE_BEHAVIORS` - ['allow', 'deny', 'ask']
6. `getSettingsForSourceLenient_FOR_EDITING_ONLY_NOT_FOR_READING` - lenient settings loader
7. Parses JSON without schema validation (for appending rules)
8. Avoids losing existing rules due to validation failures in unrelated fields
9. FOR EDITING ONLY - not for reading settings for execution
10. `loadPermissionRulesFromSource` - loads rules from source
11. `loadAllPermissionRulesFromDisk` - loads all rules from disk
12. `addPermissionRulesToSettings` - adds rules to settings
13. `deletePermissionRuleFromSettings` - deletes rule from settings
14. `PermissionRuleFromEditableSettings` - rule from settings type
15. Uses permissionRuleValueFromString/ToString for conversion
16. Uses safeResolvePath for path resolution
17. Uses readFileSync for file reading
18. Uses safeParseJSON for JSON parsing

## Exports
- `shouldAllowManagedPermissionRulesOnly` - checks managed-only flag
- `shouldShowAlwaysAllowOptions` - checks always-allow options
- `SUPPORTED_RULE_BEHAVIORS` - supported behaviors
- `getSettingsForSourceLenient_FOR_EDITING_ONLY_NOT_FOR_READING` - lenient loader
- `loadPermissionRulesFromSource` - loads rules from source
- `loadAllPermissionRulesFromDisk` - loads all rules
- `addPermissionRulesToSettings` - adds rules
- `deletePermissionRuleFromSettings` - deletes rule
- `PermissionRuleFromEditableSettings` - rule type
