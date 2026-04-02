# textHighlighting

## Purpose
Segments text by character-range highlights while preserving ANSI escape codes, for syntax highlighting and text decoration in terminal output.

## Imports
- **External**: @alcalzone/ansi-tokenize (AnsiCode, Token, tokenize, reduceAnsiCodes, ansiCodesToString, undoAnsiCodes)
- **Internal**: ./theme

## Logic
Two-phase process:
1. **Overlap resolution**: Sorts highlights by start position (then priority descending), removes overlapping ranges (first wins).
2. **Segmentation**: `HighlightSegmenter` tokenizes text with `@alcalzone/ansi-tokenize`, then walks tokens using two position systems — "visible" (excluding ANSI codes) and "string" (raw positions including ANSI codes). For each segment, it preserves leading ANSI codes as prefix and trailing codes as suffix, reconstructing valid ANSI sequences around each text slice.

## Exports
- `TextHighlight` - `{ start, end, color?, dimColor?, inverse?, shimmerColor?, priority }`. Character-range highlight with optional styling and priority for overlap resolution.
- `TextSegment` - `{ text, start, highlight? }`. A segment of text with its original visible-position start and optional associated highlight.
- `segmentTextByHighlights` - `(text, highlights) => TextSegment[]`. Main entry point. Resolves overlaps, then segments text preserving ANSI codes. Returns plain segments for non-highlighted regions and attributed segments for highlighted regions.

## Source
`textHighlighting`
