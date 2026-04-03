## Purpose
Manages keyboard-driven navigation and viewport scrolling for a select component with paginated option display.

## Imports
- **Stdlib**: `util` (isDeepStrictEqual)
- **External**: REACT (useCallback, useEffect, useMemo, useReducer, useRef, useState)
- **Internal**: `option-map` (OptionMap), `select` (OptionWithDescription)

## Logic
Uses a reducer-based state machine to track focused value and visible viewport bounds (visibleFromIndex, visibleToIndex). The reducer handles five actions: focus-next-option, focus-previous-option, focus-next-page, focus-previous-page, set-focus, and reset. Each navigation action implements minimal scrolling—only adjusting the viewport when the newly focused item falls outside the current visible range. Options change detection triggers a state reset while preserving viewport position when possible. The hook computes validated focused value (falling back to first option if the focused value no longer exists), visible options slice, and whether the focused option is an input type.

## Exports
- `useSelectNavigation` - hook that provides focused value, visible options, and navigation functions (focusNextOption, focusPreviousOption, focusNextPage, focusPreviousPage, focusOption)
- `UseSelectNavigationProps` - type defining input props for the hook
- `SelectNavigation` - type defining the return shape of the hook
