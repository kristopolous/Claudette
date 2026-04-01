## Purpose
Renders user prompt text with optional thinking trigger highlighting using rainbow colors and brief layout mode support.

## Imports
- **Stdlib**: None
- **External**: react, figures
- **Internal**: ink (Box, Text), messageActions, QueuedMessageContext, formatBriefTimestamp utils, thinking utils

## Logic
1. In brief layout mode: renders "You" label with optional timestamp, then the text content
2. In normal mode: detects thinking trigger positions in text if ultrathink is enabled
3. When thinking triggers found: splits text into segments, rendering trigger characters with rainbow colors and plain text normally
4. When no triggers: renders text with pointer prefix in suggestion/subtle color
5. Handles queued message state by dimming the label

## Exports
- `HighlightedThinkingText` - React component rendering user text with optional rainbow-colored thinking triggers
