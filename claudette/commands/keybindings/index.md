## Purpose
Provides lazy-loaded command metadata for the `keybindings` customization command.

## Imports
- **Internal**: Command type, keybindings implementation, loadUserBindings (isKeybindingCustomizationEnabled)

## Logic
1. Command with type 'local'
2. Name: 'keybindings', description: 'Open or create your keybindings configuration file'
3. `isEnabled` returns isKeybindingCustomizationEnabled() (preview feature flag)
4. `supportsNonInteractive: false` (opens editor)
5. Lazy loads via `load: () => import('./keybindings.js')`
6. Opens JSON keybindings config for editing with template

## Exports
- `default` - Command object
