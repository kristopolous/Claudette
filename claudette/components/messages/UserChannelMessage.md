## Purpose
Renders channel messages from external sources (e.g., Slack) parsed from XML-formatted content with source and user attribution.

## Imports
- **Stdlib**: None
- **External**: REACT, @anthropic-ai/sdk
- **Internal**: ink (Box, Text), format utils (truncateToWidth), figures constants, xml constants

## Logic
1. Parses XML channel tag using regex to extract source, optional user attribute, and content
2. Displays server name with leaf-only formatting (strips plugin:slack-channel: prefix)
3. Truncates body content to 60 characters width
4. Renders with channel arrow prefix, source/user attribution, and truncated content

## Exports
- `UserChannelMessage` - UI component rendering channel messages with source attribution
