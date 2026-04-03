## Purpose
Renders agent/task notification messages with status-colored indicators and summary text.

## Imports
- **Stdlib**: None
- **External**: REACT, @anthropic-ai/sdk
- **Internal**: ink (Box, Text), messages utils (extractTag), figures constants

## Logic
1. Extracts summary and status from XML tags
2. Maps status to color: completed→success, failed→error, killed→warning, default→text
3. Renders with black circle indicator in status color followed by summary text

## Exports
- `UserAgentNotificationMessage` - UI component rendering agent notifications with status-colored indicators
