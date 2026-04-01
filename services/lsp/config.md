# lsp/config

## Purpose
Provides LSP server configuration loading from plugins.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: plugin types, debug, errors, log, plugins lspPluginIntegration/pluginLoader

## Logic
1. `getAllLspServers` - loads all configured LSP servers from plugins
2. LSP servers only supported via plugins (not user/project settings)
3. Loads all enabled plugins via loadAllPluginsCacheOnly
4. Maps over plugins in parallel for getPluginLspServers
5. Error tolerance: if one plugin throws, doesn't lose results from others
6. Object.assign collision precedence: later plugins win
7. Logs server count per plugin and total
8. Logs errors encountered during loading
9. Catches and logs top-level errors (LSP is optional, doesn't throw)
10. Returns merged servers record keyed by scoped server name

## Exports
- `getAllLspServers` - async function loading all LSP servers from plugins
