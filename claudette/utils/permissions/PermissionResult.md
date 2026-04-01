# utils/permissions/PermissionResult

## Purpose
Provides permission result type re-exports and helper functions.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: types permissions

## Logic
1. Re-exports: PermissionAllowDecision, PermissionAskDecision, PermissionDecision, PermissionDecisionReason, PermissionDenyDecision, PermissionMetadata, PermissionResult
2. `getRuleBehaviorDescription` - gets prose description for rule behavior
3. 'allow' → 'allowed'
4. 'deny' → 'denied'
5. default (ask) → 'asked for confirmation for'
6. Used for user-facing messages about permission decisions

## Exports
- `PermissionAllowDecision` - allow decision type
- `PermissionAskDecision` - ask decision type
- `PermissionDecision` - decision type
- `PermissionDecisionReason` - decision reason type
- `PermissionDenyDecision` - deny decision type
- `PermissionMetadata` - metadata type
- `PermissionResult` - result type
- `getRuleBehaviorDescription` - gets behavior description
