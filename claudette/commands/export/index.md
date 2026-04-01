## Purpose
Registers the export command metadata with lazy loading.

## Imports
- **Internal**: `Command` type

## Logic
Defines a 'local-jsx' command named 'export' with description "Export the current conversation to a file or clipboard". Accepts optional argument '[filename]' and loads implementation from './export.js'.

## Exports
- `default` - The export command object
