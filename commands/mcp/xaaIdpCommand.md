## Purpose
CLI subcommand: `claude mcp xaa` - manages XAA (SEP-990) IdP connection.

## Imports
- **External**: Commander.js
- **Internal**: xaaIdpLogin service, settings management, keychain utilities

## Logic
Registers 'mcp xaa' command with subcommands:
- `setup --issuer <url> --client-id <id> [--client-secret] [--callback-port]`: Configures IdP connection and stores client secret in keychain
- `login [--force] [--id-token <jwt>]`: Performs OIDC browser login or directly caches id_token
- `show`: Displays current IdP config and cached credentials status
- `clear`: Removes IdP config and cached tokens

Clears stale keychain entries when issuer or client-id changes. XAA enables MCP servers to authenticate via enterprise IdP instead of per-server OAuth.

## Exports
- `registerMcpXaaIdpCommand` - Registers the xaa command hierarchy
