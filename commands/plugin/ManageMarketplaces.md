## Purpose
Manage marketplace sources (add, update, remove) with automatic plugin updates.

## Imports
- **External**: React, figures
- **Internal**: Marketplace helpers, config management, plugin autoupdate

## Logic
Maintains list of configured marketplaces with their:
- Source display (GitHub, URL, local path)
- Plugin counts
- Last updated timestamp
- Auto-update status

Supports operations:
- Add new marketplace (via AddMarketplace component)
- Update marketplace (refreshes clone)
- Remove marketplace (uninstalls plugins first)
- Toggle auto-update

Shows progress during long operations and handles errors gracefully.

## Exports
- `ManageMarketplaces` - Main component for marketplace management
