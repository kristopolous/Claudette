# FILE TEMPLATE

```
## Purpose
One sentence describing what this module does.

## Imports
- **Stdlib**: list any stdlib imports
- **External**: list external library imports  
- **Internal**: list internal imports from project

## Logic
Brief description of the core logic/algorithm this module implements.

## Exports
- `exportName` - description of what it does
```

---

# EXAMPLE (main)

## Purpose
Entry point that parses CLI arguments, initializes the application, and launches either the REPL interface or headless mode.

## Imports
- **Stdlib**: `fs`, `path`, `child_process`
- **External**: `commander`, STYLER, REACT
- **Internal**: `init`, `launchRepl`, `getCommands`, `getTools`

## Logic
1. Parse CLI flags viaCommander
2. Pre-fetch keychain and MDM settings in parallel
3. Initialize telemetry and config
4. Check for updates, auth, and managed settings
5. Either launch REPL (interactive) or process command (headless)

## Exports
- None (this is the entry point, not a module)