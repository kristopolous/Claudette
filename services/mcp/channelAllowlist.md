# mcp/channelAllowlist

## Purpose
Provides allowlist gating for MCP channel plugins with GrowthBook-based configuration.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: lazySchema, pluginIdentifier, growthbook

## Logic
1. `ChannelAllowlistEntry` - type with marketplace and plugin fields
2. `ChannelAllowlistSchema` - Zod array schema for allowlist entries
3. `getChannelAllowlist` - fetches from tengu_harbor_ledger GrowthBook feature
4. Plugin-level granularity: approved plugin = all its channel servers approved
5. `isChannelsEnabled` - overall on/off gate (tengu_harbor, default false)
6. `isChannelAllowlisted` - pure allowlist check for UI pre-filtering
7. Returns false for undefined/@-less pluginSource (non-plugin servers)
8. Parses plugin identifier to extract name and marketplace
9. Matches against {marketplace, plugin} entries in allowlist
10. --dangerously-load-development-channels flag bypasses for both kinds
11. Lives in GrowthBook for updates without release

## Exports
- `ChannelAllowlistEntry` - allowlist entry type
- `getChannelAllowlist` - fetches allowlist from GrowthBook
- `isChannelsEnabled` - checks overall channels enabled gate
- `isChannelAllowlisted` - checks if specific plugin is allowlisted
