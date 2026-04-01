## Purpose
Displays a list of previous Claudette sessions filtered by the current repository for the user to resume.

## Imports
- **Stdlib**: none
- **External**: `react` (useCallback, useState)
- **Internal**: `useTerminalSize` (hooks), `CodeSession`, `fetchCodeSessionsFromSessionsAPI` (utils/teleport/api), `Box`, `Text`, `useInput` (ink), `useKeybinding` (keybindings), `useShortcutDisplay` (keybindings), `logForDebugging` (utils/debug), `detectCurrentRepository` (utils/detectRepository), `formatRelativeTime` (utils/format), `ConfigurableShortcutHint`, `Select` (CustomSelect), `Byline`, `KeyboardShortcutHint` (design-system), `Spinner`, `TeleportError`

## Logic
Detects the current git repository, fetches code sessions from the API, filters sessions to the current repo, and sorts by most recently updated. Displays a loading spinner, error states with specific guidance (network, auth, api, other), or a selectable list of sessions. Handles keyboard input for navigation, retry (ctrl+r), and cancel (esc). Shows scroll position when the list exceeds visible area.

## Exports
- `ResumeTask` - renders the session selection interface for resuming a previous session
