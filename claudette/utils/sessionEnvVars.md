# sessionEnvVars

## Purpose
Session-scoped environment variables set via /env command. Applied only to spawned child processes (via bash provider env overrides), not to the REPL process itself.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `sessionEnvVars` - module-level Map<string, string> storing session-scoped environment variables
2. `getSessionEnvVars()` - returns the map as ReadonlyMap to prevent external mutation
3. `setSessionEnvVar(name, value)` - adds or updates an environment variable
4. `deleteSessionEnvVar(name)` - removes an environment variable
5. `clearSessionEnvVars()` - clears all session environment variables

## Exports
- `getSessionEnvVars()` - returns ReadonlyMap of session environment variables
- `setSessionEnvVar(name: string, value: string)` - sets a session environment variable
- `deleteSessionEnvVar(name: string)` - deletes a session environment variable
- `clearSessionEnvVars()` - clears all session environment variables
