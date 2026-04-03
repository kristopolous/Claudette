# components/LogoV2/ChannelsNotice

## Purpose
Provides channels notice component for MCP channel availability notifications.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: bootstrap state, ink, MCP channelAllowlist/channelNotification/config, auth, plugins installedPluginsManager, settings settings

## Logic
1. Conditionally require()'d in LogoV2 behind feature('KAIROS') || feature('KAIROS_CHANNELS')
2. No feature() guard here - whole file tree-shakes via require pattern when both flags false
3. Do NOT import this module statically from unguarded code
4. `ChannelsNotice` - UI component for channels notice
5. Uses REACT_COMPILER runtime (_c) for memoization
6. Uses useState for channels, disabled, noAuth, policyBlocked, list, unmatched
7. Returns null if channels.length === 0
8. hasNonDev = channels.some(channel => !channel.isDev)
9. flag = getHasDevChannels() && hasNonDev ? "Channels" : getHasDevChannels() ? "--dangerously-load-development-channels" : "--channels"
10. If disabled: shows "{flag} ignored ({list})" in error color
11. Shows "Channels are not currently available" in dim color
12. If noAuth: shows "{flag} ignored ({list})" in error color
13. Shows "Channels require claude.ai authentication · run /login, then restart" in dim color
14. If policyBlocked: shows policy blocked message
15. If unmatched: shows unmatched channels message
16. Renders Box with paddingLeft={2}, flexDirection="column"
17. `useState` - UI hook
18. `ChannelEntry`, `getAllowedChannels`, `getHasDevChannels` - bootstrap state functions
19. `Box`, `Text` - ink components
20. `isChannelsEnabled` - checks if channels enabled
21. `getEffectiveChannelAllowlist` - gets effective channel allowlist
22. `getMcpConfigsByScope` - gets MCP configs by scope
23. `getClaudeAIOAuthTokens`, `getSubscriptionType` - auth functions
24. `loadInstalledPluginsV2` - loads installed plugins
25. `getSettingsForSource` - gets settings for source

## Exports
- `ChannelsNotice` - channels notice component
