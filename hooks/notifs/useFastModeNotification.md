## Purpose
Shows notifications for Fast Mode status: org availability changes, cooldown start/expiry, and overage rejection.

## Imports
- **External**: `react` (useEffect)
- **Internal**:
  - `src/context/notifications.js` (useNotifications)
  - `src/state/AppState.js` (useAppState, useSetAppState)
  - `src/utils/fastMode.js` (isFastModeEnabled, onCooldownExpired, onCooldownTriggered, onFastModeOverageRejection, onOrgFastModeChanged, CooldownReason)
  - `src/utils/format.js` (formatDuration)
  - `../../bootstrap/state.js` (getIsRemoteMode)

## Logic
Hook sets up four notification channels (all gated by `!getIsRemoteMode()` and `isFastModeEnabled()`):
1. **Org fast mode change** (`onOrgFastModeChanged`):
   - Enabled → immediate prompt to run `/fast`
   - Disabled while active → set appState.fastMode=false and warning
2. **Overage rejection** (`onFastModeOverageRejection`): shows warning message and disables fast mode
3. **Cooldown triggered** (`onCooldownTriggered`): shows warning with reset-in duration; message varies by `reason` ('overloaded' | 'rate_limit')
4. **Cooldown expired** (`onCooldownExpired`): shows "Fast limit reset · now using fast mode"
   - Cooldown start/expire notifications invalidate each other via `key` and `invalidates`

## Exports
- `useFastModeNotification` - Hook with no parameters
