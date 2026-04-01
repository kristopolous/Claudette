# overlayContext

## Purpose
Provides React context for tracking active overlays for Escape key coordination.

## Imports
- **Stdlib**: (none)
- **External**: `react/compiler-runtime`, `react`
- **Internal**: ink instances, AppState

## Logic
1. Solves Escape key handling when overlays (like Select with onCancel) are open
2. CancelRequestHandler checks if overlay active before canceling requests
3. `NON_MODAL_OVERLAYS` - set of overlays that don't disable TextInput focus (e.g., autocomplete)
4. `useRegisterOverlay` - auto-registers on mount, unregisters on unmount
5. Conditional registration via enabled param (e.g., only when onCancel provided)
6. `useIsOverlayActive` - checks if any overlay currently active
7. `useIsNonModalOverlayActive` - checks if only non-modal overlays active
8. AppState.activeOverlays tracks set of active overlay IDs

## Exports
- `NON_MODAL_OVERLAYS` - set of non-modal overlay IDs
- `useRegisterOverlay` - hook to register overlay with auto-cleanup
- `useIsOverlayActive` - checks if any overlay active
- `useIsNonModalOverlayActive` - checks if only non-modal overlays active
