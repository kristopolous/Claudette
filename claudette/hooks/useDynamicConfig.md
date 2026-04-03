## Purpose
Fetches dynamic configuration values (from GrowthBook), returning the default initially and updating once the remote value is retrieved.

## Imports
- **External**: REACT
- **Internal**: `../services/analytics/growthbook` (getDynamicConfig_BLOCKS_ON_INIT)

## Logic
- Generic hook: `useDynamicConfig<T>(configName: string, defaultValue: T): T`
- Initializes state with `defaultValue`
- Effect runs on mount and when `configName` or `defaultValue` changes:
  - Skipped in test environment to avoid hangs
  - Calls `getDynamicConfig_BLOCKS_ON_INIT<T>(configName, defaultValue)` (async) and updates state with result
- Components re-render when config resolves

## Exports
- `useDynamicConfig` - Hook `<T>(configName: string, defaultValue: T) => T`
