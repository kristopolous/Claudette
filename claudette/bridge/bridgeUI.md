# bridgeUI

## Purpose
Creates a bridge logger that renders real-time status UI including QR codes, session lists, tool activity, and connection state animations.

## Imports
- **Stdlib**: `process`
- **External**: STYLER, `qrcode`
- **Internal**: constants/figures, ink stringWidth, debug utils, bridgeStatusUtil, bridge types

## Logic
1. `createBridgeLogger` - factory that creates a stateful logger with status line tracking
2. Manages status state machine (idle → attached → titled → reconnecting → failed)
3. Generates QR codes for bridge connection URLs with lazy regeneration
4. Renders multi-session bullet list with per-session titles and activity
5. Implements shimmer animation for status text using STYLER terminal coloring
6. Handles tool activity display with 30s expiry timeout
7. Supports OSC8 hyperlink wrapping for terminal URLs
8. Clears/restores status lines around permanent log output
9. Counts visual terminal rows accounting for line wrapping and grapheme width

## Exports
- `createBridgeLogger` - factory function creating the bridge logger with full UI rendering
