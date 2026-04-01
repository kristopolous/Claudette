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
8. `Dispatcher` - event dispatcher class
9. `EVENT_HANDLER_PROPS` - event handler props set
10. `getFocusManager`, `getRootNode` - focus functions
11. `LayoutDisplay` - layout display type
12. `applyStyles`, `Styles`, `TextStyles` - style functions/types
13. `appendChildNode`, `clearYogaNodeReferences`, `createNode`, `createTextNode`, `DOMElement`, `DOMNodeAttribute`, `ElementNames`, `insertBeforeNode`, `markDirty`, `removeChildNode`, `setAttribute`, `setStyle`, `setTextNodeValue`, `setTextStyles`, `TextNode` - DOM functions/types
14. `getYogaCounters` - gets yoga counters
15. `isEnvTruthy` - checks env truthy
16. `createReconciler` - creates reconciler

## Exports
- `diff` - diffs objects
- (Reconciler configuration and functions)
