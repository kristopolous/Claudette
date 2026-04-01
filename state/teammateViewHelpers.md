# teammateViewHelpers

## Purpose
Provides helper functions for entering/exiting teammate (agent) view mode in the UI.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: analytics, Task types, LocalAgentTask types, AppState types

## Logic
1. `PANEL_GRACE_MS` (30s) - grace period before terminal task eviction
2. `isLocalAgent` - inline type check to avoid circular dependency
3. `release` - returns task to stub form: retain=false, messages cleared, evictAfter set if terminal
4. `enterTeammateView` - transitions UI to view teammate's transcript
   - Sets viewingAgentTaskId and retain=true (blocks eviction, enables stream-append)
   - Clears evictAfter for disk bootstrap
   - Releases previous agent if switching
5. `exitTeammateView` - exits teammate view mode
   - Releases current task back to stub form
   - Clears viewingAgentTaskId and viewSelectionMode

## Exports
- `enterTeammateView` - function to enter teammate view mode
- `exitTeammateView` - function to exit teammate view mode
