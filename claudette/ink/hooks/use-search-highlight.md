## Purpose
Sets a search highlight query that inverts matching visible text on screen.

## Imports
- **Stdlib**: none
- **External**: `react` (useContext, useMemo)
- **Internal**: `components/StdinContext`, `dom`, `instances`, `render-to-screen`

## Logic
Looks up the Claudette instance via the instances map. Memoizes an object with setQuery, scanElement, and setPositions functions. Non-empty queries cause all visible occurrences to be inverted on the next frame using SGR 7 screen-buffer overlay. Empty queries clear highlights. Works on rendered text regardless of source.

## Exports
- `useSearchHighlight` - returns an object with setQuery to set/clear the search query, scanElement to scan a DOM subtree for matches, and setPositions to overlay a current-position highlight
