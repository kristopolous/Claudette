## Purpose
Computes the diff between previous and next frame screen buffers and generates minimal terminal escape sequences to update the display.

## Imports
- **External**: `@alcalzone/ansi-tokenize`
- **Internal**: `utils/debug`, `ink/frame`, `ink/layout/geometry`, `ink/screen`, `ink/termio/csi`, `ink/termio/osc`

## Logic
Compares previous and next frame screens cell-by-cell to produce a minimal diff. Handles viewport resize detection (triggering full reset on shrink/grow), DECSTBM hardware scroll optimization when a scroll hint is present, and cursor movement using relative operations. Tracks style and hyperlink transitions to emit only changed SGR codes. Skips spacer cells, empty cells, and fg-only styled spaces matching the last rendered style. Uses a VirtualScreen to track cursor position and accumulate diff patches. Falls back to full reset (clear + full repaint) when changes occur in scrollback rows or the content shrinks below viewport height. Compensates for emoji width discrepancies on terminals with outdated wcwidth tables.

## Exports
- `LogUpdate` - class that diffs frames and produces terminal update operations
