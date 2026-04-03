## Purpose
Renders a selectable list of commands with truncated descriptions for display in a help menu.

## Imports
- **Stdlib**: Math
- **External**: REACT, REACT/compiler-runtime
- **Internal**: commands, ink, utils/format, components/CustomSelect/select, components/design-system/Tabs

## Logic
1. Calculates max width and visible item count based on terminal dimensions
2. Deduplicates commands by name, sorts alphabetically, and maps each to a select option with a truncated description
3. Renders an empty message when no commands are provided, otherwise displays a titled Select list with compact-vertical layout and keyboard navigation support

## Exports
- `Commands` - UI component that renders a list of commands as selectable options with descriptions
