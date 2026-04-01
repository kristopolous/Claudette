# ink/dom

## Purpose
Provides DOM node types and utilities for Ink rendering.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink focus, ink layout/engine/node, ink measure-text, ink node-cache, ink squash-text-nodes, ink styles, ink tabstops, ink wrap-text

## Logic
1. `InkNode` - { parentNode, yogaNode?, style }
2. `TextName` - '#text'
3. `ElementNames` - 'ink-root' | 'ink-box' | 'ink-text' | 'ink-virtual-text' | 'ink-link' | 'ink-progress' | 'ink-raw-ansi'
4. `NodeNames` - ElementNames | TextName
5. `DOMElement` - DOM element type with nodeName, attributes, childNodes, textStyles
6. Internal properties: onComputeLayout, onRender, onImmediateRender, hasRenderedContent, dirty, isHidden, _eventHandlers
7. Scroll state: scrollTop, pendingScrollDelta, scrollClampMin, scrollClampMax, scrollHeight, scrollViewportHeight, scrollViewportTop, stickyScroll
8. `DOMNodeAttribute` - DOM node attribute type
9. `TextNode` - text node type
10. `createNode` - creates DOM node
11. `createTextNode` - creates text node
12. `appendChildNode`, `insertBeforeNode`, `removeChildNode` - child manipulation
13. `setAttribute`, `setStyle`, `setTextNodeValue`, `setTextStyles` - attribute setters
14. `markDirty` - marks node dirty
15. `clearYogaNodeReferences` - clears yoga node references
16. `FocusManager` - focus manager class
17. `createLayoutNode`, `LayoutNode` - layout types
18. `LayoutDisplay`, `LayoutMeasureMode` - layout constants
19. `measureText` - measures text
20. `addPendingClear`, `nodeCache` - node cache functions
21. `squashTextNodes` - squashes text nodes
22. `Styles`, `TextStyles` - style types
23. `expandTabs` - expands tabs
24. `wrapText` - wraps text

## Exports
- `InkNode` - ink node type
- `TextName` - text name type
- `ElementNames` - element names type
- `NodeNames` - node names type
- `DOMElement` - DOM element type
- `DOMNodeAttribute` - DOM node attribute type
- `TextNode` - text node type
- (DOM manipulation functions)
