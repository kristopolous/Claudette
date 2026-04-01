# utils/bufferedWriter

## Purpose
Provides buffered writer with configurable flush intervals and size limits.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `WriteFn` - content write function type
2. `BufferedWriter` - { write, flush, dispose }
3. `createBufferedWriter` - factory with options
4. Options: writeFn, flushIntervalMs (1s), maxBufferSize (100), maxBufferBytes (Infinity), immediateMode
5. `buffer` - string array for pending content
6. `bufferBytes` - total bytes in buffer
7. `flushTimer` - timeout for scheduled flush
8. `pendingOverflow` - detached batch awaiting write
9. `clearTimer` - clears flush timer
10. `flush` - writes pending overflow then buffer, clears state
11. `scheduleFlush` - schedules flush if not already scheduled
12. `flushDeferred` - detaches buffer synchronously, writes via setImmediate
13. Coalesces multiple overflows into single batch for ordering
14. `write` - adds content to buffer, triggers flush if limits exceeded
15. `dispose` - flushes and clears all state
16. Immediate mode: writes directly without buffering

## Exports
- `WriteFn` - write function type
- `BufferedWriter` - buffered writer type
- `createBufferedWriter` - creates buffered writer
