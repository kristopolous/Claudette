## Purpose
Freezes React children when they scroll above the terminal viewport to prevent unnecessary re-renders.

## Imports
- **Stdlib**: none
- **External**: `react` (useContext, useRef)
- **Internal**: `useTerminalViewport` (ink/hooks/use-terminal-viewport), `Box` (ink), `InVirtualListContext` (messageActions)

## Logic
Caches the children element reference in a ref. When content scrolls out of the visible terminal viewport (into scrollback), returns the cached element reference instead of live children, causing React's reconciler to skip re-rendering the subtree. Updates the cache only when visible or inside a virtual list. Skips freezing entirely for virtual lists since they clip inside the viewport.

## Exports
- `OffscreenFreeze` - wrapper component that freezes children rendering when scrolled offscreen
