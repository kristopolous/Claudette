## Purpose
A theme-aware Text component that resolves theme color keys to raw colors and supports hover color context inheritance across Box boundaries.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `Text`, `Color`, `Styles`, `getTheme`, `Theme`, `useTheme`

## Logic
Resolves the color prop through the current theme, with precedence: explicit color > hover color context > dimmed inactive. Resolves background color from theme keys and passes all styling props to the underlying Text component.

## Exports
- `ThemedText` (default export) - renders text with theme-resolved colors and styling options
- `TextHoverColorContext` - React context for propagating hover colors to descendant ThemedText components
- `Props` - type definition for ThemedText component props
