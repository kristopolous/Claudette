## Purpose
Renders a search input display box with prefix icon, query text, cursor positioning, and optional border styling.

## Imports
- **Stdlib**: None
- **External**: react, react/compiler-runtime
- **Internal**: ink (Box, Text)

## Logic
1. Renders a search prefix icon (default: magnifying glass) followed by the query or placeholder text
2. When focused and terminal is focused, displays the query with an inverse-colored cursor character at the current offset
3. When unfocused, shows the query or placeholder in dimmed text
4. Wraps content in a Box with optional rounded border, suggestion-colored border when focused, and configurable padding

## Exports
- `SearchBox` - React component rendering a styled search input display
