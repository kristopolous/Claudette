# ink/get-max-width

## Purpose
Provides utility for getting yoga node's content width.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink layout/node

## Logic
1. `getMaxWidth` - returns yoga node's content width
2. Computed width minus padding and border
3. Warning: can return value WIDER than parent container
4. In column-direction flex parent, width is cross axis
5. align-items: stretch never shrinks children below intrinsic size
6. Text node overflows (standard CSS behavior)
7. Yoga measures leaf nodes in two passes:
   - AtMost pass determines width
   - Exactly pass determines height
8. getComputedWidth() reflects wider AtMost result
9. getComputedHeight() reflects narrower Exactly result
10. Callers using this for wrapping should clamp to actual available screen space
11. Rendered line count stays consistent with layout height
12. `LayoutEdge`, `LayoutNode` - layout types

## Exports
- `getMaxWidth` - gets max width (default export)
