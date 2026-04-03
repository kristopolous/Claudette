# ink/components/RawAnsi

## Purpose
Provides RawAnsi component for bypassing ANSI roundtrip for terminal-ready content.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: (none)

## Logic
1. `Props` - { lines: string[], width: number }
2. `lines` - pre-rendered ANSI lines, each element must be exactly one terminal row
3. Already wrapped to width by producer with ANSI escape codes inline
4. `width` - column width the producer wrapped to, sent to Yoga as fixed leaf width
5. `RawAnsi` - bypasses <Ansi> → React tree → Yoga → squash → re-serialize roundtrip
6. For content already terminal-ready
7. Use when external renderer (e.g. ColorDiff NAPI module) produced ANSI-escaped, width-wrapped output
8. Normal <Ansi> mount reparses output into one React <Text> per style span
9. Lays out each span as Yoga flex child, walks tree to re-emit same escape codes
10. For long transcript with syntax-highlighted diffs, roundtrip is dominant render cost
11. Emits single Yoga leaf with constant-time measure func (width × lines.length)
12. Hands joined string straight to output.write()
13. output.write() already splits on '\n' and parses ANSI into screen buffer
14. Returns null if lines.length === 0
15. Renders <ink-raw-ansi rawText={lines.join('\n')} rawWidth={width} rawHeight={lines.length} />
16. `React` - React library
17. `useMemo` - React memoization hook

## Exports
- `Props` - props type
- `RawAnsi` - raw ANSI component
