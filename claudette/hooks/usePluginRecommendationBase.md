## Purpose
Provides shared state management and installation logic for plugin recommendation hooks (e.g., LSP, claude-code-hint), centralizing gating and notification patterns.

## Imports
- **Stdlib**: None
- **External**: `figures` (icons), `react` (`c`, `useState`, `useRef`, `useEffect`)
- **Internal**:
  - `bootstrap/state` - `getIsRemoteMode` to check remote sessions
  - `context/notifications` - `AddNotification` type
  - `ink` - `Text` component for rendering
  - `utils/log` - `logError` for catching exceptions
  - `utils/plugins/marketplaceManager` - `getPluginById` to fetch plugin metadata

## Logic
This hook manages the lifecycle of a plugin recommendation:

- Holds the `recommendation` state (nullable) and an `isCheckingRef` to prevent concurrent async resolutions.
- Exposes `tryResolve` which wraps the child hook's resolve logic with standard gates:
  - Returns early if the session is remote, a recommendation is already showing, or a check is already in progress.
  - Otherwise, marks checking, runs `resolve()`, and updates `recommendation` if a result is returned.
- `clearRecommendation` resets the state to `null`, allowing a new recommendation to be resolved.
- `installPluginAndNotify` fetches the plugin by ID, runs the provided `install` callback, and posts a success (with `figures.tick`) or failure notification.

Derived hooks like `useLspPluginRecommendation` build on this base, using `tryResolve` in effects to scan files and call `setRecommendation`.

## Exports
- `usePluginRecommendationBase` - returns `{ recommendation, clearRecommendation, tryResolve }`
- `installPluginAndNotify` - helper to install and notify about plugin installation
