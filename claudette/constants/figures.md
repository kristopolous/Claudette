## Purpose
Provides Unicode character constants used as visual indicators and glyphs throughout the terminal UI.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `utils/env`

## Logic
Exports platform-aware and static Unicode characters for UI elements including bullets, arrows, effort indicators, media controls, MCP subscription markers, review status diamonds, blockquote bars, and bridge connection status indicators.

## Exports
- `BLACK_CIRCLE` - platform-dependent circle glyph for alignment
- `BULLET_OPERATOR` - bullet point operator
- `TEARDROP_ASTERISK` - decorative asterisk glyph
- `UP_ARROW` - upward arrow for merge notices
- `DOWN_ARROW` - downward arrow for scroll hints
- `LIGHTNING_BOLT` - fast mode indicator
- `EFFORT_LOW` - low effort level indicator
- `EFFORT_MEDIUM` - medium effort level indicator
- `EFFORT_HIGH` - high effort level indicator
- `EFFORT_MAX` - max effort level indicator
- `PLAY_ICON` - play/media trigger icon
- `PAUSE_ICON` - pause/media icon
- `REFRESH_ARROW` - resource update indicator
- `CHANNEL_ARROW` - inbound channel message indicator
- `INJECTED_ARROW` - cross-session injected message indicator
- `FORK_GLYPH` - fork directive indicator
- `DIAMOND_OPEN` - review running status
- `DIAMOND_FILLED` - review completed/failed status
- `REFERENCE_MARK` - away-summary recap marker
- `FLAG_ICON` - issue flag banner
- `BLOCKQUOTE_BAR` - blockquote line prefix
- `HEAVY_HORIZONTAL` - heavy box-drawing horizontal line
- `BRIDGE_SPINNER_FRAMES` - array of bridge connection spinner frames
- `BRIDGE_READY_INDICATOR` - bridge ready checkmark
- `BRIDGE_FAILED_INDICATOR` - bridge failure cross
