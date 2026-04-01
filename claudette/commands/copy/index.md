## Purpose
Registers the copy command metadata with lazy loading.

## Imports
- **Internal**: `Command` type

## Logic
Defines a 'local-jsx' command named 'copy' with description: "Copy Claude's last response to clipboard (or /copy N for the Nth-latest)". Implementation is loaded from './copy.js' on demand.

## Exports
- `default` - The copy command object
