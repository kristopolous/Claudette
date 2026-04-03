# BriefTool/UI

## Purpose

Renders terminal UI for BriefTool, which outputs assistant messages (Claude's responses) that may include attachments. Handles three display modes: transcript mode (with marker), brief-only chat view (with "Claude" label), and default view (plain text). Also renders attachment lists with icons and file sizes.

## Imports

- **Stdlib**: React compiler runtime (`_c`)
- **External**: `figures` (for `pointerSmall` icon)
- **Internal**:
  - Components: `Markdown`
  - Constants: `BLACK_CIRCLE`
  - UI: `Box`, `Text` from ink`
  - Types: `ProgressMessage`
  - Utils: `getDisplayPath`, `formatFileSize`, `formatBriefTimestamp`
  - Related Tool: `BriefTool` (for Output type)

## Logic

- **`renderToolUseMessage()`**: Returns empty string (no tool use indicator)
- **`renderToolResultMessage(output, _progressMessages, options?)`**:
  - Checks if output has message or attachments; returns null if neither
  - **Transcript mode** (`isTranscriptMode=true`):
    - Renders row with `BLACK_CIRCLE` in text color (2px min width)
    - Column with message (Markdown) and AttachmentList
  - **Brief-only mode** (`isBriefOnly=true`):
    - Renders column with "Claude" label (color `briefLabelClaude`) + optional timestamp (dimmed)
    - Indented column (paddingLeft=2) with message and AttachmentList
  - **Default mode** (neither flag):
    - Renders empty 2px gutter spacer then message and AttachmentList
- **`AttachmentList`**: Component (uses REACT_COMPILER memoization) that:
  - Returns null if attachments empty
  - Maps each attachment to a Box row:
    - `pointerSmall` icon (dim) + `[image]` or `[file]` label
    - File path (`getDisplayPath`)
    - File size in parentheses (dim, formatted via `formatFileSize`)
  - Wraps all rows in a column Box with top margin
- **`_temp(att)`**: Maps a single attachment to the display Box row

## Exports

- `renderToolUseMessage(): React.ReactNode`
- `renderToolResultMessage(output: Output, _progressMessages: ProgressMessage[], options?: {isTranscriptMode?: boolean; isBriefOnly?: boolean}): React.ReactNode`
- `AttachmentList` (internal export, used within this file)
