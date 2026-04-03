# QueuedMessageContext

## Purpose
Provides UI context for queued message styling with padding and first-item tracking.

## Imports
- **Stdlib**: (none)
- **External**: REACT_COMPILER, REACT
- **Internal**: ink Box component

## Logic
1. `QueuedMessageContextValue` type with isQueued, isFirst, paddingWidth
2. `PADDING_X` constant (2) for horizontal padding
3. `QueuedMessageProvider` - wraps children with context value
4. Brief layout mode skips padding (already indented via HighlightedThinkingText)
5. BriefTool UI would double-indent with paddingX here
6. `useQueuedMessage` - returns context value or undefined
7. Memoized context value to avoid re-renders

## Exports
- `QueuedMessageContextValue` - type for context value
- `QueuedMessageProvider` - provider component
- `useQueuedMessage` - hook to get queued message context
