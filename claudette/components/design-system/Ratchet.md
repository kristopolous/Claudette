## Purpose
Prevents layout shifting by locking the minimum height of content to its maximum measured size, keeping the terminal cursor stable when content grows or shrinks.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `useTerminalSize`, `useTerminalViewport`, `Box`, `DOMElement`, `measureElement`

## Logic
Tracks the maximum height of inner content using refs and layout effects, then applies it as a `minHeight` on the outer box. The ratchet engages either always or only when the viewport is offscreen, preventing the cursor from jumping when content size changes.

## Exports
- `Ratchet` - wraps children and locks their minimum height to prevent layout shifts
