# utils/permissions/PermissionRule

## Purpose
Provides permission rule schema definitions and types.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: types permissions, lazySchema

## Logic
1. Re-exports: PermissionBehavior, PermissionRule, PermissionRuleSource, PermissionRuleValue
2. `permissionBehaviorSchema` - Zod enum: 'allow' | 'deny' | 'ask'
3. 'allow' = rule allows tool to run
4. 'deny' = rule denies tool from running
5. 'ask' = rule forces prompt to user
6. `permissionRuleValueSchema` - { toolName, ruleContent (optional) }
7. toolName: string - name of tool rule applies to
8. ruleContent: string (optional) - custom content for rule
9. Each tool may implement custom handling in checkPermissions()

## Exports
- `PermissionBehavior` - behavior type
- `PermissionRule` - rule type
- `PermissionRuleSource` - rule source type
- `PermissionRuleValue` - rule value type
- `permissionBehaviorSchema` - behavior schema
- `permissionRuleValueSchema` - rule value schema
