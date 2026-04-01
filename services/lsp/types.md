# lsp/types

## Purpose
Provides type definitions for LSP server configuration and state.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none - type definitions only)

## Logic
1. `ScopedLspServerConfig` - LSP server configuration with scope (user/project/local)
2. `LspServerState` - server lifecycle state (stopped, starting, running, stopping, error)
3. `LspServerHealth` - health check result type
4. Configuration includes: command, args, env, cwd, fileExtensions
5. File extensions determine which server handles which files
6. State tracking for lifecycle management
7. Health monitoring for request routing decisions

## Exports
- `ScopedLspServerConfig` - LSP server configuration type
- `LspServerState` - server state enum type
- `LspServerHealth` - health check result type
