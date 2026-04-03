## Purpose
Renders a status indicator icon with appropriate symbol and color for success, error, warning, info, pending, and loading states.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `figures`
- **Internal**: `Text`

## Logic
Looks up the icon and color from a static configuration map based on the status prop, then renders the icon with the corresponding color. Applies dimColor when no color is defined, and optionally appends a trailing space.

## Exports
- `StatusIcon` - renders a colored status icon based on the provided status type
