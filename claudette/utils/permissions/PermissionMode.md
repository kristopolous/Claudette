# utils/permissions/PermissionMode

## Purpose
Provides permission mode configuration and schema definitions.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`, `zod/v4`
- **Internal**: constants figures, types permissions, lazySchema

## Logic
1. Re-exports: EXTERNAL_PERMISSION_MODES, PERMISSION_MODES, ExternalPermissionMode, PermissionMode
2. `permissionModeSchema` - Zod enum schema for PERMISSION_MODES
3. `externalPermissionModeSchema` - Zod enum schema for EXTERNAL_PERMISSION_MODES
4. `ModeColorKey` - 'text' | 'planMode' | 'permission' | 'autoAccept' | 'error' | 'warning'
5. `PermissionModeConfig` - { title, shortTitle, symbol, color, external }
6. `PERMISSION_MODE_CONFIG` - config for each mode:
   - default: 'Default', no symbol, text color
   - plan: 'Plan Mode', pause icon, planMode color
   - acceptEdits: 'Accept edits', ⏵⏵ symbol, autoAccept color
   - bypassPermissions: 'Bypass Permissions', ⏵⏵ symbol, error color
   - dontAsk: "Don't Ask", ⏵⏵ symbol, error color
   - auto, bubble: TRANSCRIPT_CLASSIFIER feature-gated
7. `getPermissionModeConfig` - gets config for mode
8. `getPermissionModeTitle` - gets title for mode
9. `getPermissionModeSymbol` - gets symbol for mode
10. `getPermissionModeColor` - gets color for mode

## Exports
- `EXTERNAL_PERMISSION_MODES` - external modes array
- `PERMISSION_MODES` - permission modes array
- `ExternalPermissionMode` - external mode type
- `PermissionMode` - permission mode type
- `permissionModeSchema` - permission mode schema
- `externalPermissionModeSchema` - external mode schema
- `PERMISSION_MODE_CONFIG` - mode config object
- `getPermissionModeConfig` - gets mode config
- `getPermissionModeTitle` - gets mode title
- `getPermissionModeSymbol` - gets mode symbol
- `getPermissionModeColor` - gets mode color
