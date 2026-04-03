## Purpose
Shows a keyboard shortcut hint for backgrounding the current session when a query is in progress and no foreground tasks are running.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `useDoublePress`, `Box`, `Text`, `useKeybinding`, `useShortcutDisplay`, `useAppState`, `useAppStateStore`, `useSetAppState`, `backgroundAll`, `hasForegroundTasks`, `getGlobalConfig`, `saveGlobalConfig`, `env`, `isEnvTruthy`, `KeyboardShortcutHint`

## Logic
Registers a keybinding for the background task action that only activates when a query is loading and no foreground tasks exist. Uses a double-press pattern where the first press shows a hint and the second press within the timeout backgrounds the session. Adjusts the displayed shortcut for tmux terminals which require double-press. Tracks first-time background usage in global config.

## Exports
- `SessionBackgroundHint` - renders a dimmed keyboard shortcut hint for backgrounding the session when conditions are met
