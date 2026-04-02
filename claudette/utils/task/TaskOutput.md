# TaskOutput

## Purpose
Single source of truth for a shell command's output. Supports two modes: file mode (bash commands where stdout/stderr go directly to file fds, bypassing JS) and pipe mode (hooks where data flows through writeStdout/writeStderr and is buffered in memory, spilling to disk if it exceeds the limit). Provides progress polling for file-mode outputs driven by React visibility.

## Imports
- **Stdlib**: `fs/promises` (unlink)
- **External**: (none)
- **Internal**: `../CircularBuffer`, `../debug` (logForDebugging), `../fsOperations` (readFileRange, tailFile), `../shell/outputLimits` (getMaxOutputLength), `../stringUtils` (safeJoinLines), `./diskOutput` (DiskTaskOutput, getTaskOutputPath)

## Logic
1. **Constants**: DEFAULT_MAX_MEMORY=8MB, POLL_INTERVAL_MS=1000, PROGRESS_TAIL_BYTES=4096
2. **File mode**: stdout goes to file fd; progress extracted by polling file tail via shared static registry/poller. getStderr() returns '' since stderr is interleaved in the output file.
3. **Pipe mode**: data buffered in memory via #stdoutBuffer/#stderrBuffer, with #recentLines CircularBuffer(1000). When total memory exceeds #maxMemory, spills to DiskTaskOutput.
4. **Shared poller**: static #registry tracks all file-mode instances with onProgress callbacks. React calls startPolling/stopPolling to manage #activePolling subset. #tick() reads file tail every POLL_INTERVAL_MS, counts newlines (exact if file fits in tail, otherwise extrapolates), and calls onProgress with last 5 lines, last 100 lines, totalLines, totalBytes, isIncomplete.
5. **#updateProgress** (pipe mode only): backward pass over data to count newlines and extract up to 100 lines / 4096 bytes into #recentLines, then fires onProgress.
6. **#spillToDisk**: creates DiskTaskOutput, flushes existing buffers with [stderr] prefix for stderr, then writes the triggering chunk.
7. **getStdout**: file mode reads via readFileRange(0, maxOutputLength); if file fits entirely, marks outputFileRedundant=true for cleanup. Pipe mode returns buffer or truncated tail with size notice.
8. **#readStdoutFromFile**: handles ENOENT gracefully with diagnostic message (cross-session startup cleanup scenario).
9. **clear**: resets buffers, stops polling, removes from registry.

## Exports
- `class TaskOutput` - manages shell command output in file or pipe mode
  - `constructor(taskId, onProgress, stdoutToFile=false, maxMemory=8MB)` - creates instance; auto-registers for polling if stdoutToFile && onProgress
  - `static startPolling(taskId)` - begins polling (called by React mount)
  - `static stopPolling(taskId)` - stops polling (called by React unmount)
  - `writeStdout(data)` - write stdout (pipe mode only)
  - `writeStderr(data)` - write stderr (always piped)
  - `getStdout()` - async; returns stdout content (from file or buffer)
  - `getStderr()` - sync; returns stderr buffer or '' if overflowed to disk
  - `spillToDisk()` - force all buffered content to disk (call when backgrounding)
  - `flush()` - async; flushes disk writer
  - `deleteOutputFile()` - async; deletes output file (fire-and-forget safe)
  - `clear()` - resets state, stops polling, removes from registry
  - `isOverflowed` - getter, true if spilled to disk
  - `totalLines` - getter
  - `totalBytes` - getter
  - `outputFileRedundant` - getter, true after getStdout() when file was fully read
  - `outputFileSize` - getter, total file size in bytes

## Source
`TaskOutput`