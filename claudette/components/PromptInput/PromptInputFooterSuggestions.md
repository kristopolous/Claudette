## Purpose
Renders a list of autocomplete suggestions in the prompt input footer with support for unified suggestion types (files, MCP resources, agents) and legacy suggestion formats.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `hooks/useTerminalSize`, `ink/stringWidth`, `ink`, `utils/format`, `utils/theme`

## Logic
1. Determines whether each suggestion is a unified type (file-, mcp-resource-, or agent-prefixed) or legacy format
2. For unified suggestions, selects appropriate icons and truncates display text based on terminal width and description presence
3. For legacy suggestions, calculates column widths and renders name, tag, and description with proper truncation
4. Computes a scrollable window of visible items centered on the selected suggestion, respecting terminal height constraints
5. Renders each suggestion row with selection highlighting (dimmed when not selected, "suggestion" color when selected)

## Exports
- `SuggestionItem` - type defining the shape of a suggestion item with id, displayText, tag, description, metadata, and color
- `SuggestionType` - type union for suggestion categories (command, file, directory, agent, shell, custom-title, slack-channel, none)
- `OVERLAY_MAX_ITEMS` - constant limiting overlay suggestion display to 5 items
- `PromptInputFooterSuggestions` - component that renders suggestion items in a scrollable list with selection state
- `default` - memoized version of PromptInputFooterSuggestions
