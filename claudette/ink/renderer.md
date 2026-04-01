# ink/renderer

## Purpose
Provides renderer for Ink frame rendering.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: utils debug, ink dom, ink frame, ink node-cache, ink output, ink render-node-to-output, ink screen

## Logic
1. `RenderOptions` - { frontFrame, backFrame, isTTY, terminalWidth, terminalRows, altScreen, prevFrameContaminated }
2. `prevFrameContaminated` - true when previous frame's screen buffer mutated post-render
3. Selection overlay, reset to blank (alt-screen enter/resize/SIGCONT), or reset to 0×0 (forceRedraw)
4. Blitting from such prevScreen would copy stale inverted cells, blanks, or nothing
5. When false, blit is safe
6. `Renderer` - (options: RenderOptions) => Frame
7. `createRenderer` - creates renderer for DOMElement with StylePool
8. Reuses Output across frames so charCache persists
9. Most lines don't change between renders
10. Gets pools from back buffer's screen (pools may be replaced between frames)
11. Returns empty frame if yoga node doesn't exist or layout not computed
12. getComputedHeight() returns NaN before calculateLayout() called
13. Checks for invalid dimensions (negative, Infinity) that would cause RangeError
14. Logs invalid yoga dimensions for debugging
15. Creates screen via createScreen with terminalWidth, 0, stylePool, charPool, hyperlinkPool
16. Returns frame with screen, viewport, cursor
17. `logForDebugging` - debug logging
18. `DOMElement`, `markDirty` - DOM functions
19. `Frame` - frame type
20. `consumeAbsoluteRemovedFlag` - consumes removed flag
21. `Output` - output class
22. `renderNodeToOutput`, `getScrollDrainNode`, `getScrollHint`, `resetLayoutShifted`, `resetScrollDrainNode`, `resetScrollHint` - render functions
23. `createScreen`, `StylePool` - screen types/functions

## Exports
- `RenderOptions` - render options type
- `Renderer` - renderer type
- `createRenderer` - creates renderer
