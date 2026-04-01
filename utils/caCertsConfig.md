# utils/caCertsConfig

## Purpose
Applies NODE_EXTRA_CA_CERTS from settings/config before TLS connections.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: config, debug, settings settings

## Logic
1. Split from caCerts.ts to avoid circular dependency bloat
2. config.ts → file.ts → permissions/filesystem.ts → commands.ts pulls ~5300 modules
3. proxy.ts/mtls.ts must NOT depend on that graph (Agent SDK bundle bloat)
4. getCACertificates() only reads process.env.NODE_EXTRA_CA_CERTS
5. This module populates env var at CLI startup
6. Only init.ts imports this file
7. `applyExtraCACertsFromConfig` - applies NODE_EXTRA_CA_CERTS from config
8. Returns early if already set in environment
9. Bun caches TLS cert store at boot via BoringSSL
10. Setting before TLS connections gives Bun chance to pick up
11. Safe before trust dialog (reads user-controlled files only)
12. `getExtraCertsPathFromConfig` - reads from global config and user settings
13. NODE_EXTRA_CA_CERTS is non-safe env var (allows attacker-controlled servers)
14. Only applied after trust dialog, but needed early for HTTPS proxy
15. Settings override global config (same precedence as applyConfigEnvironmentVariables)

## Exports
- `applyExtraCACertsFromConfig` - applies extra CA certs from config
- `getExtraCertsPathFromConfig` - gets extra certs path from config
