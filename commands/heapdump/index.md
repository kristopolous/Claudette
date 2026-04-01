## Purpose
Provides lazy-loaded command metadata for the `heapdump` debug command.

## Imports
- **Internal**: Command type, heapdump implementation

## Logic
1. Command with type 'local'
2. Name: 'heapdump', description: 'Dump the JS heap to ~/Desktop'
3. `isHidden: true` (not shown in command list, for debugging only)
4. `supportsNonInteractive: true` (works in headless mode)
5. Lazy loads via `load: () => import('./heapdump.js')`
6. Internal debugging tool for memory analysis

## Exports
- `default` - heapDump Command
