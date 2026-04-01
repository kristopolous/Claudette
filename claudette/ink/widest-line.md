# ink/widest-line

## Purpose
Provides utility for finding widest line in a string.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink line-width-cache

## Logic
1. `widestLine` - finds widest line in string
2. Iterates through lines by finding \n characters
3. Uses lineWidth from line-width-cache for width calculation
4. Tracks maxWidth across all lines
5. Handles last line (no trailing newline)
6. `lineWidth` - gets cached line width

## Exports
- `widestLine` - finds widest line
