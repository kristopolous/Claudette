## Purpose
Renders a visual progress bar using Unicode block characters to represent a ratio between 0 and 1.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `Text`, `Theme`

## Logic
Clamps the input ratio to [0, 1], calculates whole filled characters and a fractional middle character using the BLOCKS array of Unicode block segments, then fills remaining space with empty characters. Renders the combined string with fill and empty colors.

## Exports
- `ProgressBar` - renders a character-width progress bar with configurable fill and empty colors
