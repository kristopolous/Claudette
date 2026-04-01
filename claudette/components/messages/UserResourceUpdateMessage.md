## Purpose
Renders MCP resource and polling update notifications parsed from XML-formatted content.

## Imports
- **Stdlib**: None
- **External**: react, @anthropic-ai/sdk
- **Internal**: ink (Box, Text), figures constants

## Logic
1. Parses XML tags for mcp-resource-update and mcp-polling-update using regex
2. Extracts server name, target (URI or tool name), and optional reason from each update
3. Formats URIs for display (shows filename for file:// URIs, truncates long URIs)
4. Renders each update with a refresh arrow, server name, target, and optional reason

## Exports
- `UserResourceUpdateMessage` - React component rendering MCP resource/polling updates
- `parseUpdates` - Internal function parsing XML-formatted update strings into structured data
- `formatUri` - Internal function formatting URIs for display
