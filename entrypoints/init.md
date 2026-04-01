# init

## Purpose
Main initialization module that bootstraps the Claude Code application, configuring telemetry, network settings, OAuth, and remote managed settings.

## Imports
- **Stdlib**: `fs`, `path`, `child_process`, `util`
- **External**: `lodash-es/memoize`, `@opentelemetry/api`
- **Internal**: 
  - `../bootstrap/state.js` - session state and counters
  - `../services/lsp/manager.js` - LSP server management
  - `../services/oauth/client.js` - OAuth account info
  - `../services/policyLimits/index.js` - policy limits
  - `../services/remoteManagedSettings/index.js` - remote managed settings
  - `../utils/apiPreconnect.js` - Anthropic API preconnection
  - `../utils/caCertsConfig.js` - CA certificates
  - `../utils/cleanupRegistry.js` - cleanup handlers
  - `../utils/config.js` - configuration system
  - `../utils/debug.js` - debug logging
  - `../utils/detectRepository.js` - GitHub repository detection
  - `../utils/gracefulShutdown.js` - graceful shutdown
  - `../utils/managedEnv.js` - environment variables
  - `../utils/mtls.js` - mTLS configuration
  - `../utils/proxy.js` - HTTP proxy
  - `../utils/telemetry/*` - telemetry and tracing
  - `../utils/windowsPaths.js` - Windows shell setup

## Logic
1. **Configuration Initialization**: Enable configs and apply safe environment variables before trust dialog
2. **CA Certificates**: Apply NODE_EXTRA_CA_CERTS from settings.json before any TLS connections
3. **Graceful Shutdown**: Set up cleanup handlers for process exit
4. **Event Logging**: Initialize 1P event logging and GrowthBook refresh handling
5. **OAuth**: Populate OAuth account info for VSCode extension login
6. **JetBrains Detection**: Initialize IDE detection asynchronously
7. **Remote Settings**: Initialize remote managed settings and policy limits loading promises
8. **Network Configuration**: Configure global mTLS, HTTP agents, and API preconnection
9. **Upstream Proxy**: For CCR mode, start local CONNECT relay with credential injection
10. **Scratchpad**: Create scratchpad directory if enabled
11. **Telemetry**: Deferred initialization via `initializeTelemetryAfterTrust()` after user trust is granted

## Exports
- `init` - memoized async function that runs all initialization steps
- `initializeTelemetryAfterTrust` - initializes OpenTelemetry telemetry after trust dialog acceptance
