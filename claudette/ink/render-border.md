# ink/render-border

## Purpose
Provides border rendering utilities for Ink components.

## Imports
- **Stdlib**: (none)
- **External**: `chalk`, `cli-boxes`
- **Internal**: ink colorize, ink dom, ink output, ink stringWidth, ink styles

## Logic
1. `BorderTextOptions` - { content, position, align, offset? }
2. `content` - pre-rendered string with ANSI color codes
3. `position` - 'top' | 'bottom'
4. `align` - 'start' | 'end' | 'center'
5. `offset` - number of characters from edge (only for start/end alignment)
6. `CUSTOM_BORDER_STYLES` - custom border styles (dashed)
7. Uses line-drawing characters where available, spaces for corners
8. `BorderStyle` - keyof Boxes | keyof CUSTOM_BORDER_STYLES | BoxStyle
9. `embedTextInBorder` - embeds text in border line
10. Calculates textLength and borderLength
11. Returns empty if textLength >= borderLength - 2
12. For center: position = floor((borderLength - textLength) / 2)
13. For start: position = offset + 1 (account for corner)
14. For end: position = borderLength - textLength - offset - 1
15. Ensures position is valid (max 1, min borderLength - textLength - 1)
16. Returns [before, text, after] tuple
17. `styleBorderLine` - styles border line with color and dim
18. Uses applyColor for color, chalk.dim for dim
19. `chalk` - chalk library
20. `cliBoxes`, `Boxes`, `BoxStyle` - cli-boxes types
21. `applyColor` - applies color to string
22. `DOMNode` - DOM node type
23. `Output` - output type
24. `stringWidth` - gets string width
25. `Color` - color type

## Exports
- `BorderTextOptions` - border text options type
- `CUSTOM_BORDER_STYLES` - custom border styles
- `BorderStyle` - border style type
- `embedTextInBorder` - embeds text in border
- `styleBorderLine` - styles border line
