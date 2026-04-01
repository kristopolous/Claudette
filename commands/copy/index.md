## Purpose
Provides lazy-loaded command metadata for the `copy` command to reduce startup time.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: Implementation (from copy.js)

## Logic
1. Defines command metadata with type 'local-jsx'
2. Describes command: "Copy Claude's last response to clipboard (or /copy N for the Nth-latest)"
3. Uses lazy loading via `load: () => import('./copy.js')` to defer loading the React component
4. Command presents interactive UI for selecting content to copy

## Exports
- `default` - Command object with metadata and lazy loader
