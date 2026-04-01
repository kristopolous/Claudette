## Purpose
Open or create your keybindings configuration file for customizing shortcuts.

## Imports
- **Internal**: Keybinding utilities (getKeybindingsPath, isKeybindingCustomizationEnabled), template generation, error handling, editFileInEditor

## Logic
1. First checks if keybinding customization is enabled (feature flag/preview)
   - If disabled, returns message that feature is not enabled
2. Determines keybindings file path (typically at ~/.claude/keybindings.json)
3. Creates parent directory if needed
4. Writes template file with `wx` flag (exclusive create):
   - If file already exists, catches EEXIST and opens existing file
   - If new, writes template content
5. Opens the file in user's editor (via editFileInEditor)
6. Returns message: "Created... Opened..." or "Opened..." depending on whether it was new
7. Command type: 'local'
8. Enabled only when isKeybindingCustomizationEnabled() returns true
9. Uses generateKeybindingsTemplate() for default keybinding JSON structure
10. Supports customizing keyboard shortcuts for commands

## Exports
- `call` - async function returning { type: 'text', value: string }
- `keybindings` - Command object
