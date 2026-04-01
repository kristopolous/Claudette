## Purpose
Provides two hooks: auto-copy selection to clipboard on drag/multi-click finish, and sync selection background color with theme.

## Imports
- **External**: `react` (useEffect, useRef)
- **Internal**:
  - `../components/design-system/ThemeProvider.js` (useTheme)
  - `../ink/hooks/use-selection.js` (useSelection type)
  - `../utils/config.js` (getGlobalConfig)
  - `../utils/theme.js` (getTheme)

## Logic
**useCopyOnSelect(selection, isActive, onCopied?)**
- Subscribes to selection state changes
- Waits for drag finish (`isDragging` goes false) or multi-click (no drag)
- Only triggers once per selection (copiedRef guard)
- Respects `copyOnSelect` config (default true)
- Copies via `selection.copySelectionNoClear()`
- Ignores whitespace-only selections
- Calls `onCopied(text)` if provided (e.g., to show toast)

**useSelectionBgColor(selection)**
- Syncs selection overlay color to `theme.selectionBg`
- Updates on theme changes

## Exports
- `useCopyOnSelect` - Hook `(selection: Selection, isActive: boolean, onCopied?: (text: string) => void) => void`
- `useSelectionBgColor` - Hook `(selection: Selection) => void`
