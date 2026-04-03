## Purpose
Displays a preview of a session log with its messages, loading state, and keyboard shortcuts for navigation.

## Imports
- **Stdlib**: `crypto` (UUID type)
- **External**: REACT (useCallback), REACT_COMPILER
- **Internal**: `ink` (Box, Text), `keybindings/useKeybinding`, `tools` (getAllBaseTools), `types/logs` (LogOption), `utils/format` (formatRelativeTimeAgo), `utils/sessionStorage` (getSessionIdFromLog, isLiteLog, loadFullLog), `components/ConfigurableShortcutHint`, `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`, `components/design-system/LoadingState`, `components/Messages`

## Logic
1. Loads the full log from a lite log reference on mount if needed
2. Sets up keybindings for confirming (Enter) and canceling (Esc) the preview
3. Renders a loading state while the full log is being fetched
4. Displays the session messages using the Messages component with metadata including relative time, message count, and git branch

## Exports
- `SessionPreview` - renders a preview of a session log with messages and navigation controls
