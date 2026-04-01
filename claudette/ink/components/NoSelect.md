# ink/components/NoSelect

## Purpose
Provides NoSelect component for marking contents as non-selectable in fullscreen text selection.

## Imports
- **Stdlib**: (none)
- **External**: `react`, `react/compiler-runtime`
- **Internal**: ink components Box

## Logic
1. `Props` - Omit<BoxProps, 'noSelect'> & { fromLeftEdge?: boolean }
2. `fromLeftEdge` - extends exclusion zone from column 0 to box's right edge for every row
3. Use for gutters rendered inside wider indented container (e.g. diff inside tool message row)
4. Without this, multi-row drag picks up container's leading indent on rows below prefix
5. Default: false
6. `NoSelect` - marks contents as non-selectable in fullscreen text selection
7. Cells inside box skipped by both selection highlight and copied text
8. Gutter stays visually unchanged while user drags, making clear what will be copied
9. Use to fence off gutters (line numbers, diff +/- sigils, list bullets)
10. So click-drag over rendered code yields clean pasteable content
11. Only affects alt-screen text selection (<AlternateScreen> with mouse tracking)
12. No-op in main-screen scrollback render where terminal's native selection used
13. Uses React compiler runtime (_c) for memoization
14. Renders <Box {...boxProps} noSelect={fromLeftEdge ? "from-left-edge" : true}>{children}</Box>
15. `PropsWithChildren` - React props type
16. `Box`, `BoxProps` - Box component and props

## Exports
- `Props` - no select props type
- `NoSelect` - no select component
