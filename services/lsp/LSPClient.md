# services/lsp/LSPClient

## Purpose
Creates LSP client wrapper for communicating with language server processes via stdio.

## Imports
- **Stdlib**: `child_process`
- **External**: `vscode-jsonrpc/node.js`, `vscode-languageserver-protocol`
- **Internal**: debug, errors, log, subprocessEnv

## Logic
1. `LSPClient` interface with capabilities, isInitialized, start, initialize, sendRequest, sendNotification, onNotification, onRequest, stop
2. `createLSPClient` - factory creating client wrapper with closure state
3. Manages ChildProcess and MessageConnection lifecycle
4. Tracks capabilities, isInitialized, startFailed, isStopping state
5. `pendingHandlers` - queues handlers registered before connection ready
6. `pendingRequestHandlers` - queues request handlers for lazy initialization
7. `checkStartFailed` - throws if start failed
8. Spawns server process with stdio for message connection
9. Creates StreamMessageReader/StreamMessageWriter for JSON-RPC
10. Handles server crash via onCrash callback for restart capability
11. Sets Trace for debugging
12. Initialize with InitializeParams, returns InitializeResult
13. sendRequest/sendNotification for LSP protocol
14. stop gracefully closes connection

## Exports
- `LSPClient` - client interface type
- `createLSPClient` - factory function creating LSP client
