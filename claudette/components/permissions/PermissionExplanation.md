## Purpose
Provides an AI-generated explanation of permission requests with risk level assessment, loaded on-demand via keyboard shortcut.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `ink`, `keybindings/useKeybinding`, `services/analytics`, `types/message`, `utils/permissions/permissionExplainer`, `Spinner/ShimmerChar`, `Spinner/useShimmerAnimation`

## Logic
Manages a lazily-created promise that fetches permission explanations only when the user triggers the shortcut. Displays shimmer loading animation while fetching, then renders the explanation text, reasoning, and color-coded risk level. Uses React Suspense and the use() hook for promise handling.

## Exports
- `usePermissionExplainerUI` - hook that manages explainer visibility state and creates the fetch promise on demand
- `PermissionExplainerContent` - component that renders the loading state or explanation result when visible
