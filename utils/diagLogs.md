# utils/diagLogs

## Purpose
Provides diagnostic logging for session-ingress monitoring without PII.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: fsOperations, JSON utils

## Logic
1. `DiagnosticLogLevel` - debug, info, warn, error
2. `DiagnosticLogEntry` - timestamp, level, event, data
3. `logForDiagnosticsNoPII` - logs diagnostic info to logfile
4. MUST NOT include PII (file paths, project names, prompts, etc.)
5. Gets log file from CLAUDE_CODE_DIAGNOSTICS_FILE env
6. Writes JSONL format entries
7. Creates directory if append fails
8. Silently fails if logging not possible
9. `withDiagnosticsTiming` - wraps async function with timing logs
10. Logs {event}_started before execution
11. Logs {event}_completed with duration_ms after
12. Optional getData function for additional completion data
13. Used for monitoring issues from within container

## Exports
- `DiagnosticLogLevel` - diagnostic log level type
- `DiagnosticLogEntry` - log entry type
- `logForDiagnosticsNoPII` - logs diagnostic info
- `withDiagnosticsTiming` - wraps function with timing logs
