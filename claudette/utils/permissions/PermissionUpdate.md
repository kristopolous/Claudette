# utils/permissions/PermissionUpdate

## Purpose
Provides permission update application and rule extraction utilities.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: Tool, types permissions, debug, settings constants/settings, JSON utils, filesystem, PermissionRule, PermissionUpdateSchema, permissionRuleParser, permissionsLoader

## Logic
1. Re-exports: AdditionalWorkingDirectory, WorkingDirectorySource
2. `extractRules` - extracts PermissionRuleValue[] from updates
3. Handles 'addRules' type updates
4. `hasRules` - checks if updates have rules
5. `applyPermissionUpdate` - applies single update to context
6. 'setMode': updates mode in context
7. 'addRules': adds rules to alwaysAllowRules/alwaysDenyRules/askRules
8. 'replaceRules': replaces rules in destination
9. 'removeRules': removes rules from destination
10. 'addDirectories': adds directories to additionalWorkingDirectories
11. 'removeDirectories': removes directories from additionalWorkingDirectories
12. `applyPermissionUpdates` - applies multiple updates
13. `persistPermissionUpdates` - persists updates to settings
14. Uses permissionRuleValueToString for string conversion
15. Uses addPermissionRulesToSettings for adding rules

## Exports
- `AdditionalWorkingDirectory` - working directory type
- `WorkingDirectorySource` - working directory source type
- `extractRules` - extracts rules from updates
- `hasRules` - checks if updates have rules
- `applyPermissionUpdate` - applies single update
- `applyPermissionUpdates` - applies multiple updates
- `persistPermissionUpdates` - persists updates
