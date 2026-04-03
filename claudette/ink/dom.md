## Purpose
Provides DOM node types and utilities for Ink rendering, including tree manipulation, dirty tracking, text measurement, and scroll state.

## Imports
- **Internal**: `ink/focus`, `ink/layout/engine`, `ink/layout/node`, `ink/measure-text`, `ink/node-cache`, `ink/squash-text-nodes`, `ink/styles`, `ink/tabstops`, `ink/wrap-text`

## Logic
Defines `DOMElement` and `TextNode` types that form the Ink DOM tree. Each element optionally has a Yoga layout node (skipped for `ink-virtual-text`, `ink-link`, `ink-progress`). Text nodes (`ink-text`, `ink-raw-ansi`) get Yoga measure functions. Tree manipulation (`appendChildNode`, `insertBeforeNode`, `removeChildNode`) updates both DOM child lists and Yoga child trees, marking ancestors dirty. Attribute/style setters dirty-check before marking dirty. `markDirty` walks up to the root, setting `.dirty` on element ancestors and calling `yogaNode.markDirty()` on leaf text/raw-ansi nodes. `collectRemovedRects` gathers cached layout rects from removed subtrees for stale-content clearing. `scheduleRenderFrom` walks to the root and calls its throttled `onRender`. `findOwnerChainAtRow` DFS-accumulates yoga offsets to find the UI component stack at a screen row (for repaint debugging).

## Exports
- `TextName` - literal type '#text'
- `ElementNames` - union of all element node names
- `NodeNames` - ElementNames | TextName
- `DOMElement` - element type with attributes, childNodes, scroll state, focusManager, debugOwnerChain
- `TextNode` - text node type with nodeValue
- `DOMNode` - discriminated union resolving to DOMElement or TextNode
- `DOMNodeAttribute` - boolean | string | number
- `createNode` - creates a DOMElement, attaching Yoga nodes and measure functions as needed
- `createTextNode` - creates a TextNode
- `appendChildNode` - appends a child, updating Yoga tree and marking dirty
- `insertBeforeNode` - inserts before a sibling, computing correct Yoga index
- `removeChildNode` - removes a child, collecting cached rects and marking dirty
- `setAttribute` - sets an attribute with dirty-checking
- `setStyle` - sets styles with dirty-checking
- `setTextStyles` - sets text styles with dirty-checking
- `setTextNodeValue` - sets text content with dirty-checking
- `markDirty` - marks a node and all ancestors dirty for re-rendering
- `scheduleRenderFrom` - walks to root and triggers throttled render
- `clearYogaNodeReferences` - recursively clears yogaNode references before freeing
- `findOwnerChainAtRow` - finds UI component stack at a screen row for debug attribution
