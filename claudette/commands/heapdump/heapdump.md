## Purpose
Create a heap dump of the Node.js process for memory debugging.

## Imports
- **Internal**: `performHeapDump` from heapDumpService

## Logic
1. Local command that calls performHeapDump()
2. Heap dump writes two files (typically to ~/Desktop):
   - `.heapsnapshot` file (Chrome DevTools format)
   - `.heapprofile` or log file with diagnostics
3. Returns text output with paths to the created files
4. On failure, returns error message
5. Used for memory leak investigation and performance profiling
6. Command type: 'local' (synchronous-like, returns text)
7. Hidden from normal usage (isHidden: true, only for debugging)

## Exports
- `call` - async function returning { type: 'text', value: string with paths }
- `heapDump` - Command object (hidden, Ant-only)
