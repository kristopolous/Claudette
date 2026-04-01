# utils/ansiToSvg

## Purpose
Converts ANSI-escaped terminal text to SVG format with color support.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: xml

## Logic
1. `AnsiColor` - { r, g, b } color type
2. `ANSI_COLORS` - default terminal color palette (30-37, 90-97)
3. Includes bright colors (90-97)
4. `DEFAULT_FG` (light gray), `DEFAULT_BG` (dark gray)
5. `TextSpan` - { text, color, bold }
6. `ParsedLine` - array of TextSpan
7. `parseAnsi` - parses ANSI escape sequences
8. Supports: basic colors (30-37, 90-97), 256-color (38;5;n), 24-bit true color (38;2;r;g;b)
9. Splits on newlines, processes each line
10. Parses escape sequences (\x1b[...m)
11. Handles bold, color codes, resets
12. `ansiToSvg` - converts parsed lines to SVG
13. `ansiToPng` - converts to PNG format
14. `escapeXml` - escapes XML special characters

## Exports
- `AnsiColor` - color type
- `ANSI_COLORS` - color palette
- `DEFAULT_FG`, `DEFAULT_BG` - default colors
- `TextSpan` - text span type
- `ParsedLine` - parsed line type
- `parseAnsi` - parses ANSI text
- `ansiToSvg` - converts to SVG
- `ansiToPng` - converts to PNG
