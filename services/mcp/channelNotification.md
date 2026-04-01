# mcp/channelNotification

## Purpose
Handles MCP channel notifications for inbound messages from external channels (Discord, Slack, SMS, etc.).

## Imports
- **Stdlib**: (none)
- **External**: `@modelcontextprotocol/sdk`, `zod/v4`
- **Internal**: bootstrap state, xml constants, auth, lazySchema, pluginIdentifier, settings, xml utils, channelAllowlist

## Logic
1. Channel = MCP server with outbound tools + inbound notifications
2. `ChannelMessageNotificationSchema` - schema for notifications/claude/channel
3. Wraps content in `<channel>` tag with meta attributes (thread_id, user, etc.)
4. Enqueues message; SleepTool polls hasCommandsInQueue() and wakes within 1s
5. feature('KAIROS') || feature('KAIROS_CHANNELS') runtime gate
6. Requires claude.ai OAuth auth - API key users blocked until console surface
7. Teams/Enterprise need channelsEnabled: true in managed settings
8. `CHANNEL_PERMISSION_METHOD` - notifications/claude/channel/permission
9. `ChannelPermissionNotificationSchema` - structured permission reply schema
10. Servers declare capabilities.experimental['claude/channel/permission'] for opt-in
11. Permission reply regex: /^\s*(y|yes|n|no)\s+([a-km-z]{5})\s*$/i
12. request_id matching for pending permission requests

## Exports
- `ChannelMessageNotificationSchema` - channel message notification schema
- `CHANNEL_PERMISSION_METHOD` - permission notification method constant
- `ChannelPermissionNotificationSchema` - permission reply schema
- (Channel notification handler functions)
