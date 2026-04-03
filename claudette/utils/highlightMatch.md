# highlightMatch

## Purpose
Inverse-highlights every occurrence of a query string within text (case-insensitive). Used by search dialogs to show where the query matched in result rows and preview panes.

## Imports
- **Stdlib**: REACT
- **Internal**: `../ink` (Text component)

## Logic
1. Returns plain text if query is empty or not found.
2. Converts both text and query to lowercase for case-insensitive matching.
3. Iterates through all occurrences using `indexOf`, building an array of React nodes: plain text segments for non-matching parts, and `<Text inverse>` wrapped segments for matches.
4. Returns the parts array wrapped in a React fragment.

## Exports
- `highlightMatch` — function `(text: string, query: string) => React.ReactNode`. Splits text into highlighted and non-highlighted segments based on case-insensitive query matches.
