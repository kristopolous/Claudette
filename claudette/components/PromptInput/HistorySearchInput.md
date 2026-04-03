## Purpose
Provides a text input field for searching through prompt history with visual feedback for match status.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink/stringWidth`, `ink`, `TextInput`

## Logic
1. Displays a dimmed label showing "search prompts:" or "no matching prompt:" based on match status
2. Renders a focused TextInput component sized to the current value width
3. Forces cursor to the end of the search input since navigation should cancel search
4. Uses single-line, dimmed input styling

## Exports
- `default` - HistorySearchInput component accepting value, onChange, and historyFailedMatch props
