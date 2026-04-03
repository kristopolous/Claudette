## Purpose
Renders a placeholder string with an optional inverse cursor for empty input fields, handling focus and visibility conditions.

## Imports
- **Stdlib**: None
- **External**: STYLER (for styling)
- **Internal**: None

## Logic
Accepts props: `placeholder`, `value`, `showCursor`, `focus`, `terminalFocus` (default true), `invert` (default `STYLER.inverse`), `hidePlaceholderText` (default false).
- If `placeholder` exists and `hidePlaceholderText` is true (e.g., voice recording), renders only an inverted space when both `showCursor` and `focus` and `terminalFocus` are true; otherwise empty string.
- Otherwise, dims the placeholder with `STYLER.dim`; if `showCursor`, `focus`, and `terminalFocus` are all true, inverts the first character and dims the rest. For empty placeholder, inverts a space.
- `showPlaceholder` flag is true when `value` is empty and a `placeholder` is provided.
- Returns `{ renderedPlaceholder, showPlaceholder }`.

## Exports
- `renderPlaceholder` - function with `PlaceholderRendererProps` returning `{ renderedPlaceholder: string | undefined, showPlaceholder: boolean }`
- `PlaceholderRendererProps` - type for the input props
