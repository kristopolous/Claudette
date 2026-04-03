## Purpose
Renders the left side of the prompt input footer containing mode indicators, history search, vim status, and various status pills for tasks, teams, and background agents.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, `figures`, REACT, REACT_COMPILER
- **Internal**: `ink`, `types/textInputTypes`, `Tool`, `utils`, `keybindings/useShortcutDisplay`, `utils/permissions/PermissionMode`, `tasks/*`, `utils/*`, `state/AppState`, `hooks/*`, `context/voice`, `ink/terminal`, `ink/hooks/use-selection`, `utils/config`, `utils/platform`, and sibling components (HistorySearchInput, VoiceIndicator, PrBadge, BackgroundTaskStatus, CoordinatorAgentStatus, TeamStatus, design-system components)

## Logic
1. Shows exit message, pasting indicator, or vim insert mode when applicable
2. Renders HistorySearchInput when in history search mode
3. ModeIndicator component manages the primary footer content including permission mode, background tasks, teams, tmux session, PR status, and proactive countdown
4. Builds hint parts for spinner state (interrupt, stop agents, toggle tasks)
5. Handles voice mode hints with session-level show counting
6. Manages selection copy hints for fullscreen mode with platform-specific instructions
7. Renders teammate pills on their own line when present, with other parts below
8. Ensures stable height in fullscreen mode to prevent scroll content shifting
9. ProactiveCountdown subscribes to proactive changes and displays remaining time

## Exports
- `PromptInputFooterLeftSide` - component rendering the left side of the prompt footer with mode and status indicators
