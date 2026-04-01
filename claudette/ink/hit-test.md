# ink/hit-test

## Purpose
Provides hit-testing utilities for click events on rendered DOM elements.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink dom, ink events click-event/event-handlers, ink node-cache

## Logic
1. `hitTest` - finds deepest DOM element whose rendered rect contains (col, row)
2. Uses nodeCache populated by renderNodeToOutput
3. Rects are in screen coordinates with all offsets (including scrollTop translation) already applied
4. Children traversed in reverse so later siblings (painted on top) win
5. Nodes not in nodeCache (not rendered this frame, or lacking yogaNode) skipped along with subtrees
6. Returns hit node even if no onClick - dispatchClick walks up via parentNode to find handlers
7. `dispatchClick` - hit-tests root at (col, row) and bubbles ClickEvent from deepest containing node
8. Only nodes with onClick handler fire
9. Stops when handler calls stopImmediatePropagation()
10. Returns true if at least one onClick handler fired
11. Click-to-focus: finds closest focusable ancestor and focuses it
12. root is always ink-root, which owns FocusManager
13. Uses root.focusManager.handleClickFocus for focus
14. Calculates localCol and localRow from rect offset
15. `DOMElement` - DOM element type
16. `ClickEvent` - click event class
17. `EventHandlerProps` - event handler props type
18. `nodeCache` - node cache

## Exports
- `hitTest` - hit tests for element at position
- `dispatchClick` - dispatches click event
