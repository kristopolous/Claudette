# utils/ansiToPng

## Purpose
Renders ANSI-escaped terminal text directly to PNG image without SVG intermediate.

## Imports
- **Stdlib**: `zlib`
- **External**: (none)
- **Internal**: ink stringWidth, ansiToSvg types

## Logic
1. Skips SVG entirely - blits bitmap font directly to RGBA Uint8Array
2. Encodes result as PNG using node:zlib
3. Replaces resvg-wasm pipeline (2.36MB WASM, 2.1MB font, ~224ms render)
4. New path: ~5-15ms, zero external deps, identical output
5. `GLYPH_W` (24), `GLYPH_H` (48) - glyph cell size
6. `GLYPH_BYTES` - bytes per glyph (24*48)
7. `FONT_B64` - packed Fira Code Regular font (SIL OFL 1.1)
8. Format: [count:u16le][codepoint:u32le, alpha:GLYPH_BYTES]...
9. Covers printable ASCII plus unicode chars for /stats output
10. Regenerate font via: `scripts/generate-bitmap-font`
11. `DEFAULT_FG`, `DEFAULT_BG` - default foreground/background colors
12. `parseAnsi` - parses ANSI escape sequences
13. `ansiToPng` - converts parsed lines to PNG
14. PNG encoding with deflate compression

## Exports
- `GLYPH_W`, `GLYPH_H`, `GLYPH_BYTES` - glyph constants
- `FONT_B64` - base64-encoded font data
- `DEFAULT_FG`, `DEFAULT_BG` - default colors
- `ansiToPng` - converts ANSI text to PNG
