# util

## Purpose
Implements miscellaneous subcommand handlers including setup-token, doctor, and install commands.

## Imports
- **Stdlib**: `process`
- **External**: REACT_COMPILER, REACT
- **Internal**: Logo components, hooks, ink components, keybindings, analytics, MCP, state, auth, setup/install commands

## Logic
1. `setupTokenHandler` - launches Console OAuth flow for long-lived (1-year) token setup
2. Shows auth warning if environment variable/API key already configured
3. `doctorHandler` - runs diagnostic checks with plugin management
4. Wraps Doctor screen with AppStateProvider, KeybindingSetup, MCPConnectionManager
5. `installHandler` - runs installation setup for target directory
6. All handlers use React rendering via Root, exit after completion
7. Logs analytics events for each command

## Exports
- `setupTokenHandler` - launches OAuth setup flow for Console API
- `doctorHandler` - runs diagnostic checks
- `installHandler` - installs claude-code in target directory
