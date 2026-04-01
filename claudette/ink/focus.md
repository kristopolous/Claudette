## Purpose
Provides a DOM-like focus manager for the Claudette terminal UI, tracking active element, focus stack, and tabbable element traversal.

## Imports
- **Internal**: `ink/dom`, `ink/events/focus-event`

## Logic
Maintains an activeElement reference and a bounded focus stack (max 32). On focus, pushes the previous element onto the stack and dispatches blur/focus events. On node removal, checks if the active element or any stack entries are descendants of the removed subtree, blurs if needed, and restores focus to the most recent still-mounted element from the stack. Supports tab navigation by collecting all tabbable elements (tabIndex >= 0) via tree walk and cycling forward or backward with wraparound.

## Exports
- `FocusManager` - class managing focus state, stack, and tab navigation
- `getRootNode` - walks up from a node to find the root element holding the FocusManager
- `getFocusManager` - returns the FocusManager for a given node by finding its root
