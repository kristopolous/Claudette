## Purpose
Shows a desktop notification after a period of user inactivity (default 6s), typically used to alert when background tasks complete while the terminal is not focused.

## Imports
- **Stdlib**: None
- **External**: REACT (`useEffect`)
- **Internal**:
  - `bootstrap/state` - `getLastInteractionTime`, `updateLastInteractionTime`
  - `ink/useTerminalNotification` - `useTerminalNotification`
  - `services/notifier` - `sendNotification`

## Logic
- On mount, immediately calls `updateLastInteractionTime(true)` to reset the idle timer, preventing immediate notifications after long-running operations.
- Starts an interval checking every `DEFAULT_INTERACTION_THRESHOLD_MS` (6s). When both:
  - `process.env.NODE_ENV !== 'test'`
  - No recent interaction (`!hasRecentInteraction(threshold)`)
  - No prior notification sent (`!hasNotified`)
- It clears the interval and calls `sendNotification` with the provided `message` and `notificationType`, using the terminal from `useTerminalNotification`.
- Cleanup cancels the interval on unmount.

## Exports
- `useNotifyAfterTimeout` - hook taking `(message: string, notificationType: string)`
- `DEFAULT_INTERACTION_THRESHOLD_MS` - constant 6000
