## Purpose
Provides a fuzzy-searchable dialog for browsing and selecting from conversation history entries.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `context/overlayContext`, `history`, `hooks/useTerminalSize`, `ink/stringWidth`, `ink/wrapAnsi`, `ink`, `services/analytics/index`, `utils/config`, `utils/format`, `components/design-system/FuzzyPicker`

## Logic
1. Loads timestamped history entries asynchronously and formats them with age and first-line preview
2. Filters entries using exact substring match first, then subsequence matching as fallback
3. Calculates layout dimensions based on terminal width, supporting side-by-side preview on wider terminals
4. Renders a FuzzyPicker with items showing age and truncated first line, plus a wrapped preview panel
5. Logs analytics events on selection and resolves the selected history entry

## Exports
- `HistorySearchDialog` - UI component that renders a searchable history picker with preview and fuzzy matching
