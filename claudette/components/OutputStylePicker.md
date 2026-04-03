## Purpose
Allows users to select their preferred output style for how Claudette communicates.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `../constants/outputStyles`, `../ink`, `../utils/config`, `../utils/cwd`, `./CustomSelect/select`, `./design-system/Dialog`

## Logic
Loads available output styles from the current working directory on mount, falling back to built-in options if loading fails. Maps style configurations to selectable options with labels and descriptions. Presents a dialog with a select component for choosing the preferred style.

## Exports
- `OutputStylePicker` - dialog for selecting the preferred output style
- `OutputStylePickerProps` - type defining the component props
