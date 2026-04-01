## Purpose
Renders syntax-highlighted code blocks with optional line gutter, width measurement, and fallback for when highlighting is unavailable.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `hooks/useSettings`, `ink`, `utils/fullscreen`, `utils/sliceAnsi`, `utils/stringUtils`, `components/HighlightedCode/Fallback`, `components/StructuredDiff/colorDiff`

## Logic
1. Measures the container width when not explicitly provided
2. Checks settings to determine if syntax highlighting is disabled
3. Uses a ColorFile renderer to produce highlighted lines when available
4. Calculates gutter width for line numbers in fullscreen mode
5. Renders each line with an optional gutter using ANSI slicing, or falls back to a non-highlighted display

## Exports
- `HighlightedCode` - memoized React component that renders syntax-highlighted code with configurable width, dimming, and gutter support
