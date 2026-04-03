# exportRenderer

## Purpose
Renders conversation messages to ANSI or plain text for export, using the same UI components as the interactive UI but in headless/static mode.

## Imports
- **Stdlib**: REACT (React, useRef)
- **External**: `strip-ansi`
- **Internal**: ../components/Messages (Messages), ../keybindings/KeybindingContext (KeybindingProvider), ../keybindings/loadUserBindings (loadKeybindingsSyncWithWarnings), ../keybindings/types (KeybindingContextName), ../state/AppState (AppStateProvider), ../Tool (Tools), ../types/message (Message), ./staticRender (renderToAnsiString)

## Logic
1. `StaticKeybindingProvider` - minimal keybinding context for headless renders, avoids ChordInterceptor which would hang without stdin
2. `normalizedUpperBound` - calculates max NormalizedMessages a Message can produce (array content length, or 1)
3. `streamRenderedMessages` - renders messages in chunks (default 40) to reduce memory usage (-55% RSS vs full render). Each chunk renders with its own yoga layout tree sized to chunk height. Uses `renderRange` on Messages component. Stops when chunk produces empty output. Calls `onProgress` callback after each chunk.
4. `renderMessagesToPlainText` - convenience wrapper that strips ANSI codes from streamed output and joins into single string
5. Chunk ceiling calculation: chunkSize + sum of normalizedUpperBound for all messages ensures loop reaches empty slice

## Exports
- `streamRenderedMessages` - async generator-like function that renders messages in chunks, preserving ANSI codes, calls sink for each chunk
- `renderMessagesToPlainText` - async function that renders all messages to a single plain text string
