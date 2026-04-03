## Purpose
Manages state and keyboard input for a multi-select component with support for input-type options, submit buttons, and image attachments.

## Imports
- **Stdlib**: `util` (isDeepStrictEqual)
- **External**: REACT (useCallback, useState)
- **Internal**: `context/overlayContext` (useRegisterOverlay), `ink/events/input-event` (InputEvent), `ink` (useInput), `utils/stringUtils` (normalizeFullWidthDigits, normalizeFullWidthSpace), `select` (OptionWithDescription), `use-select-navigation`

## Logic
Maintains selected values, input field values, and submit focus state. Resets selections when options change. Delegates navigation to `useSelectNavigation` with optional last-item initial focus. Registers as an overlay to prevent Escape interception. Handles comprehensive keyboard input via `useInput`: Tab/Shift+Tab for forward/backward navigation including submit button focus, arrow keys/Ctrl+N/Ctrl+P/j/k for navigation with boundary callbacks, PageUp/PageDown for page navigation, Enter/Space for toggling selection or submitting, numeric keys for direct index-based toggling (when indexes are visible), and Escape for cancellation. Input-type options restrict keyboard handling to navigation keys only.

## Exports
- `useMultiSelectState` - hook that provides multi-select state including selected values, input values, submit focus state, and keyboard handling
- `UseMultiSelectStateProps` - type defining input props for the hook
- `MultiSelectState` - type defining the return shape of the hook
