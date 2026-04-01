## Purpose
Initializes IDE integration on mount: detects IDE, manages auto-connect gating, updates dynamic MCP configuration, and tracks installation/onboarding state.

## Imports
- **External**: `react` (useEffect)
- **Internal**:
  - `../services/mcp/types.js` (ScopedMcpServerConfig)
  - `../utils/config.js` (getGlobalConfig)
  - `../utils/envUtils.js` (isEnvDefinedFalsy, isEnvTruthy)
  - `../utils/ide.js` (DetectedIDEInfo, IDEExtensionInstallationStatus, IdeType, initializeIdeIntegration, isSupportedTerminal)

## Logic
Hook parameters:
- `autoConnectIdeFlag`: boolean override
- `ideToInstallExtension`: specific IDE type to install extension for, or null
- `setDynamicMcpConfig`: dispatch to add MCP config entry for IDE client
- `setShowIdeOnboarding`: dispatch to show onboarding UI
- `setIDEInstallationState`: dispatch to track installation status

Effect creates `addIde(ide)` callback used by initializeIdeIntegration:
- Computes `autoConnectEnabled` (true if any):
  - globalConfig.autoConnectIde, autoConnectIdeFlag, isSupportedTerminal(), `CLAUDE_CODE_SSE_PORT` env defined, ideToInstallExtension non-null, or `CLAUDE_CODE_AUTO_CONNECT_IDE` truthy
  - And not falsy via `isEnvDefinedFalsy`
- If enabled, invokes `setDynamicMcpConfig` to add `ide` config (type 'ws-ide' if url starts with 'ws:', else 'sse-ide'), with `scope: 'dynamic'`
- Then calls `initializeIdeIntegration(addIde, ideToInstallExtension, () => setShowIdeOnboarding(true), status => setIDEInstallationState(status))` to start detection

No cleanup required.

## Exports
- `useIDEIntegration` - Hook with `Props` object
- `IdeType` from internal utils (re-export not required but used in props)
