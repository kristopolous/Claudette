## Purpose
Open the settings/config panel to adjust Claudette preferences.

## Imports
- **Internal**: Settings component from UI components

## Logic
1. Local-jsx command that renders the Settings panel
2. Passes onDone callback and context to Settings component
3. Default tab is "Config"
4. Settings panel allows users to modify various configuration options
5. Command type: 'local-jsx' (lazy-loaded)
6. Aliases: ['settings']

## Exports
- `call` - async LocalJSXCommandCall returning Settings UI component
- `config` - Command object with lazy loader
