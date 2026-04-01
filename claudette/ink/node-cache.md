## Purpose
Manages cached layout bounds for rendered nodes to optimize rendering performance by tracking position changes and clearing removed nodes.

## Imports
- **Stdlib**: None specified
- **External**: None specified
- **Internal**: DOMElement type from dom module, Rectangle type from layout/geometry module

## Logic
1. Maintains a WeakMap to cache layout bounds (x, y, width, height, top) for each DOM element
2. Tracks pending clears for removed children that need to be cleared on next render
3. Handles absolute-positioned node removals specially by setting a flag to disable blit for the next frame
4. Provides functions to add pending clears, consume the absolute removed flag, and manage the cache

## Exports
- `CachedLayout` - Type definition for cached layout bounds (x, y, width, height, optional top)
- `nodeCache` - WeakMap storing cached layout bounds for DOM elements
- `pendingClears` - WeakMap storing rectangles of removed children that need clearing
- `addPendingClear` - Function to add a rectangle to pending clears for a parent element
- `consumeAbsoluteRemovedFlag` - Function to get and reset the absolute node removed flag