## Purpose
Displays session status information including version, session details, API provider, model, MCP clients, sandbox, and system diagnostics.

## Imports
- **Stdlib**: none
- **External**: `figures`, REACT, REACT_COMPILER
- **Internal**: `bootstrap/state`, `commands`, `context/modalContext`, `ink`, `state/AppState`, `utils/cwd`, `utils/sessionStorage`, `utils/status`, `utils/theme`, `components/ConfigurableShortcutHint`

## Logic
Builds primary and secondary property sections containing session metadata (version, session name, session ID, cwd, account, API provider) and secondary info (model, IDE properties, MCP clients, sandbox, setting sources). Renders each property as a label-value pair, with array values displayed as comma-separated items. Loads diagnostics asynchronously via Suspense and displays warnings with error styling.

## Exports
- `Status` - UI component that renders the status panel with primary/secondary sections and async diagnostics
- `buildDiagnostics` - async function that collects installation, health, and memory diagnostics
