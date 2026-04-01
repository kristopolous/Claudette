# utils/plugins/officialMarketplace

## Purpose
Provides constants for the official Anthropic plugins marketplace.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: plugins schemas

## Logic
1. `OFFICIAL_MARKETPLACE_SOURCE` - source configuration for official marketplace
2. source: 'github', repo: 'anthropics/claude-plugins-official'
3. Used when auto-installing marketplace on startup
4. `OFFICIAL_MARKETPLACE_NAME` - 'claude-plugins-official'
5. Display name for official marketplace
6. Registered in known_marketplaces.json under this name

## Exports
- `OFFICIAL_MARKETPLACE_SOURCE` - official marketplace source
- `OFFICIAL_MARKETPLACE_NAME` - official marketplace name
