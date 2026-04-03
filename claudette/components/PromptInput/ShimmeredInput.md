## Purpose
Renders text input with syntax highlighting and shimmer animation support for special keywords like ultrathink and ultraplan.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink`, `utils/textHighlighting`, `Spinner/ShimmerChar`

## Logic
1. Segments text by highlights and splits into lines based on newline characters
2. Detects shimmer highlights by checking for shimmerColor property
3. Calculates sweep start and cycle length from the range of shimmer highlights with 10-character padding
4. Uses animation frame at 50ms intervals to drive the shimmer animation
5. Computes glimmer index from elapsed time modulo cycle length
6. Renders each character in shimmer-highlighted segments as a ShimmerChar with color interpolation
7. Renders non-shimmer segments with standard Text styling including color, dimColor, and inverse properties
8. Preserves ANSI escape sequences using the Ansi component

## Exports
- `HighlightedInput` - component that renders highlighted text with shimmer animation support
