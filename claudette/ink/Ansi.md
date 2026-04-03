# ink/Ansi

## Purpose
UI component that parses ANSI escape codes and renders them as styled Text/Link components. Serves as an escape hatch for rendering pre-formatted ANSI strings from external tools (like cli-highlight) in Ink.

## Imports
- **Stdlib**: none
- **External**: REACT — `React.memo`
- **Internal**: `./components/Link.js`, `./components/Text.js`, `./styles.js` (Color type), `./termio.js` (NamedColor, Parser, Color as TermioColor, TextStyle)

## Logic
1. `Ansi` component is memoized via `memoization` to prevent re-renders when parent changes but children string is the same
2. If children is not a string, wraps it in Text (with dim if dimColor prop is true)
3. If children is empty string, returns null
4. Parses the ANSI string via `parseToSpans()` using the termio `Parser` to extract styled text segments
5. Handles hyperlink OSC sequences by tracking currentHyperlink state across actions
6. Merges adjacent spans with identical props to reduce DOM nodes
7. Each span is rendered as either a `Link` (if it has a hyperlink) wrapping `StyledText`, or `StyledText` directly, or plain text if no styling
8. `dimColor` prop forces all text to render with dim styling
9. `StyledText` handles bold/dim mutual exclusivity — dim takes priority over bold
10. Color conversion: termio's Color type (named, indexed, rgb, default) is mapped to Ink string format (`ansi:colorName`, `ansi256(n)`, `rgb(r,g,b)`)
11. Named colors are mapped via `NAMED_COLOR_MAP` (16 colors including bright variants)

## Exports
- `Ansi` — memoized UI component with props `{ children: string, dimColor?: boolean }`

### Internal (not exported)
- `parseToSpans(input: string): Span[]` — parses ANSI string into styled text spans using termio Parser
- `textStyleToSpanProps(style: TextStyle): SpanProps` — converts termio TextStyle to SpanProps
- `colorToString(color: TermioColor): Color | undefined` — converts termio Color to Ink string format
- `propsEqual(a: SpanProps, b: SpanProps): boolean` — compares two SpanProps for span merging
- `hasAnyProps(props: SpanProps): boolean` — checks if span has any styling
- `hasAnyTextProps(props: SpanProps): boolean` — checks if span has any text styling (excludes hyperlink)
- `StyledText` — internal wrapper component that handles bold/dim mutual exclusivity
- `NAMED_COLOR_MAP` — maps 16 termio named colors to ansi: format strings
- Types: `Props`, `SpanProps`, `Span`, `BaseTextStyleProps`
