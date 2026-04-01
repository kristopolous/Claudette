## Purpose
Declaratively sets the terminal tab/window title.

## Imports
- **Stdlib**: none
- **External**: `react` (useContext, useEffect), `strip-ansi`
- **Internal**: `termio/osc`, `useTerminalNotification`

## Logic
Strips ANSI escape sequences from the title string. On Windows, sets `process.title` directly since classic conhost does not support OSC sequences. On other platforms, writes an OSC 0 sequence (set title and icon) via Ink's terminal write context. Becomes a no-op when title is null.

## Exports
- `useTerminalTitle` - sets the terminal window/tab title to the given string, or does nothing when passed null
