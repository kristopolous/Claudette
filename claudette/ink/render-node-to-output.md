## Purpose
Renders DOM nodes to an output buffer, handling text wrapping, scroll optimization, layout caching, and blit fast paths.

## Imports
- **External**: `indent-string`
- **Internal**: `ink/colorize`, `ink/dom`, `ink/get-max-width`, `ink/layout/geometry`, `ink/layout/node`, `ink/node-cache`, `ink/output`, `ink/render-border`, `ink/screen`, `ink/squash-text-nodes`, `ink/styles`, `ink/terminal`, `ink/widest-line`, `ink/wrap-text`

## Logic
Recursively renders each DOM node to an output buffer. For text nodes, squashes text segments, applies word wrapping with soft-wrap tracking, and applies styles per-segment with OSC 8 hyperlink support. For box nodes, handles background fills, clipping, overflow, and scroll containers with DECSTBM hardware scroll optimization. Uses a node cache to skip unchanged subtrees via blit from the previous screen. Tracks layout shifts to determine when full-damage rendering is needed. Supports absolute-positioned overlays with repair passes for shifted content. Scroll containers use adaptive drain for xterm.js and proportional drain for native terminals.

## Exports
- `ScrollHint` - type describing a hardware scroll region and delta
- `FollowScroll` - type describing scroll follow state for selection tracking
- `resetLayoutShifted` - resets the layout shift flag for the new frame
- `didLayoutShift` - returns whether any node's layout position changed this frame
- `resetScrollHint` - resets the scroll hint and rotates absolute rects
- `getScrollHint` - returns the current DECSTBM scroll hint
- `resetScrollDrainNode` - clears the scroll drain node reference
- `getScrollDrainNode` - returns the node with pending scroll delta
- `consumeFollowScroll` - consumes and returns the follow scroll event
- `renderNodeToOutput` - renders a DOM node to the output buffer
- `buildCharToSegmentMap` - builds a mapping from character positions to segment indices
- `applyStylesToWrappedText` - applies styles to wrapped text preserving per-segment styles
