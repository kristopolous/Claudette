# sandboxTypes

## Purpose
Provides sandbox configuration types for the Claudette Agent SDK, serving as single source of truth for sandbox settings.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: lazySchema utils

## Logic
1. `SandboxNetworkConfigSchema` - network configuration with allowedDomains, allowManagedDomainsOnly, Unix sockets, proxy ports
2. `SandboxFilesystemConfigSchema` - filesystem configuration with allowWrite/denyWrite paths
3. allowManagedDomainsOnly: when true, only managed settings domains respected (user/project/flag domains ignored)
4. allowUnixSockets: macOS only (Linux seccomp cannot filter by path)
5. allowAllUnixSockets: disables Unix socket blocking on both platforms
6. allowWrite paths merged with Edit(...) allow permission rules
7. Used by both SDK and settings validation

## Exports
- `SandboxNetworkConfigSchema` - Zod schema for network config
- `SandboxFilesystemConfigSchema` - Zod schema for filesystem config
- `SandboxConfigSchema` - combined sandbox configuration
- `SandboxSettings` - inferred type for sandbox settings
