# services/lsp/passiveFeedback

## Purpose
Converts LSP diagnostics to Claude diagnostic format and registers notification handlers.

## Imports
- **Stdlib**: `url`
- **External**: `vscode-languageserver-protocol`
- **Internal**: debug, errors, log, JSON utils, diagnosticTracking, LSPDiagnosticRegistry, LSPServerManager

## Logic
1. `mapLSPSeverity` - maps LSP severity (1=Error, 2=Warning, 3=Info, 4=Hint) to Claude strings
2. Defaults to 'Error' for invalid/missing values
3. `formatDiagnosticsForAttachment` - converts PublishDiagnosticsParams to DiagnosticFile[]
4. Handles both file:// URIs and plain paths via fileURLToPath
5. Gracefully falls back to original URI on conversion failure
6. Extracts message, severity, range, source, code from LSP diagnostic
7. `registerLSPNotificationHandlers` - registers textDocument/publishDiagnostics handler
8. Converts params and registers via registerPendingLSPDiagnostic
9. Logs diagnostic count and server name for debugging
10. Error handling with logError for monitoring

## Exports
- `mapLSPSeverity` - maps LSP severity to Claude severity strings
- `formatDiagnosticsForAttachment` - converts LSP diagnostics to Claude format
- `registerLSPNotificationHandlers` - registers LSP notification handlers
