# ink/squash-text-nodes

## Purpose
Provides utilities for squashing text nodes into styled segments or plain strings.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink dom, ink styles

## Logic
1. `StyledSegment` - { text, styles, hyperlink? }
2. Segment of text with associated styles
3. Used for structured rendering without ANSI string transforms
4. `squashTextNodesToSegments` - squashes text nodes into styled segments
5. Propagates styles down through tree
6. Allows structured styling without ANSI string transforms
7. Merges node.textStyles with inheritedStyles
8. For #text nodes: pushes segment with text, merged styles, inherited hyperlink
9. For ink-text/ink-virtual-text: recurses with merged styles
10. For ink-link: recurses with href or inherited hyperlink
11. `squashTextNodes` - squashes text nodes into plain string (without styles)
12. Used for text measurement in layout calculations
13. Iterates through childNodes
14. For #text: appends nodeValue to text
15. For ink-text/ink-virtual-text: recurses and appends result
16. `DOMElement` - DOM element type
17. `TextStyles` - text styles type

## Exports
- `StyledSegment` - styled segment type
- `squashTextNodesToSegments` - squashes to styled segments
- `squashTextNodes` - squashes to plain string
