# services/lsp/LSPServerManager

## Purpose
Manages multiple LSP server instances and routes requests based on file extensions.

## Imports
- **Stdlib**: `path`, `url`
- **External**: (none)
- **Internal**: debug, errors, log, lsp config, LSPServerInstance, types

## Logic
1. `LSPServerManager` interface with initialize, shutdown, getServerForFile, ensureServerStarted, sendRequest, getAllServers, openFile, changeFile, saveFile, closeFile, isFileOpen
2. `createLSPServerManager` - factory with closure state encapsulation
3. `servers` - Map of server instances by name
4. `extensionMap` - Maps file extensions to server names
5. `openedFiles` - Tracks which files opened on which servers (URI → server name)
6. `initialize` - loads all configured servers from getAllLspServers
7. `shutdown` - stops all running servers and clears state
8. `getServerForFile` - routes based on file extension matching
9. `ensureServerStarted` - starts appropriate server for file
10. File synchronization: openFile (didOpen), changeFile (didChange), saveFile (didSave), closeFile (didClose)
11. `isFileOpen` - checks if file already open on compatible server

## Exports
- `LSPServerManager` - manager interface type
- `createLSPServerManager` - factory creating manager instance
