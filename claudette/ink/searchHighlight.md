# ink/searchHighlight

## Purpose
Provides search highlight functionality for inverting cell styles on search matches.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: ink screen

## Logic
1. `applySearchHighlight` - highlights all visible occurrences of query in screen buffer
2. Inverts cell styles (SGR 7) for matches
3. Post-render, uses same damage-tracking machinery as applySelectionOverlay
4. Diff picks up highlighted cells as ordinary changes
5. LogUpdate stays pure diff engine
6. Case-insensitive search
7. Handles wide characters (CJK, emoji) by building col-of-char map per row
8. Nth character isn't at col N when wide chars present (each occupies 2 cells: head + SpacerTail)
9. ONLY inverts - no "current match" logic here
10. Yellow current-match overlay handled separately by applyPositionedHighlight
11. Returns true if any match highlighted (damage gate - caller forces full-frame damage when true)
12. Builds row text (lowercased) + code-unit→cell-index map
13. Skips SpacerTail (2nd cell of wide char), SpacerHead (end-of-line padding), noSelect (gutters)
14. Lowercasing per-char (not joined string) keeps codeUnitToCell positions in sync
15. U+0130 (Turkish İ) lowercases to 2 code units, so lowering joined string would desync
16. `CellWidth`, `cellAtIndex`, `Screen`, `StylePool`, `setCellStyleId` - screen types/functions

## Exports
- `applySearchHighlight` - applies search highlight to screen
