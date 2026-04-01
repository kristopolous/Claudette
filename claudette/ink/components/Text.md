# ink/components/Text

## Purpose
Provides Text component for styled text rendering.

## Imports
- **Stdlib**: (none)
- **External**: `react`, `react/compiler-runtime`
- **Internal**: ink styles

## Logic
1. `BaseProps` - { color?, backgroundColor?, italic?, underline?, strikethrough?, inverse?, wrap?, children? }
2. `color` - change text color, accepts raw color value (rgb, hex, ansi)
3. `backgroundColor` - same as color, but for background
4. `italic` - make text italic
5. `underline` - make text underlined
6. `strikethrough` - make text crossed with a line
7. `inverse` - inverse background and foreground colors
8. `wrap` - text wrap mode: wrap (default), wrap-trim, end, middle, or truncate-*
9. If wrap: Ink wraps text into multiple lines
10. If truncate-*: Ink truncates text to one line with rest cut off
11. `WeightProps` - bold and dim are mutually exclusive in terminals
12. Ensures you can use one or the other, but not both
13. `Props` - BaseProps & WeightProps
14. `memoizedStylesForWrap` - memoized styles for wrap modes
15. Includes: wrap, wrap-trim, end, middle with flexGrow: 0, flexShrink: 1, flexDirection: 'row'
16. `Text` - React component for styled text
17. Uses React compiler runtime (_c) for memoization
18. `ReactNode` - React node type
19. `Color`, `Styles`, `TextStyles` - style types

## Exports
- `BaseProps` - base props type
- `WeightProps` - weight props type
- `Props` - text props type
- `memoizedStylesForWrap` - memoized styles for wrap
- `Text` - text component
