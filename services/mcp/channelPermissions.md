# mcp/channelPermissions

## Purpose
Implements permission prompts over channels (Telegram, iMessage, Discord) with structured event-based approval.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: JSON utils, growthbook

## Logic
1. Mirrors BridgePermissionCallbacks - races channel reply against local UI/bridge/hooks/classifier
2. Inbound: server parses "yes tbxkq" reply, emits notifications/claude/channel/permission event
3. CC never sees reply as text - approval requires server to emit specific event
4. Servers opt-in via capabilities.experimental['claude/channel/permission']
5. `isChannelPermissionRelayEnabled` - tengu_harbor_permissions gate (default false)
6. `ChannelPermissionResponse` - behavior (allow/deny) + fromServer identifier
7. `ChannelPermissionCallbacks` - onResponse registration, resolve from structured event
8. `PERMISSION_REPLY_RE` - regex: /^\s*(y|yes|n|no)\s+([a-km-z]{5})\s*$/i
9. 5 lowercase letters, no 'l' (looks like 1/I), case-insensitive
10. `ID_ALPHABET` - 25-letter alphabet (a-z minus 'l'), 25^5 ≈ 9.8M space
11. Trust boundary: allowlist (tengu_harbor_ledger), not terminal
12. Compromised channel can fabricate "yes <id>" - accepted risk (faster not more capable)

## Exports
- `isChannelPermissionRelayEnabled` - checks permission relay gate
- `ChannelPermissionResponse` - permission response type
- `ChannelPermissionCallbacks` - callbacks interface
- `PERMISSION_REPLY_RE` - reply format regex
- `ID_ALPHABET` - ID generation alphabet
