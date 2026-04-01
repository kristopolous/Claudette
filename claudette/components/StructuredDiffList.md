## Purpose
Renders a list of diff hunks with ellipsis separators between them for displaying structured patches.

## Imports
- **Stdlib**: none
- **External**: `diff` (StructuredPatchHunk type), `react`
- **Internal**: `ink` (Box, NoSelect, Text), `utils/array` (intersperse), `components/StructuredDiff`

## Logic
Maps each patch hunk to a StructuredDiff component wrapped in a column Box, then intersperses ellipsis separators between them using the intersperse utility to indicate omitted content between hunks.

## Exports
- `StructuredDiffList` - renders a list of diff hunks with ellipsis separators between them
