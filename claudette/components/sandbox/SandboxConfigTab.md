## Purpose
Displays the current sandbox configuration including filesystem read/write restrictions, network rules, excluded commands, and unix socket settings.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink`, `utils/sandbox/sandbox-adapter`

## Logic
1. Checks if sandboxing is enabled; returns early with a message if not
2. Retrieves configuration from SandboxManager for filesystem read, filesystem write, network restrictions, unix sockets, excluded commands, and glob pattern warnings
3. Renders each configuration section conditionally based on whether values are present
4. Displays dependency warnings if any exist
5. Shows glob pattern warnings when patterns are not fully supported on Linux

## Exports
- `SandboxConfigTab` - Renders the sandbox configuration overview panel
