## Purpose
Provides an interactive session selector UI for browsing, searching, filtering, and resuming previous sessions.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`, `chalk`, `figures`, `fuse.js`
- **Internal**: `bootstrap/state`, `hooks/useExitOnCtrlCDWithKeybindings`, `hooks/useSearchInput`, `hooks/useTerminalSize`, `ink/colorize`, `ink`, `keybindings/useKeybinding`, `services/analytics`, `types/logs`, `utils/format`, `utils/getWorktreePaths`, `utils/git`, `utils/log`, `utils/sessionStorage`, `utils/theme`, `components/ConfigurableShortcutHint`, `components/CustomSelect/select`, `components/design-system/Byline`, `components/design-system/Divider`, `components/design-system/KeyboardShortcutHint`, `components/SearchBox`, `components/SessionPreview`, `components/Spinner`, `components/TagTabs`, `components/TextInput`, `components/ui/TreeSelect`

## Logic
1. Filters logs by tag, branch, worktree, and project scope
2. Supports text search with fuzzy matching via Fuse.js and snippet extraction
3. Groups logs by session ID with expandable/collapsible tree view
4. Handles multiple view modes: list, search, rename, and preview
5. Supports agentic search for deep transcript searching
6. Manages keyboard bindings for navigation, filtering, renaming, and previewing sessions
7. Renders a full UI with tag tabs, search box, filter indicators, session list/tree, and keyboard shortcut hints

## Exports
- `LogSelector` - React component that provides a full-featured session selection interface with search, filtering, grouping, and preview capabilities
