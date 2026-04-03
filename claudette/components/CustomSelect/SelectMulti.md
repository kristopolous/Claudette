## Purpose
Renders a multi-select dropdown UI that allows users to select multiple options with keyboard navigation.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `figures`
- **Internal**: `ink` (Box, Text), `utils/config` (PastedContent), `utils/imageResizer` (ImageDimensions), `select` (OptionWithDescription), `select-input-option`, `select-option`, `use-multi-select-state`

## Logic
Destructures props with defaults (isDisabled=false, visibleOptionCount=5, hideIndexes=false), initializes multi-select state via `useMultiSelectState`, calculates max index width for alignment, then renders visible options in a column layout. Each option is rendered as either a `SelectInputOption` (for input-type options) or a `SelectOption` (for text-type options), with selection indicators, focus highlighting, and scroll arrows. Optionally renders a submit button when `submitButtonText` and `onSubmit` are provided.

## Exports
- `SelectMulti` - UI component that renders a multi-select list with keyboard navigation, selection checkboxes, and optional submit button
- `SelectMultiProps` - type defining all props for the SelectMulti component
