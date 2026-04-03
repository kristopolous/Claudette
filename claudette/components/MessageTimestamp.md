## Purpose
Displays a formatted timestamp for assistant messages in transcript mode.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink/stringWidth` (stringWidth), `ink` (Box, Text), `types/message` (NormalizedMessage)

## Logic
Determines whether to show a timestamp based on transcript mode being active, the message having a timestamp, being an assistant message, and containing text content. When shown, formats the timestamp as a 12-hour time string and renders it in a Box sized to the string width with dimmed text color.

## Exports
- `MessageTimestamp` - renders a formatted time string for assistant messages when in transcript mode
