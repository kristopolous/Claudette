# state/onChangeAppState

## Purpose
Handles state change notifications for session metadata sync and mode changes.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state, auth, config, errors, log, managedEnv, permissions, sessionState, settings, AppState types

## Logic
1. `externalMetadataToAppState` - inverse of push, restores state on worker restart
2. Restores permission_mode and is_ultraplan_mode from external metadata
3. `onChangeAppState` - main handler for state changes
4. toolPermissionContext.mode changes notify CCR/SDK via single choke point
5. Prior to this: only 2 of 8+ mutation paths notified CCR
6. Now: ANY setAppState mode change notifies CCR and SDK
7. Externalizes mode names (bubble/auto → default for external)
8. Skips CCR notify if EXTERNAL mode unchanged (default→bubble→default is noise)
9. SDK channel passes raw mode with its own filter
10. Ultraplan flag: null per RFC 7396 removes key
11. Clears auth caches on relevant changes
12. Applies config environment variables
13. Updates settings for source
14. Notifies permission mode and session metadata changes

## Exports
- `externalMetadataToAppState` - restores state from external metadata
- `onChangeAppState` - handles state change notifications
