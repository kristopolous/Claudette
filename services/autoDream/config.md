# services/autoDream/config

## Purpose
Provides auto-dream enabled state check with minimal imports for UI components.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: settings, growthbook utils

## Logic
1. `isAutoDreamEnabled` - checks if background memory consolidation should run
2. User setting (autoDreamEnabled in settings.json) overrides GrowthBook default when explicitly set
3. Falls through to tengu_onyx_plover GrowthBook feature if setting undefined
4. Returns gb?.enabled === true from GrowthBook
5. Leaf config module - intentionally minimal imports
6. UI components can read enabled state without dragging in forked agent/task registry/message builder chain

## Exports
- `isAutoDreamEnabled` - function checking if auto-dream enabled
