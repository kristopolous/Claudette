## Purpose
Declaratively sets the tab-status indicator with a colored dot and status text in the tab sidebar.

## Imports
- **Stdlib**: none
- **External**: REACT (useContext, useEffect, useRef)
- **Internal**: `termio/osc`, `termio/types`

## Logic
Maps a status kind (idle, busy, waiting) to preset RGB colors and status strings. On kind changes, emits an OSC 21337 sequence wrapped for tmux/screen passthrough. When transitioning from a non-null kind to null, emits a clear sequence to remove the stale indicator. Silently discarded by terminals that do not support OSC 21337.

## Exports
- `useTabStatus` - sets the tab sidebar indicator to idle, busy, or waiting, or clears it when passed null
