## Purpose
Provides lazy-loaded command metadata for the `export` command.

## Imports
- **Internal**: Command type, implementation from export.js

## Logic
1. Command object with type 'local-jsx'
2. Name: 'export', description: 'Export the current conversation to a file or clipboard'
3. Argument hint: '[filename]' (optional, provides defaults if omitted)
4. Lazy loads via `load: () => import('./export.js')`
5. Shows ExportDialog for interactive filename selection or writes directly

## Exports
- `exportCommand` - Command object (default export)
