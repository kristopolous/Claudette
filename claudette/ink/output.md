## Purpose
Collects write, blit, clear, clip, and shift operations from the render tree and applies them to a screen buffer for diffing against the previous frame.

## Imports
- **External**: `@alcalzone/ansi-tokenize`
- **Internal**: `utils/debug`, `utils/intl`, `utils/sliceAnsi`, `ink/bidi`, `ink/layout/geometry`, `ink/screen`, `ink/stringWidth`, `ink/widest-line`

## Logic
Maintains a list of operations (write, clip, unclip, blit, clear, noSelect, shift) collected during rendering. In the `get()` method, applies operations in multiple passes: first expanding damage for clear regions, then processing blits with clip intersection and absolute clear exclusion, applying row shifts, and writing styled text with grapheme clustering, bidi reordering, and tab expansion. Caches parsed character clusters by line to avoid redundant tokenization. Handles wide characters, spacer cells, C0 control characters, and escape sequences. Returns the final screen buffer ready for diffing.

## Exports
- `Operation` - union type of all operation types
- `Clip` - type describing a clipping region with optional bounds
- `Output` - class that collects and applies render operations to a screen buffer
