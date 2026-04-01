## Purpose
Pagination hook for continuous scrolling lists (plugin management).

## Imports
- **Stdlib**: React (useCallback, useMemo, useRef)
- **External**: None
- **Internal**: None

## Logic
Implements continuous scrolling rather than discrete pages. Tracks scroll offset based on selectedIndex to keep selected item visible. Provides:
- `getVisibleItems()` - slice of items for current viewport
- `toActualIndex()` - convert visible index to actual array index
- `isOnCurrentPage()` - check if item is visible
- `handleSelectionChange()` - updates selectedIndex, auto-scrolls
- `scrollPosition` - UI state (current position, total, canScrollUp/Down)

Window size is maxVisible items; scrolls when selection approaches edges.

## Exports
- `usePagination` - Hook for continuous scrolling list behavior
