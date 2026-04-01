# ink/reconciler

## Purpose
Provides React reconciler for Ink terminal rendering.

## Imports
- **Stdlib**: `fs`
- **External**: `react-reconciler`
- **Internal**: native-ts yoga-layout, utils envUtils, ink dom, ink events dispatcher/event-handlers, ink focus, ink layout/node, ink styles

## Logic
1. Conditionally imports devtools in development mode
2. Shows warning if react-devtools-core not installed
3. `diff` - diffs before/after objects
4. Returns undefined if before === after
5. Returns after if !before
6. Tracks changed keys, marks isChanged
7. Handles deleted keys (sets to undefined)
8. `cleanupYogaNode` - cleans up yoga node references before freeing
9. Unsets measure func, clears references, frees recursively
10. `Props` - Record<string, unknown>
11. `HostContext` - { isInsideText }
12. `setEventHandler` - sets event handler on node
13. `applyProp` - applies prop to node
14. Handles style, textStyles, event handlers, attributes
15. `FiberLike` - { elementType?, _debugOwner?, return? }
16. `getOwnerChain` - gets component stack from fiber
17. Walks up to 50 levels, prefers _debugOwner over return
18. Skips host elements (ink-box etc)
19. `isDebugRepaintsEnabled` - checks if debug repaints enabled
20. `dispatcher` - Dispatcher instance
21. Commit instrumentation variables: _commits, _lastLog, _lastCommitAt, _maxGapMs, _createCount, _prepareAt
22. `Dispatcher` - event dispatcher class
23. `EVENT_HANDLER_PROPS` - event handler props set
24. `getFocusManager`, `getRootNode` - focus functions
25. `LayoutDisplay` - layout display type
26. `applyStyles`, `Styles`, `TextStyles` - style functions/types
27. `appendChildNode`, `clearYogaNodeReferences`, `createNode`, `createTextNode`, `DOMElement`, `DOMNodeAttribute`, `ElementNames`, `insertBeforeNode`, `markDirty`, `removeChildNode`, `setAttribute`, `setStyle`, `setTextNodeValue`, `setTextStyles`, `TextNode` - DOM functions/types
28. `getYogaCounters` - gets yoga counters
29. `isEnvTruthy` - checks env truthy
30. `createReconciler` - creates reconciler
31. `appendFileSync` - sync file append

## Exports
- `diff` - diffs objects
- `cleanupYogaNode` - cleans up yoga node
- `Props` - props type
- `HostContext` - host context type
- `FiberLike` - fiber-like type
- `getOwnerChain` - gets owner chain
- `isDebugRepaintsEnabled` - checks debug repaints
- `dispatcher` - dispatcher instance
- (Reconciler configuration and functions)
