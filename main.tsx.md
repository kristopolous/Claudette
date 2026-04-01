# main.tsx

## Purpose
Entry point that parses CLI arguments, initializes the application, and launches either the REPL interface or headless/SDK mode.

## Imports
- **Stdlib**: `fs`, `path`, `child_process`
- **External**: `commander`, `chalk`, `react`, `lodash-es`
- **Internal**: `init` (entrypoints/init), `launchRepl` (replLauncher), `getCommands` (commands), `getTools` (tools), `fetchBootstrapData` (services/api/bootstrap)

## Logic
1. **Pre-fetch phase** (before imports complete - performance optimization):
   - `profileCheckpoint` - timing marker for startup profiling
   - `startMdmRawRead` - fire MDM subprocesses in parallel
   - `startKeychainPrefetch` - prefetch keychain for OAuth/API key

2. **CLI parsing**: Use Commander.js to parse `--version`, `--add`, commands, etc.

3. **Initialization** (`init()`):
   - Enable config system
   - Apply safe environment variables  
   - Setup graceful shutdown
   - Initialize 1P event logging
   - Initialize telemetry (lazy-loaded ~400KB of OpenTelemetry)
   - Check/update OAuth account info
   - Load policy limits and remote managed settings

4. **Auth check**: Validate login org, show login UI if needed

5. **Launch mode**:
   - **Interactive**: Call `launchRepl()` → App → REPL components
   - **Headless/SDK**: Process command directly via QueryEngine

6. **Post-launch**: Handle resume, onboarding, settings dialogs as needed

## Exports
- None (main entry point, no exports)

## Insights
- **Parallel prefetch pattern**: Keychain and MDM reads happen before main imports to save ~65ms on startup
- **Feature flags via `feature()`**: Dead code elimination - modules like `COORDINATOR_MODE` are conditionally imported and eliminated from builds
- **Lazy telemetry**: OpenTelemetry is lazy-loaded only when telemetry is actually initialized (~400KB savings at startup)
- **Circular dependency avoidance**: Some imports use `require()` in functions (e.g., `getTeammateUtils()`) to avoid circular deps