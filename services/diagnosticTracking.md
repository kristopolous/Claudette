# services/diagnosticTracking

## Purpose
Tracks LSP diagnostics for displaying IDE errors/warnings in Claude Code.

## Imports
- **Stdlib**: (none)
- **External**: `figures`
- **Internal**: log, MCP client/types, errors, file, ide, JSON utils

## Logic
1. `DiagnosticsTrackingError` - error class extending ClaudeError
2. `MAX_DIAGNOSTICS_SUMMARY_CHARS` (4000) - max summary length
3. `Diagnostic` - message, severity, range, source, code
4. `DiagnosticFile` - uri, diagnostics array
5. `DiagnosticTrackingService` - singleton service
6. `baseline` - Map of baseline diagnostics per file
7. `mcpClient` - MCP client for IDE communication
8. `lastProcessedTimestamps` - tracks when files last processed
9. `rightFileDiagnosticsState` - tracks right file diagnostics
10. `getInstance` - gets singleton instance
11. `initialize` - initializes with MCP client
12. `shutdown` - clears all state
13. `reset` - resets tracking while keeping initialized
14. `normalizeFileUri` - removes protocol prefixes for comparison
15. `fetchDiagnostics` - fetches diagnostics from IDE via MCP
16. `compareDiagnostics` - compares current vs baseline
17. `getDiagnosticsSummary` - gets summary for model context

## Exports
- `DiagnosticsTrackingError` - tracking error class
- `MAX_DIAGNOSTICS_SUMMARY_CHARS` - max summary chars constant
- `Diagnostic` - diagnostic type
- `DiagnosticFile` - diagnostic file type
- `DiagnosticTrackingService` - tracking service class
