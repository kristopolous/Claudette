# ink/render-to-screen

## Purpose
Provides render-to-screen functionality for isolated message rendering.

## Imports
- **Stdlib**: (none)
- **External**: `lodash-es/noop`, `react`, `react-reconciler/constants`
- **Internal**: utils debug, ink dom, ink focus, ink output, ink reconciler, ink render-node-to-output, ink screen

## Logic
1. `MatchPosition` - { row, col, len } for match position within rendered message
2. row: message row (0 = message top)
3. col: message column
4. len: number of CELLS match spans (= query.length for ASCII, more for wide chars)
5. Stable across scroll - add message's screen-row offset to highlight on real screen
6. Shared root, container, stylePool, charPool, hyperlinkPool, output across calls
7. Pools accumulate style/char interns - reusing hits cache more
8. Root/container reuse saves createContainer cost (~1ms)
9. LegacyRoot: all work sync, no scheduling
10. ConcurrentRoot's scheduler backlog leaks across roots via flushSyncWork
11. `timing` - { reconcile, yoga, paint, scan, calls } for timing stats
12. `LOG_EVERY` (20) - log every N calls
13. `renderToScreen` - renders ReactElement to isolated Screen buffer
14. Creates root if not exists with createNode('ink-root')
15. Creates FocusManager for root
16. Creates stylePool, charPool, hyperlinkPool
17. Creates container via reconciler.createContainer with LegacyRoot
18. ~1-3ms per call (yoga alloc + calculateLayout + paint)
19. flushSyncWork cross-root leak ~0.0003ms/call growth
20. Fine for on-demand single-message rendering
21. Pathological for render-all-8k-upfront
22. Cache per (msg, query, width) upstream
23. Unmounts between calls, root/container/pools persist for reuse
24. `noop` - noop function
25. `ReactElement` - React element type
26. `LegacyRoot` - legacy root constant
27. `logForDebugging` - debug logging
28. `createNode`, `DOMElement` - DOM node types/functions
29. `FocusManager` - focus manager class
30. `Output` - output class
31. `reconciler` - reconciler instance
32. `renderNodeToOutput`, `resetLayoutShifted` - render functions
33. `CellWidth`, `CharPool`, `cellAtIndex`, `createScreen`, `HyperlinkPool`, `Screen`, `StylePool`, `setCellStyleId` - screen types/functions

## Exports
- `MatchPosition` - match position type
- `renderToScreen` - renders to screen
