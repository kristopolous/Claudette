# status

## Purpose
Builds diagnostic and informational property arrays displayed in the Status pane, covering sandbox state, IDE connection, MCP server health, memory usage, setting sources, installation diagnostics, account info, and API provider configuration.

## Imports
- **Stdlib**: STYLER, `figures`, REACT
- **External**: none
- **Internal**: `../ink`, `../services/mcp/types`, `./auth`, `./claudemd`, `./doctorDiagnostic`, `./envUtils`, `./file`, `./format`, `./ide`, `./model/model`, `./model/providers`, `./mtls`, `./nativeInstaller/index`, `./proxy`, `./sandbox/sandbox-adapter`, `./settings/allErrors`, `./settings/constants`, `./settings/settings`, `./theme`

## Logic
1. Each `build*Properties` function returns an array of `{label, value}` Property objects for display in the status pane.
2. **Sandbox**: Checks `SandboxManager.isSandboxingEnabled()` (ant-only, gated on `"external" !== 'ant'`).
3. **IDE**: Detects IDE client connection via MCP, reports version mismatches between installed extension and connected server, handles installation errors. Distinguishes JetBrains (plugin) vs other IDEs (extension).
4. **MCP servers**: Summarizes server counts by state (connected/pending/needs-auth/failed) rather than listing all servers, to avoid dominating the status pane.
5. **Memory**: Identifies memory files exceeding `MAX_MEMORY_CHARACTER_COUNT` threshold.
6. **Setting sources**: Enumerates active setting sources with user-friendly names, including enterprise managed settings origin detection (remote/plist/HKLM/HKCU/file/drop-ins).
7. **Installation diagnostics**: Runs `checkInstall()` for warnings and `getDoctorDiagnostic()` for health checks, plus validates settings files for parse errors.
8. **Account**: Displays subscription type, auth token source, API key source, organization, and email (hidden in demo mode).
9. **API provider**: Shows provider-specific config (Bedrock region, Vertex project, Foundry resource), proxy URL, mTLS certs, and custom base URLs.
10. **Model label**: Returns the display string for the current model, with special handling for Claude.ai subscribers using default models.

## Exports
- `Property` - type for label/value pairs displayed in status pane
- `Diagnostic` - type for React node diagnostic messages
- `buildSandboxProperties` - returns sandbox enabled/disabled status
- `buildIDEProperties` - returns IDE connection status with version info
- `buildMcpProperties` - returns MCP server count summary by state
- `buildMemoryDiagnostics` - returns warnings for oversized memory files
- `buildSettingSourcesProperties` - returns active setting source names
- `buildInstallationDiagnostics` - returns installation warnings
- `buildInstallationHealthDiagnostics` - returns doctor diagnostics and settings validation errors
- `buildAccountProperties` - returns account/auth info properties
- `buildAPIProviderProperties` - returns API provider, proxy, and mTLS config
- `getModelDisplayLabel` - returns formatted model display string

## Source
`status`
