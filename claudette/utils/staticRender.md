# staticRender

## Purpose
Workaround for Ink not supporting multiple `<Static>` components. Renders React nodes to ANSI or plain text strings by rendering to a non-TTY stream and capturing output.

## Imports
- **Stdlib**: stream (PassThrough)
- **External**: REACT/compiler-runtime, REACT, strip-ansi
- **Internal**: ../ink (render, useApp)

## Logic
1. `RenderOnceAndExit` - wrapper component that exits after rendering:
   - Uses `useLayoutEffect` to schedule `exit()` after React's commit phase completes
   - More robust than `process.nextTick()` for React 19's async render cycle
   - Compiled with REACT_COMPILER (`_c` memoization)
2. `SYNC_START` / `SYNC_END` - DEC synchronized update markers (`\x1B[?2026h` / `\x1B[?2026l`) used by terminals
3. `extractFirstFrame(output)` - extracts content from the first complete frame in Ink's output:
   - Ink with non-TTY stdout outputs multiple frames, each wrapped in DEC sync sequences
   - Finds first `SYNC_START`...`SYNC_END` pair and returns the content between them
   - Returns full output if markers not found
4. `renderToAnsiString(node, columns?)` - renders a React node to a string with ANSI escape codes:
   - Creates a `PassThrough` stream to capture output
   - If `columns` provided, sets `stream.columns` so Ink picks up the chosen width instead of defaulting to 80
   - Renders node wrapped in `RenderOnceAndExit` with non-TTY stdout (gives full-frame output instead of diffs)
   - Waits for instance to exit, then extracts first frame
5. `renderToString(node, columns?)` - renders to plain text by calling `renderToAnsiString` then stripping ANSI codes via `stripAnsi`

## Exports
- `renderToAnsiString` - async function that renders a React node to an ANSI string
- `renderToString` - async function that renders a React node to a plain text string (ANSI stripped)

## Source
`staticRender`
