# ink/components/ScrollBox

## Purpose
Provides ScrollBox component with overflow scroll and imperative scroll API.

## Imports
- **Stdlib**: (none)
- **External**: REACT, `type-fest`
- **Internal**: bootstrap state, ink dom/reconciler/styles, ink global.d, ink components Box

## Logic
1. `ScrollBoxHandle` - imperative handle for scroll box
2. `scrollTo(y)` - scroll to absolute y position
3. `scrollBy(dy)` - scroll by delta y
4. `scrollToElement(el, offset?)` - scroll so element's top is at viewport top
5. Defers position read to render time for deterministic behavior
6. `scrollToBottom()` - scroll to bottom
7. `getScrollTop()` - gets current scroll top
8. `getPendingDelta()` - gets pending scroll delta
9. `getScrollHeight()` - gets scroll height
10. `getFreshScrollHeight()` - gets fresh scroll height via Yoga (not cached)
11. `getViewportHeight()` - gets viewport height
12. `getViewportTop()` - gets absolute screen-buffer row of first visible content line
13. `isSticky()` - checks if scroll is pinned to bottom
14. `subscribe(listener)` - subscribes to imperative scroll changes
15. `setClampBounds(min?, max?)` - sets render-time scrollTop clamp bounds
16. `ScrollBoxProps` - extends Styles (excluding textWrap, overflow, overflowX, overflowY)
17. Includes ref, stickyScroll
18. `stickyScroll` - auto-pins scroll to bottom when content grows
19. `ScrollBox` - Box with overflow: scroll and imperative scroll API
20. Children laid out at full Yoga-computed height inside constrained container
21. At render time, only children intersecting visible window rendered (viewport culling)
22. Content translated by -scrollTop and clipped to box bounds
23. Works best inside fullscreen (constrained-height root) Ink tree
24. `PropsWithChildren`, `Ref` - React types
25. `useImperativeHandle`, `useRef`, `useState` - UI hooks
26. `Except` - type-fest utility
27. `markScrollActivity` - marks scroll activity
28. `DOMElement` - DOM element type
29. `markDirty`, `scheduleRenderFrom` - dom functions
30. `markCommitStart` - reconciler function
31. `Styles` - styles type
32. `Box` - Box component

## Exports
- `ScrollBoxHandle` - scroll box handle type
- `ScrollBoxProps` - scroll box props type
- `ScrollBox` - scroll box component
