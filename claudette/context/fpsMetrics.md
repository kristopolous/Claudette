# fpsMetrics

## Purpose
Provides UI context for FPS (frames per second) metrics getter.

## Imports
- **Stdlib**: (none)
- **External**: REACT_COMPILER, REACT
- **Internal**: FpsMetrics type from fpsTracker

## Logic
1. `FpsMetricsGetter` - type for function returning FpsMetrics or undefined
2. `FpsMetricsContext` - context created with undefined default
3. `FpsMetricsProvider` - wraps children with getFpsMetrics function
4. `useFpsMetrics` - returns the FPS metrics getter function
5. Used for performance monitoring and display

## Exports
- `FpsMetricsGetter` - type for FPS metrics getter function
- `FpsMetricsProvider` - provider component
- `useFpsMetrics` - hook to get FPS metrics getter
