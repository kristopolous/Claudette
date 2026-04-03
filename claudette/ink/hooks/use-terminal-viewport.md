## Purpose
Detects whether a component is currently visible within the terminal viewport.

## Imports
- **Stdlib**: none
- **External**: REACT (useCallback, useContext, useLayoutEffect, useRef)
- **Internal**: `TerminalSizeContext`, `dom`

## Logic
Uses a callback ref attached to the element and a layout effect that runs every render. Walks the DOM parent chain to compute absolute position, accounting for scroll containers' scrollTop. Compares the element's bounding box against the viewport dimensions (adjusted for cursor-restore scrollback). Updates a mutable ref entry without triggering re-renders to avoid infinite update loops.

## Exports
- `useTerminalViewport` - returns a callback ref and a ViewportEntry object indicating whether the element is visible
