## Purpose
A theme-aware Box wrapper that resolves theme color keys to raw color values for border and background styling.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `Box`, `DOMElement`, `ClickEvent`, `FocusEvent`, `KeyboardEvent`, `Color`, `Styles`, `getTheme`, `Theme`, `useTheme`

## Logic
Extracts color props that may be theme keys or raw colors, resolves them through the current theme using `getTheme`, and passes the resolved values to the underlying Box component along with all other style and event props.

## Exports
- `ThemedBox` (default export) - renders a Box with theme-resolved color values for borders and background
- `Props` - type definition for ThemedBox component props
