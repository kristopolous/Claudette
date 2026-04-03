## Purpose
Combines selection state management with navigation to provide a complete single-select hook.

## Imports
- **Stdlib**: none
- **External**: REACT (useCallback, useState)
- **Internal**: `select` (OptionWithDescription), `use-select-navigation`

## Logic
Maintains a `value` state for the currently selected option, delegates all navigation logic to `useSelectNavigation`, and provides a `selectFocusedOption` callback that sets the value to the currently focused option. Spreads the navigation return value and augments it with selection-specific state and callbacks.

## Exports
- `useSelectState` - hook that provides navigation plus single-selection state (value, selectFocusedOption, onChange, onCancel)
- `UseSelectStateProps` - type defining input props for the hook
- `SelectState` - type defining the return shape of the hook
