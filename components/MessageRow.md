## Purpose
A UI module that acts as a performance-optimized container for individual messages in a conversation history, managing state-dependent rendering, animation logic, and visibility transitions.

## Imports
- **Internal**: 
    - UI: `ink`, `Message`, `MessageModel`, `MessageTimestamp`, `OffscreenFreeze`, `Messages`
    - Logic/Types: `commands`, `screens/REPL`, `Tool`, `types/message`, `utils/collapseReadSearch`, `utils/messages`

## Logic
1. **Conditional State Resolution**:
    - **Active Groups**: Identifies if a message belongs to a collapsed group of background tasks (e.g., file reading/searching) and determines if the group should remain in an "active" state while a query is still in progress.
    - **Metadata Handling**: Evaluates whether to display message metadata (timestamps, model names) based on the current viewing mode (e.g., standard vs. transcript).
2. **Animation Control**: Dynamically enables or disables visual animations for messages depending on whether their associated background operations (tool uses) are still running.
3. **Performance Optimization**:
    - **Memoization**: Implements a conservative comparison algorithm to skip re-rendering static messages that have already been finalized and resolved.
    - **Offscreen Management**: Wraps messages in a freezing container to reduce processing overhead for content that is not currently in focus or is part of a non-interactive history.
4. **Contextual Layout**: Adjusts the container width and margin settings based on the terminal's column count and the presence of metadata to ensure a consistent visual alignment.
5. **Streaming Detection**: Monitors in-flight tool IDs to decide when a message is truly "final" versus "streaming," allowing for real-time UI updates during active inference.

## Exports
- `MessageRow` - The memoized UI component used to render individual lines of conversation history.
- `hasContentAfterIndex` - A utility function that scans forward in the message list to assist with collapsed group state decisions.
