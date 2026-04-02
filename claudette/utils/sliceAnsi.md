# sliceAnsi

## Purpose
Slices a string containing ANSI escape codes by display cell position (not code units). Properly handles OSC 8 hyperlink sequences via @alcalzone/ansi-tokenize.

## Imports
- **External**: @alcalzone/ansi-tokenize (AnsiCode, ansiCodesToString, reduceAnsiCodes, tokenize, undoAnsiCodes)
- **Internal**: ../ink/stringWidth

## Logic
1. `isEndCode(code)` - returns true if code.code === code.endCode (e.g., hyperlink close)
2. `filterStartCodes(codes)` - filters to only include start codes (not end codes)
3. `sliceAnsi(str, start, end?)` - main export:
   - Tokenizes the full string via `tokenize()` (does NOT pass `end` to tokenize — it counts code units, not display cells)
   - Tracks `activeCodes` (ANSI codes encountered) and `position` (display cell position via `stringWidth`)
   - For ANSI tokens: width=0, accumulate into activeCodes, emit into result if within slice range
   - For text tokens: advance position by display width (fullWidth=2, else stringWidth). Combining marks (Devanagari matras, virama, diacritics) are width 0
   - Break logic: when `position >= end`, break after trailing zero-width marks (combining marks must attach to preceding base char). ANSI codes past end are excluded (they'd open new style runs that leak into undo sequence)
   - When entering slice range (`position >= start`): skip leading zero-width marks at start boundary (they belong to preceding base char in left half), reduce and filter activeCodes to start codes, prepend them to result
   - After loop: undo any still-active start codes to close style runs
   - Default export (not named export)

## Exports
- `sliceAnsi` (default export) - slices an ANSI string by display cell position, preserving style codes

## Source
`sliceAnsi`
