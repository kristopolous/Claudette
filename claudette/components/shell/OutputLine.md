# components/shell/OutputLine

## Purpose
Provides output line component for rendering shell output with JSON formatting and URL linkification.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: hooks useTerminalSize, ink, hyperlink, JSON utils, terminal, MessageResponse, messageActions, shell ExpandShellOutputContext

## Logic
1. `tryFormatJson` - tries to format JSON line
2. Parses line via jsonParse, stringifies via jsonStringify
3. Checks for precision loss during JSON round-trip (large integers exceed Number.MAX_SAFE_INTEGER)
4. Normalizes both strings by removing whitespace and unnecessary escapes (\/)
5. Returns original line if precision loss detected, else pretty-printed JSON
6. `MAX_JSON_FORMAT_LENGTH` (10,000) - max length for JSON formatting
7. `tryJsonFormatContent` - tries to JSON format content
8. Returns content if exceeds max length
9. Splits content into lines, maps tryFormatJson, joins
10. `URL_IN_JSON` - regex for http(s) URLs inside JSON string values
11. Conservative: no quotes, no whitespace, no trailing comma/brace
12. `linkifyUrlsInText` - linkifies URLs in text
13. Replaces URLs via createHyperlink
14. `OutputLine` - UI component for output line
15. Uses useTerminalSize for columns
16. Uses useExpandShellOutput for expand state
17. Uses useContext(InVirtualListContext) for virtual list state
18. shouldShowFull = verbose || expandShellOutput
19. Formats content via tryJsonFormatContent
20. Linkifies URLs if linkifyUrls enabled
21. Shows full content if shouldShowFull, else truncated via renderTruncatedContent
22. Strips underline ANSI codes
23. `jsonParse`, `jsonStringify` - JSON utilities
24. `createHyperlink` - creates hyperlink
25. `renderTruncatedContent` - renders truncated content
26. `useTerminalSize` - gets terminal size
27. `useExpandShellOutput` - gets expand shell output state
28. `InVirtualListContext` - virtual list context
29. `MessageResponse` - message response component
30. `Ansi`, `Text` - ink components

## Exports
- `tryFormatJson` - tries to format JSON
- `tryJsonFormatContent` - tries to JSON format content
- `linkifyUrlsInText` - linkifies URLs
- `OutputLine` - output line component
- `stripUnderlineAnsi` - strips underline ANSI codes
