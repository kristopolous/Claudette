## Purpose
The root container for interactive CLI sessions, responsible for initializing the application's global state and providing essential performance and statistics contexts to the entire component tree.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., REACT)
- **Internal**: `context/fpsMetrics`, `context/stats`, `state/AppState`, `state/onChangeAppState`, `utils/fpsTracker`

## Logic
1. **Context Initialization**: Wraps all child components in a multi-layered provider structure to manage global services:
    - **Performance Monitoring**: The `FpsMetricsProvider` provides real-time access to UI responsiveness metrics (FPS), allowing components to optimize rendering behavior under load.
    - **Session Analytics**: The `StatsProvider` maintains a central store for session-level statistics and event tracking.
    - **Application State**: The `AppStateProvider` establishes the primary state management system, injecting the initial session data and attaching a global change listener to synchronize state transitions across the application.
2. **State Hydration**: Receives the `initialState` from the application entry point, ensuring that the interactive session begins with correctly resolved configurations, tool definitions, and user settings.
3. **Structural Composition**: Serves as a pure structural orchestrator, ensuring that foundational contexts are available before any functional UI components (passed as `children`) are rendered.

## Exports
- `App` - The top-level functional component that bootstraps the interactive session environment.
