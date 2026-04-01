## Purpose
Top-level wrapper for interactive sessions that provides FPS metrics, stats context, and app state to the component tree.

## Imports
- **Stdlib**: None
- **External**: react, react/compiler-runtime
- **Internal**: context/fpsMetrics (FpsMetricsProvider), context/stats (StatsProvider, StatsStore), state/AppState (AppState, AppStateProvider), state/onChangeAppState (onChangeAppState), utils/fpsTracker (FpsMetrics)

## Logic
1. Wraps children in an AppStateProvider with initial state and onChange handler
2. Wraps the result in a StatsProvider with the optional stats store
3. Wraps everything in an FpsMetricsProvider with the metrics getter function
4. Returns the fully wrapped component tree

## Exports
- `App` - Root component that sets up all provider contexts for the application
