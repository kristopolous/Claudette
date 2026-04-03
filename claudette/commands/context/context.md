## Purpose
Shows current context usage as a colored grid in interactive mode.

## Imports
- **External**: REACT
- **Internal**: `ContextVisualization` component, `microcompactMessages`, `LocalJSXCommandContext`, `Message` type, `analyzeContextUsage`, `getMessagesAfterCompactBoundary`, `renderToAnsiString`

## Logic
`call` transforms messages to the API view (applying compact boundary and projectView if CONTEXT_COLLAPSE feature), then applies microcompact to get accurate representation. It calls `analyzeContextUsage` to collect context data, renders `<ContextVisualization>` to an ANSI string using `renderToAnsiString`, passes the result to `onDone`, and returns null.

## Exports
- `call` - Async JSX command function
