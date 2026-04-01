# utils/permissions/PermissionPromptToolResultSchema

## Purpose
Provides Zod schemas for permission prompt tool input/output validation.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: Tool, debug, lazySchema, permissions PermissionResult/PermissionUpdate/PermissionUpdateSchema

## Logic
1. `inputSchema` - { tool_name, input, tool_use_id }
2. tool_name: string - name of tool requesting permission
3. input: Record<string, unknown> - tool input
4. tool_use_id: string (optional) - unique tool use request ID
5. `Input` - inferred input type
6. `decisionClassificationField` - 'user_temporary' | 'user_permanent' | 'user_reject' (optional)
7. Catches malformed values as undefined (same as updatedPermissions)
8. `PermissionAllowResultSchema` - { behavior: 'allow', updatedInput, updatedPermissions, toolUseID, decisionClassification }
9. updatedPermissions: array with catch for malformed entries (logs warning, returns undefined)
10. `PermissionDenyResultSchema` - { behavior: 'deny', message, interrupt, toolUseID, decisionClassification }
11. `outputSchema` - union of AllowResultSchema and DenyResultSchema
12. `Output` - inferred output type
13. `permissionPromptToolResultToPermissionDecision` - converts output to PermissionDecision

## Exports
- `inputSchema` - input schema
- `Input` - input type
- `outputSchema` - output schema
- `Output` - output type
- `permissionPromptToolResultToPermissionDecision` - converts to PermissionDecision
