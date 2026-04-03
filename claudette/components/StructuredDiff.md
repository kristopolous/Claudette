## Purpose
Renders a syntax-highlighted diff view with an aggressive caching strategy to avoid re-computation on remount.

## Imports
- **Stdlib**: None
- **External**: `diff`, REACT, REACT_COMPILER
- **Internal**: `hooks/useSettings`, ink` (Box, NoSelect, RawAnsi, useTheme), utils/fullscreen`, `utils/sliceAnsi`, `StructuredDiff/colorDiff`, `StructuredDiff/Fallback`

## Logic
Uses a WeakMap-based render cache keyed by patch hunk to store pre-computed syntax-highlighted diff output and pre-split gutter/content columns. Computes gutter width based on line number digits. Falls back to StructuredDiffFallback when the native color diff module is unavailable or rendering fails. In fullscreen mode, splits output into side-by-side gutter and content columns using RawAnsi for zero-overhead ANSI rendering.

## Exports
- `StructuredDiff` - Memoized UI component that renders a cached, syntax-highlighted diff with optional split gutter layout
