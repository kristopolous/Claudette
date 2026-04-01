# utils/permissions/PermissionUpdateSchema

## Purpose
Provides Zod schemas for permission updates.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: types permissions, lazySchema, PermissionMode, PermissionRule

## Logic
1. Re-exports: PermissionUpdate, PermissionUpdateDestination
2. `permissionUpdateDestinationSchema` - enum: userSettings, projectSettings, localSettings, session, cliArg
3. userSettings = global user settings
4. projectSettings = shared per-directory
5. localSettings = gitignored local settings
6. session = in-memory for current session only
7. cliArg = from command line arguments
8. `permissionUpdateSchema` - discriminated union by type:
   - 'addRules': { rules, behavior, destination }
   - 'replaceRules': { rules, behavior, destination }
   - 'removeRules': { rules, behavior, destination }
   - 'setMode': { mode, destination }
   - 'addDirectories': { directories, destination }
   - 'removeDirectories': { directories, destination }
9. Uses permissionRuleValueSchema for rules
10. Uses permissionBehaviorSchema for behavior
11. Uses externalPermissionModeSchema for mode

## Exports
- `PermissionUpdate` - update type
- `PermissionUpdateDestination` - destination type
- `permissionUpdateDestinationSchema` - destination schema
- `permissionUpdateSchema` - update schema
