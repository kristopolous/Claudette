## Purpose
Renders a single item in an ordered list with a marker prefix.

## Imports
- **Stdlib**: none
- **External**: REACT (createContext, ReactNode, useContext), REACT_COMPILER
- **Internal**: `Box`, `Text` from `ink`

## Logic
Creates a UI context to receive the list marker string, consumes it via useContext, and renders the marker with dimmed color alongside the children in a column layout within a horizontal box with gap spacing.

## Exports
- `OrderedListItemContext` - context providing the marker string for list items
- `OrderedListItem` - component that renders a list item with its marker and children
