## Purpose
Renders a single-select dropdown UI with support for text options, input-type options, multiple layout modes, and image attachments.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `figures`
- **Internal**: `ink/hooks/use-declared-cursor`, `ink/stringWidth`, `ink` (Ansi, Box, Text), `utils/array` (count), `utils/config` (PastedContent), `utils/imageResizer` (ImageDimensions), `select-input-option`, `select-option`, `use-select-input`, `use-select-state`

## Logic
Manages input values for input-type options, image selection state, and syncs initial values when options change. Uses `useSelectState` for selection state and `useSelectInput` for keyboard handling. Renders options in one of three layouts: `expanded` (multi-line with spacing), `compact-vertical` (compact index with description below label), or `compact` (single-line with optional inline descriptions). The compact layout with descriptions uses a two-column layout that calculates max label width for alignment. Highlights matching text when `highlightText` is provided. Input-type options render as `SelectInputOption` with full editing, image paste, and external editor support.

## Exports
- `Select` - UI component that renders a single-select dropdown with multiple layout modes and input support
- `SelectProps` - type defining all props for the Select component
- `OptionWithDescription` - type for options supporting both text and input types with configuration for submission behavior, label display, and cursor management
