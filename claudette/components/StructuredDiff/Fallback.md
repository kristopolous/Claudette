## Purpose
Provides a word-level diff rendering fallback when the native syntax highlighting module is unavailable.

## Imports
- **Stdlib**: None
- **External**: `diff`, REACT, REACT_COMPILER
- **Internal**: `utils/theme`, `ink/stringWidth`, `ink` (Box, NoSelect, Text, useTheme, wrapText)

## Logic
Transforms patch lines into typed objects (add/remove/nochange), groups adjacent add/remove pairs for word-level diffing, calculates word diffs between paired lines, and renders with background color highlighting. Falls back to line-level rendering when changes exceed a threshold or word diffing is not applicable. Manually wraps text to fit terminal width with proper padding and alignment.

## Exports
- `StructuredDiffFallback` - UI component that renders diff output with word-level highlighting
- `LineObject` - Type definition for internal line representation
- `transformLinesToObjects` - Converts raw diff lines into typed line objects
- `processAdjacentLines` - Groups adjacent add/remove lines and marks them for word-level diffing
- `calculateWordDiffs` - Computes word-level differences between two text strings
- `numberDiffLines` - Assigns line numbers to diff lines with correct incrementing for add/remove types
