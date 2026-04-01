# utils/collapseBackgroundBashNotifications

## Purpose
Collapses consecutive completed background bash task notifications into single notification.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: xml constants, LocalShellTask, message types, fullscreen, messages

## Logic
1. `isCompletedBackgroundBash` - type guard for completed background bash
2. Checks msg.type === 'user', content type === 'text'
3. Checks for TASK_NOTIFICATION_TAG
4. Only collapses successful completions (status === 'completed')
5. Checks SUMMARY_TAG starts with BACKGROUND_BASH_SUMMARY_PREFIX
6. Distinguishes bash-kind from agent/workflow/monitor notifications
7. Monitor events have no <status> tag, never match
8. `collapseBackgroundBashNotifications` - collapses consecutive completions
9. Pass-through in verbose mode (ctrl+O shows each completion)
10. Pass-through if fullscreen not enabled
11. Counts consecutive completed background bash notifications
12. Single completion: passes through unchanged
13. Multiple completions: synthesizes "N background commands completed" notification
14. Uses existing task-notification format (UserAgentNotificationMessage knows how to render)

## Exports
- `isCompletedBackgroundBash` - type guard for completed bash
- `collapseBackgroundBashNotifications` - collapses consecutive notifications
