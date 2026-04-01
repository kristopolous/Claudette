## Purpose
Measures the width and height of text, accounting for line wrapping at a given maximum width.

## Imports
- **Internal**: `ink/line-width-cache`

## Logic
Iterates through text lines using indexOf to avoid array allocation from split. For each line, computes its width via the line width cache. Calculates height based on whether wrapping is needed: if no-wrap mode (maxWidth <= 0 or infinite), each line is one visual line; otherwise, height is the ceiling of line width divided by max width. Returns both the maximum width found and the total visual line count in a single pass.

## Exports
- `measureText` - computes width and height of text given a max width constraint
