# notifier

## Purpose
Provides system notification sending via multiple channels (iTerm2, Kitty, Ghostty, terminal bell).

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink useTerminalNotification, config, env, execFileNoThrow, hooks, log, analytics

## Logic
1. `NotificationOptions` - type with message, title, notificationType
2. `sendNotification` - main function sending notification via configured channel
3. Executes notification hooks before sending
4. Logs method used for analytics (configured channel, method used, terminal type)
5. `sendToChannel` - routes to appropriate channel handler
6. Channels: auto, iterm2, iterm2_with_bell, kitty, ghostty, terminal_bell, notifications_disabled
7. `DEFAULT_TITLE` - "Claudette" default title
8. `sendAuto` - auto-detects best notification method based on terminal
9. Error handling: returns 'error' on failure, 'disabled' for notifications_disabled
10. Kitty notifications include generated ID for tracking

## Exports
- `NotificationOptions` - notification options type
- `sendNotification` - sends notification via configured channel
