## Purpose
Renders the footer area below the prompt input containing status line, mode indicator, suggestions, help menu, notifications, and coordinator task panel.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, REACT
- **Internal**: `bridge/bridgeEnabled`, `bridge/bridgeStatusUtil`, `context/promptOverlayContext`, `hooks/*`, `ink`, `services/mcp`, `state/AppState`, `utils/fullscreen`, `utils/undercover`, and sibling components (CoordinatorAgentStatus, StatusLine, Notifications, PromptInputFooterLeftSide, PromptInputFooterSuggestions, PromptInputHelpMenu)

## Logic
1. Determines layout based on terminal width (narrow vs wide) and fullscreen mode
2. In fullscreen with short terminals, hides the optional StatusLine to conserve rows
3. When suggestions exist and not in fullscreen, renders only the suggestions overlay
4. When help is open, renders the help menu with fixed styling
5. Otherwise renders the full footer with left side (mode indicator, status) and right side (notifications, bridge status)
6. Sets up prompt overlay data for fullscreen portal when suggestions are present
7. BridgeStatusIndicator conditionally renders bridge connection status as a footer pill when BRIDGE_MODE feature is enabled

## Exports
- `default` - memoized PromptInputFooter component
- `BridgeStatusIndicator` - component showing REPL bridge connection status (feature-gated)
