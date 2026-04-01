## Purpose
Renders agent/task notification messages with status-colored indicators and summary text.

## Imports
- **Stdlib**: None
- **External**: react, @anthropic-ai/sdk
- **Internal**: ink (Box, Text), messages utils (extractTag), figures constants

## Logic
1. Extracts summary and status from XML tags
2. Maps status to color: completed→success, failed→error, killed→warning, default→text
3. Renders with black circle indicator in status color followed by summary text

## Exports
- `UserAgentNotificationMessage` - React component rendering agent notifications with status-colored indicators
- `getStatusColor` - Internal function mapping status string to text color
