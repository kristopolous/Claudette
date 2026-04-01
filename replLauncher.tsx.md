# replLauncher.tsx

## Purpose
Launches the REPL interface by dynamically importing App and REPL components and rendering them via the provided render function.

## Imports
- **Stdlib**: None
- **External**: `react`
- **Internal**: `StatsStore` (context/stats), `Root` (ink), `Props as REPLProps` (screens/REPL), `AppState` (state/AppStateStore), `FpsMetrics` (utils/fpsTracker)

## Logic
1. **Dynamic imports**: Lazily import `App` and `REPL` components to defer loading until needed
2. **Composition**: Wrap `REPL` component inside `App` component with the provided appProps
3. **Render delegation**: Call the provided `renderAndRun` function with the Root and composed element

## Types

### AppWrapperProps
```typescript
type AppWrapperProps = {
  getFpsMetrics: () => FpsMetrics | undefined;
  stats?: StatsStore;
  initialState: AppState;
}
```

## Exports
- `launchRepl` - Async function that launches the REPL interface
- `AppWrapperProps` - Type for the app wrapper properties
