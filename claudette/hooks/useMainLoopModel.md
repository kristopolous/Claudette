## Purpose
Returns the current main loop model name, resolving from session override, app state, or default, and automatically re-resolves when GrowthBook feature flags refresh.

## Imports
- **Stdlib**: None
- **External**: REACT (`useEffect`, `useReducer`)
- **Internal**:
  - `services/analytics/growthbook` - `onGrowthBookRefresh`
  - `state/AppState` - `useAppState`
  - `utils/model/model` - `getDefaultMainLoopModelSetting`, `ModelName`, `parseUserSpecifiedModel`

## Logic
- Subscribes to AppState for `mainLoopModel` and `mainLoopModelForSession`.
- Uses `useReducer` to create a `forceRerender` function and calls `onGrowthBookRefresh(forceRerender)` once on mount. When GrowthBook refreshes (e.g., remote config update), this triggers a re-render so the hook re-resolves the model with latest feature flags.
- Resolves the model with precedence: `mainLoopModelForSession` > `mainLoopModel` > `getDefaultMainLoopModelSetting()` via `parseUserSpecifiedModel`.
- Returns the final `ModelName`.

## Exports
- `useMainLoopModel` - hook returning `ModelName`
