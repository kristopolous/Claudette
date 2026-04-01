## Purpose
Renders a loading indicator for tool use operations with animated blinking and color-coded status.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `constants/figures` (BLACK_CIRCLE), `hooks/useBlink`, `ink` (Box, Text)

## Logic
Uses the useBlink hook to animate a black circle indicator when animation is enabled, coloring the text based on resolution state (dim for unresolved, error for errors, success for completed) and toggling between a filled circle and space character during blinking.

## Exports
- `ToolUseLoader` - displays an animated loading indicator with color-coded status for tool use operations
