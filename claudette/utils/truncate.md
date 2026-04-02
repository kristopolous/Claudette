# utils/truncate

## Purpose
Width-aware truncation and wrapping utilities for terminal display. Uses `stringWidth()` for correct CJK/emoji measurement and `getGraphemeSegmenter()` for grapheme-boundary-safe splitting.

## Imports
- **Internal**: `../ink/stringWidth`, `./intl`

## Logic
1. `truncatePathMiddle` — truncates file paths in the middle to preserve both directory context and filename. Format: `directory/…/filename`. If filename alone exceeds maxWidth, falls back to `truncateStartToWidth`.
2. `truncateToWidth` — truncates from the start, appends `…`. Iterates grapheme segments and stops when adding the next segment would exceed `maxWidth - 1` (room for ellipsis).
3. `truncateStartToWidth` — truncates from the start, keeps the tail, prepends `…`. Iterates grapheme segments in reverse.
4. `truncateToWidthNoEllipsis` — truncates without adding ellipsis. Used when the caller adds its own separator (e.g. middle-truncation).
5. `truncate` — general-purpose truncation with optional `singleLine` mode that cuts at the first newline.
6. `wrapText` — splits text into an array of lines, each fitting within the specified width. Wraps at grapheme boundaries.

## Exports
- `truncatePathMiddle(path, maxLength)` — truncates path in middle, preserving directory and filename
- `truncateToWidth(text, maxWidth)` — truncates from start with ellipsis
- `truncateStartToWidth(text, maxWidth)` — truncates from start, keeps tail, prepends ellipsis
- `truncateToWidthNoEllipsis(text, maxWidth)` — truncates without ellipsis
- `truncate(str, maxWidth, singleLine?)` — general truncation with optional newline handling
- `wrapText(text, width)` — wraps text into an array of width-limited lines
