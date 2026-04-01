# ink/screen

## Purpose
Provides screen buffer and cell management for terminal rendering.

## Imports
- **Stdlib**: (none)
- **External**: `@alcalzone/ansi-tokenize`
- **Internal**: ink layout/geometry, ink termio/ansi, ink warn

## Logic
1. `CharPool` - character string pool for memory efficiency
2. Shared across all screens
3. Interned char IDs valid across screens
4. blitRegion can copy IDs directly (no re-interning)
5. diffEach can compare IDs as integers (no string lookup)
6. Index 0 = space, 1 = empty (spacer)
7. `stringMap` - Map<string, number> for string to index mapping
8. `ascii` - Int32Array for ASCII fast-path (charCode → index, -1 = not interned)
9. `intern` - interns character, returns index
10. ASCII fast-path: direct array lookup instead of Map.get
11. `get` - gets string by index
12. `HyperlinkPool` - hyperlink string pool shared across all screens
13. Index 0 = no hyperlink
14. `INVERSE_CODE` - SGR 7 (inverse) as AnsiCode
15. endCode '\x1b[27m' flags VISIBLE_ON_SPACE
16. Bit 0 of resulting styleId set - renderer won't skip inverted spaces as invisible
17. `Point`, `Rectangle`, `Size`, `unionRect` - geometry types
18. `BEL`, `ESC`, `SEP` - ANSI constants
19. `ansiCodesToString`, `diffAnsiCodes` - ANSI utilities
20. `AnsiCode` - ANSI code type

## Exports
- `CharPool` - character pool class
- `HyperlinkPool` - hyperlink pool class
- `INVERSE_CODE` - inverse code constant
- (Screen buffer types and functions)
