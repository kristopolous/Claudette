## Purpose
Displays a warning dialog for Bypass Permissions mode, allowing users to accept responsibility or exit the application.

## Imports
- **Stdlib**: none
- **External**: react
- **Internal**: src/services/analytics/index.js (logEvent), ../ink.js (Box, Link, Newline, Text), ../utils/gracefulShutdown.js (gracefulShutdownSync), ../utils/settings/settings.js (updateSettingsForSource), ./CustomSelect/index.js (Select), ./design-system/Dialog.js (Dialog)

## Logic
Logs an analytics event when the dialog is shown. Presents a warning about Bypass Permissions mode where Claudette Code will not ask for approval before running dangerous commands. On accept, logs an event, updates user settings to skip the dangerous mode permission prompt, and calls onAccept. On decline, triggers a graceful shutdown. Escape key also triggers graceful shutdown.

## Exports
- `BypassPermissionsModeDialog` - Dialog that warns users about Bypass Permissions mode and requires explicit acceptance to proceed
