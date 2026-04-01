# ink/measure-element

## Purpose
Provides element measurement utility for Ink layout.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink dom

## Logic
1. `Output` - { width, height }
2. `width` - element width
3. `height` - element height
4. `measureElement` - measures dimensions of Box element
5. Returns node.yogaNode?.getComputedWidth() ?? 0 for width
6. Returns node.yogaNode?.getComputedHeight() ?? 0 for height
7. `DOMElement` - DOM element type

## Exports
- `Output` - output type
- `measureElement` - measures element (default export)
