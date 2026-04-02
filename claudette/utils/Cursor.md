# Cursor

## Purpose
Provides cursor management for text input with Unicode/grapheme support, Vim-style word movements, kill ring (clipboard) for yank operations, and text wrapping/measuring for display.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: `../ink/stringWidth`, `../ink/wrapAnsi`, `./intl` (firstGrapheme, getGraphemeSegmenter, getWordSegmenter)

## Logic

### Kill Ring (Global State)
1. Module-level kill ring array (max 10 items) with index tracking
2. Consecutive kills accumulate into most recent entry
3. Non-kill action resets accumulation flag
4. Yank state tracks last yank position/length for yank-pop (Alt-Y)
5. Kill ring and yank state reset together via clearKillRing

### Vim Character Classification
6. VIM_WORD_CHAR_REGEX matches Unicode letters, digits, marks, underscore
7. WHITESPACE_REGEX matches whitespace
8. isVimWordChar/isVimWhitespace/isVimPunctuation helper functions

### Cursor Class
9. Immutable cursor with offset, selection, and measuredText reference
10. Offset clamped to [0, text.length]
11. Navigation: left/right (hops over [Image #N] chips), up/down, startOfLine, endOfLine
12. Logical line variants: startOfLogicalLine, endOfLogicalLine, upLogicalLine, downLogicalLine
13. Word movements: nextWord, prevWord, endOfWord (uses Intl.Segmenter)
14. Vim word movements: nextVimWord, prevVimWord, endOfVimWord (word chars vs punctuation)
15. WORD movements: nextWORD, prevWORD, endOfWORD (non-whitespace sequences)
16. Text modification: insert, del, backspace, modifyText, deleteToLineStart, deleteToLineEnd
17. deleteTokenBefore handles [Pasted text #N], [Image #N], [...Truncated text #N...] chips
18. findCharacter implements vim f/F/t/T character finding
19. render() handles cursor display with masking, ghost text, multi-line support
20. Viewport management: getViewportStartLine, getViewportCharOffset, getViewportCharEnd

### MeasuredText Class
21. Normalizes text to NFC, wraps to column width using wrapAnsi
22. Lazy wrappedLines computation and caching
23. Grapheme boundary detection with binary search for nextOffset/prevOffset
24. Word boundary caching via Intl.Segmenter
25. Position/offset conversion accounting for display width and leading whitespace
26. snapToGraphemeBoundary prevents landing mid-grapheme

### WrappedLine Class
27. Internal class tracking text, startOffset, isPrecededByNewline, endsWithNewline

## Exports
- `pushToKillRing(text, direction)` - add text to kill ring, accumulate if consecutive
- `getLastKill()` - get most recent kill ring entry
- `getKillRingItem(index)` - get kill ring item with normalized index
- `getKillRingSize()` - number of items in kill ring
- `clearKillRing()` - reset kill ring and yank state
- `resetKillAccumulation()` - reset consecutive kill tracking
- `recordYank(start, length)` - record yank position for yank-pop
- `canYankPop()` - check if yank-pop is valid
- `yankPop()` - cycle to next kill ring item, returns text/start/length or null
- `updateYankLength(length)` - update tracked yank length
- `resetYankState()` - reset yank tracking
- `VIM_WORD_CHAR_REGEX` - regex for Vim word characters
- `WHITESPACE_REGEX` - regex for whitespace
- `isVimWordChar(ch)` - test if char is Vim word char
- `isVimWhitespace(ch)` - test if char is whitespace
- `isVimPunctuation(ch)` - test if char is punctuation
- `Cursor` - immutable cursor class with navigation, editing, and rendering
- `MeasuredText` - text wrapper with wrapping, grapheme, and position tracking

## Source
`Cursor`
