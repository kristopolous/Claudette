# ink/output

## Purpose
Collects write, blit, clear, clip, and shift operations from render tree and applies them to screen buffer for diffing.

## Imports
- **Stdlib**: (none)
- **External**: `@alcalzone/ansi-tokenize`
- **Internal**: utils debug/intl/sliceAnsi, ink bidi, ink layout/geometry, ink screen, ink stringWidth, ink widest-line

## Logic
1. `ClusteredChar` - { value, width, styleId, hyperlink }
2. Grapheme cluster with precomputed terminal width, styleId, hyperlink
3. Built once per unique line (cached via charCache)
4. styleId safe to cache: StylePool is session-lived (never reset)
5. hyperlink stored as string (not interned ID) since hyperlinkPool resets every 5 min
6. `Options` - { width, height, stylePool, screen }
7. `Operation` - union of WriteOperation | ClipOperation | UnclipOperation | BlitOperation | ClearOperation | NoSelectOperation | ShiftOperation
8. `WriteOperation` - { type: 'write', x, y, text, softWrap? }
9. softWrap: per-line soft-wrap flags, parallel to text.split('\n')
10. `ClipOperation` - { type: 'clip', clip }
11. `Clip` - { x1?, x2?, y1?, y2? }
12. `UnclipOperation` - { type: 'unclip' }
13. `BlitOperation` - { type: 'blit', src, x, y, width, height }
14. `ShiftOperation` - { type: 'shift', top, bottom, n }
15. `ClearOperation` - { type: 'clear', region, fromAbsolute? }
16. fromAbsolute: set when clear is for absolute-positioned node's old bounds
17. `NoSelectOperation` - { type: 'noSelect', region }
18. `intersectClip` - intersects two clips
19. `maxDefined`, `minDefined` - helper functions for clip intersection
20. `Output` class - collects and applies render operations
21. `width`, `height` - dimensions
22. `stylePool` - style pool
23. `screen` - screen buffer
24. `operations` - operation list
25. `charCache` - Map<string, ClusteredChar[]> for caching parsed character clusters
26. `reset` - reuses Output for new frame, zeroes screen, clears operations, caps charCache growth
27. `get()` - applies operations in multiple passes
28. Expands damage for clear regions
29. Processes blits with clip intersection and absolute clear exclusion
30. Applies row shifts
31. Writes styled text with grapheme clustering, bidi reordering, tab expansion
32. Caches parsed character clusters by line to avoid redundant tokenization
33. Handles wide characters, spacer cells, C0 control characters, escape sequences
34. `AnsiCode`, `StyledChar`, `styledCharsFromTokens`, `tokenize` - ANSI tokenize functions
35. `getGraphemeSegmenter` - gets grapheme segmenter
36. `sliceAnsi` - ANSI-aware slice
37. `reorderBidi` - bidi reordering
38. `Rectangle`, `unionRect` - geometry types
39. `blitRegion`, `CellWidth`, `extractHyperlinkFromStyles`, `filterOutHyperlinkStyles`, `markNoSelectRegion`, `OSC8_PREFIX`, `resetScreen`, `Screen`, `StylePool`, `setCellAt`, `shiftRows` - screen functions/types
40. `stringWidth` - gets string width
41. `widestLine` - gets widest line

## Exports
- `ClusteredChar` - clustered char type
- `Options` - options type
- `Operation` - operation union type
- `WriteOperation`, `ClipOperation`, `UnclipOperation`, `BlitOperation`, `ClearOperation`, `NoSelectOperation`, `ShiftOperation` - operation types
- `Clip` - clip type
- `intersectClip` - intersects clips
- `Output` - output class
