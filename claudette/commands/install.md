## Purpose
Install Claudette native build and set up shell launcher.

## Imports
- **External**: React
- **Internal**: Native installer utilities (checkInstall, installLatest, cleanupNpmInstallations, cleanupShellAliases), settings management, analytics

## Logic
1. React component with state machine: checking → installing → setting-up → success/error
2. Installation flow:
   - Install latest native build (or specific version/target)
   - Run checkInstall to set up launcher and shell integration
   - Clean up old npm-based installations
   - Clean up legacy shell aliases
3. Handles lock failures (concurrent install detection)
4. Shows progress and any setup notes/warnings
5. On success: displays version, install location, next steps
6. On error: shows error message with --force suggestion
7. Analytics tracking throughout
8. Command type: 'local-jsx' (renders React UI)
9. Not a slash command (exported as `install` for CLI entry point only)

## Exports
- `install` - local-jsx Command object with call rendering Install component
