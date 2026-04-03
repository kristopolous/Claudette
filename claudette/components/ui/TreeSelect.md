## Purpose
Provides a generic component for selecting items from a hierarchical tree structure with expand/collapse support.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `KeyboardEvent` from `ink/events/keyboard-event`, `Box` from `ink`, `OptionWithDescription`, `Select` from `CustomSelect/select`

## Logic
Flattens tree nodes into a linear list based on expand/collapse state via a recursive traverse function, builds display labels with tree prefixes (▼/▶ for parents, ▸ for children at each depth), manages expanded node IDs through internal state or external callbacks, handles keyboard navigation (right arrow expands, left arrow collapses or navigates to parent), and delegates rendering to the Select component wrapped in a focusable Box with keydown handling.

## Exports
- `TreeNode` - generic type representing a tree node with id, value, label, optional children, and metadata
- `TreeSelectProps` - props type for the TreeSelect component including nodes, callbacks, layout, and customization options
- `TreeSelect` - component for selecting items from a hierarchical tree with keyboard navigation and expand/collapse
