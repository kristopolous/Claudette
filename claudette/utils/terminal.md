# terminal

## Purpose
Text rendering utilities for terminal display: wrapping, truncation, and ANSI-aware slicing.

## Imports
- **External**: chalk
- **Internal**: ../components/CtrlOToExpand, ../ink/stringWidth, ./sliceAnsi

## Logic
Wraps text at a given visible-character width using ANSI-aware slicing (preserves escape sequences). Truncates to MAX_LINES_TO_SHOW (3) lines with a "... +N lines (ctrl+o to expand)" hint. Includes a fast pre-truncation for huge outputs (caps wrapping to `MAX_LINES_TO_SHOW * wrapWidth * 4` chars) to avoid O(n) processing on binary dumps. `isOutputLineTruncated` is a fast check counting raw newlines (ignores terminal-width wrapping).

## Exports
- `renderTruncatedContent` - `(content, terminalWidth, suppressExpandHint?) => string`. Wraps, truncates to 3 lines, appends dimmed expand hint. Pre-truncates huge content to avoid performance issues.
- `isOutputLineTruncated` - `(content) => boolean`. Fast check: returns true if content has more than MAX_LINES_TO_SHOW newlines (ignoring trailing newline). May return false for single very-long lines that wrap visually.

## Source
`terminal`
