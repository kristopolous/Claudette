## Purpose
Provides a Text component for rendering styled text with support for color, formatting, and text wrapping/truncation options.

## Imports
- **Stdlib**: None specified
- **External**: React from 'REACT'; React compiler runtime
- **Internal**: Color, Styles, TextStyles from ../styles

## Logic
1. **BaseProps Type**: Defines optional properties for text styling:
   - color?: Color - Text color (accepts rgb, hex, ansi values)
   - backgroundColor?: Color - Background color
   - italic?: boolean - Makes text italic
   - underline?: boolean - Underlines text
   - strikethrough?: boolean - Adds strikethrough line
   - inverse?: boolean - Swaps foreground and background colors
   - wrap?: Styles['textWrap'] - Controls text wrapping/truncation behavior
   - children?: ReactNode - Content to render

2. **WeightProps Type**: Ensures bold and dim are mutually exclusive (terminal limitation):
   - Either { bold: boolean; dim?: never } or { dim: boolean; bold?: never } or { bold?: never; dim?: never }

3. **Props Type**: Combines BaseProps and WeightProps for complete component API

4. **memoizedStylesForWrap**: Pre-computed style objects for different wrap modes:
   - All styles set flexGrow: 0, flexShrink: 1, flexDirection: 'row'
   - Differ only in textWrap value: wrap, wrap-trim, end, middle, truncate, truncate-start, truncate-middle, truncate-end

5. **Text Component Implementation**:
   - Returns null if children is undefined or null
   - Uses REACT_COMPILER runtime (_c) for optimized rendering
   - Processes all style props (color, backgroundColor, bold, dim, italic, underline, strikethrough, inverse)
   - Defaults wrap to "wrap" if not provided
   - Combines text style props into textStyles object
   - Retrieves pre-computed wrap styles from memoizedStylesForWrap
   - Renders ink-text element with combined styles and children

6. **Wrap Modes Behavior**:
   - wrap: Wraps text to multiple lines when exceeding container width
   - wrap-trim: Wraps and trims trailing whitespace
   - end/middle/truncate-*: Truncates text to fit container with various strategies
   - Specific truncate modes control where ellipsis appears (start/middle/end)

## Exports
- `BaseProps` - Base properties for text styling
- `WeightProps` - Mutually exclusive bold/dim properties
- `Props` - Complete props type for Text component
- `memoizedStylesForWrap` - Pre-computed styles for wrap modes
- `Text` - Default exported component for rendering styled text