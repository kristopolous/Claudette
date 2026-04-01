## Purpose
A performance-optimized UI module that implements a virtualized scrolling list for conversation history, supporting extremely large message counts by rendering only the visible subset of items.

## Imports
- **Internal**: 
    - UI: `ink`, `design-system/ThemedText`, `FullscreenLayout`, `ink/components/ScrollBox`, `messageActions`
    - Logic/State: `hooks/useVirtualScroll`, `ink/dom`, `ink/render-to-screen`, `types/message`, `utils/debug`, `utils/sleep`, `utils/transcriptSearch`

## Logic
1. **Virtualization Strategy**: Uses an incremental key tracking system to efficiently append new messages without rebuilding the entire data structure. Only messages within the current viewport (calculated based on terminal height and scroll position) are rendered as active elements.
2. **Search and Navigation**:
    - **Indexing**: Includes a two-phase search engine that performs an initial text scan to find match candidates, followed by a precise visual scan to highlight specific occurrences within the terminal grid.
    - **Jump Controls**: Provides imperative methods to "jump" to specific indices, cycle through search matches (n/N), and anchor the scroll position during interactive searches.
3. **Sticky Interactions**: Implements a "Sticky Prompt" tracker that identifies the last user-issued command scrolled above the viewport and pins it to the top of the interface for persistent context.
4. **Performance Tuning**:
    - **WeakMap Caching**: Stores expensive text-lowering and prompt-extraction results in a WeakMap to avoid redundant processing during high-frequency scroll events.
    - **GC Management**: Utilizes stable callback references for item interactions (clicks, hover) to minimize the allocation of short-lived closures, significantly reducing garbage collection pressure during fast scrolling.
5. **Layout Stability**: Maintains a "breathing room" (headroom) when jumping to targets and uses unquantized scroll subscriptions to ensure the UI feels responsive even at low terminal frame rates.

## Exports
- `VirtualMessageList` - The core virtualized list component for high-performance message rendering.
- `isMessageStreaming` - Utility to check if a message's content is actively changing.
- `allToolsResolved` - Verifies if all background operations associated with a message have completed.
- `areMessageRowPropsEqual` - A custom memoization comparator for message row optimization.
