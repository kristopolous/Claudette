## Purpose
Renders shutdown request and rejection messages between teammates with appropriate visual styling.

## Imports
- **Stdlib**: None
- **External**: react
- **Internal**: ink (Box, Text), teammateMailbox utils

## Logic
1. Shutdown requests: Renders sender header in warning color with optional reason in a rounded warning-colored border
2. Shutdown rejections: Renders rejection notice in subtle color with reason in dashed border and continuation hint
3. tryRenderShutdownMessage parses content and dispatches to appropriate renderer, skipping approved shutdowns
4. getShutdownMessageSummary returns brief summary strings for inbox/queue display

## Exports
- `ShutdownRequestDisplay` - React component rendering shutdown request with warning styling
- `ShutdownRejectedDisplay` - React component rendering shutdown rejection with subtle styling
- `tryRenderShutdownMessage` - Parses and renders shutdown messages, returns null if not applicable
- `getShutdownMessageSummary` - Returns brief summary string for shutdown messages
