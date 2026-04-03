## Purpose
Renders an input-type option with a text field, image attachment support, and external editor integration.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink` (Box, Text, useInput), `keybindings/useKeybinding` (useKeybinding, useKeybindings), `utils/config` (PastedContent), `utils/imagePaste` (getImageFromClipboard), `utils/imageResizer` (ImageDimensions), `ClickableImageRef`, `ConfigurableShortcutHint`, `design-system/Byline`, `TextInput`, `select` (OptionWithDescription), `select-option`

## Logic
Manages cursor offset for the text input, tracks user editing state, and handles image attachments. Registers keybindings for external editor (Ctrl+G), image paste, and attachment navigation/removal when the option is focused. Renders the input field using TextInput with support for multiline editing, image paste handling, and cursor position management. When `showLabel` is true, displays the label alongside the input value; otherwise uses the label as the placeholder. Displays image attachments with navigation controls and shortcut hints when images are present. Wraps content in SelectOption with `declareCursor=false` since TextInput manages its own cursor.

## Exports
- `SelectInputOption` - UI component that renders an editable input option with image attachment support and external editor integration
