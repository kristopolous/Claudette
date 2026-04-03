# permissions

## Purpose
Provides pure permission type definitions extracted to break import cycles.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS, `@anthropic-ai/sdk` types
- **Internal**: (none - type definitions only)

## Logic
1. `EXTERNAL_PERMISSION_MODES` - user-addressable modes: acceptEdits, bypassPermissions, default, dontAsk, plan
2. `InternalPermissionMode` - adds auto, bubble for internal use
3. `INTERNAL_PERMISSION_MODES` - runtime validation set (includes auto if TRANSCRIPT_CLASSIFIER feature)
4. `PermissionBehavior` - enum: allow, deny, ask
5. `PermissionRuleSource` - where rule originated (userSettings, projectSettings, localSettings, flagSettings, policySettings, cliArg, command, session)
6. `PermissionRuleValue` - toolName with optional ruleContent
7. `PermissionRule` - combines source, behavior, and value
8. No runtime dependencies - pure type definitions for cycle breaking

## Exports
- `EXTERNAL_PERMISSION_MODES` - array of user-addressable modes
- `ExternalPermissionMode` - type for external modes
- `InternalPermissionMode`, `PermissionMode` - internal mode types
- `INTERNAL_PERMISSION_MODES`, `PERMISSION_MODES` - runtime validation arrays
- `PermissionBehavior` - behavior type
- `PermissionRuleSource`, `PermissionRuleValue`, `PermissionRule` - rule types
