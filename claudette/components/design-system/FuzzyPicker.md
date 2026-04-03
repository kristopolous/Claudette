## Purpose
A full-screen fuzzy search picker that lets users search, navigate, and select from a list of items with keyboard shortcuts and optional preview panels.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `useSearchInput`, `useTerminalSize`, `KeyboardEvent`, `clamp`, `Box`, `Text`, `useTerminalFocus`, `SearchBox`, `Byline`, `KeyboardShortcutHint`, `ListItem`, `Pane`

## Logic
Manages a searchable list with a focused index, caps visible items to fit the terminal, handles arrow/tab/enter/escape keybindings, computes a sliding window of visible items, and renders a search box, item list, optional preview, and keyboard shortcut hints. Supports both "down" and "up" directions for the input position relative to the list.

## Exports
- `FuzzyPicker` - renders a complete fuzzy search picker with search input, navigable list, optional preview, and keyboard hints
- `List` - internal component that renders the visible window of list items with scroll indicators
