# ink/styles

## Purpose
Provides style types and utilities for Ink rendering.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink layout/node, ink render-border

## Logic
1. `RGBColor` - `rgb(${number},${number},${number})`
2. `HexColor` - `#${string}`
3. `Ansi256Color` - `ansi256(${number})`
4. `AnsiColor` - ansi:black/red/green/yellow/blue/magenta/cyan/white and bright variants
5. `Color` - RGBColor | HexColor | Ansi256Color | AnsiColor (raw color value, not theme key)
6. `TextStyles` - { color?, backgroundColor?, dim?, bold?, italic?, underline?, strikethrough?, inverse? }
7. Structured text styling properties
8. Used to style text without relying on ANSI string transforms
9. Colors are raw values - theme resolution happens at component layer
10. `Styles` - comprehensive styles type including textWrap, position, top/bottom/left/right, columnGap, rowGap, etc.
11. `textWrap` - wrap | wrap-trim | end | middle | truncate-end | truncate | truncate-middle | truncate-start
12. `position` - absolute | relative
13. `top`, `bottom`, `left`, `right` - number | `${number}%`
14. `columnGap`, `rowGap` - gap sizes
15. `LayoutAlign`, `LayoutDisplay`, `LayoutEdge`, `LayoutFlexDirection`, `LayoutGutter`, `LayoutJustify`, `LayoutNode`, `LayoutOverflow`, `LayoutPositionType`, `LayoutWrap` - layout types
16. `BorderStyle`, `BorderTextOptions` - border types

## Exports
- `RGBColor` - RGB color type
- `HexColor` - hex color type
- `Ansi256Color` - ANSI 256 color type
- `AnsiColor` - ANSI color type
- `Color` - color union type
- `TextStyles` - text styles type
- `Styles` - styles type
- (Layout and border types)
