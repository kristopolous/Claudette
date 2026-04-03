## Purpose
Shows a low-priority notification when plugins have been auto-updated, prompting the user to run `/reload-plugins` to apply changes.

## Imports
- **External**: REACT (useEffect, useState)
- **Internal**:
  - `.././bootstrap/state` (getIsRemoteMode)
  - `.././context/notifications` (useNotifications)
  - `.././ink` (Text)
  - `.././utils/debug` (logForDebugging)
  - `.././utils/plugins/pluginAutoupdate` (onPluginsAutoUpdated)

## Logic
- Hook subscribes to `onPluginsAutoUpdated`; receives array of updated plugin IDs
- Stores updated plugins in state; when non-empty:
  - Derives display names by stripping version after '@' (e.g., "plugin@1.2.3" → "plugin")
  - If 1-2 plugins: join with " and "; else: show count "N plugins"
  - Adds notification:
    - `key`: "plugin-autoupdate-restart"
    - `jsx`: `<Text color="success">Plugin(s) updated: {displayNames}</Text><Text dimColor> · Run /reload-plugins to apply</Text>`
    - `priority`: "low"
    - `timeoutMs`: 10000
- Not suppressed by scroll draining; but skipped in remote mode
- Updating state replaces previous notification (same key)

## Exports
- `usePluginAutoupdateNotification` - Hook with no parameters
