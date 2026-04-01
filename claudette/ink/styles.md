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
10. `Styles` - comprehensive styles type including:
    - textWrap: wrap | wrap-trim | end | middle | truncate-end | truncate | truncate-middle | truncate-start
    - position: absolute | relative
    - top, bottom, left, right: number | `${number}%`
    - columnGap, rowGap, gap: number
    - margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight: number
    - padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight: number
    - flexGrow, flexShrink: number
    - flexDirection: row | column | row-reverse | column-reverse
    - flexBasis: number | string
    - flexWrap: nowrap | wrap | wrap-reverse
    - alignItems: flex-start | center | flex-end | stretch
    - alignSelf: flex-start | center | flex-end | auto
    - justifyContent: flex-start | flex-end | space-between | space-around | space-evenly | center
    - width, height: number | string
    - minWidth, minHeight, maxWidth, maxHeight: number | string
    - display: flex | none
    - borderStyle: BorderStyle
    - borderTop, borderBottom, borderLeft, borderRight: boolean
    - borderColor, borderTopColor, borderBottomColor, borderLeftColor, borderRightColor: Color
    - borderDimColor, borderTopDimColor, borderBottomDimColor, borderLeftDimColor, borderRightDimColor: boolean
    - borderText: BorderTextOptions
    - backgroundColor: Color
    - opaque: boolean (fills interior with spaces without SGR)
    - overflow, overflowX, overflowY: visible | hidden | scroll
    - noSelect: boolean | 'from-left-edge'
11. `LayoutAlign`, `LayoutDisplay`, `LayoutEdge`, `LayoutFlexDirection`, `LayoutGutter`, `LayoutJustify`, `LayoutNode`, `LayoutOverflow`, `LayoutPositionType`, `LayoutWrap` - layout types
12. `BorderStyle`, `BorderTextOptions` - border types
13. `applyPositionStyles`, `applyOverflowStyles`, `applyMarginStyles`, `applyPaddingStyles`, `applyFlexStyles` - style application functions

## Exports
- `RGBColor` - RGB color type
- `HexColor` - hex color type
- `Ansi256Color` - ANSI 256 color type
- `AnsiColor` - ANSI color type
- `Color` - color union type
- `TextStyles` - text styles type
- `Styles` - styles type
- (Layout and border types)
