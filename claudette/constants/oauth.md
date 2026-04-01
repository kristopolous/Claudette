## Purpose
Manages OAuth configuration for authentication with the inference provider, supporting production, staging, local, and custom deployment environments.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `utils/envUtils`

## Logic
Selects the appropriate OAuth configuration based on environment variables and user type, defaulting to production URLs. Supports staging and local overrides for internal development, and allows custom OAuth base URLs restricted to an allowlist of approved FedStart/PubSec deployments. Constructs derived URLs for authorization, token exchange, API key creation, and MCP proxy endpoints from the base configuration.

## Exports
- `fileSuffixForOauthConfig` - returns the file suffix for the active OAuth environment
- `CLAUDE_AI_INFERENCE_SCOPE` - OAuth scope for inference access
- `CLAUDE_AI_PROFILE_SCOPE` - OAuth scope for profile access
- `OAUTH_BETA_HEADER` - OAuth beta protocol header value
- `CONSOLE_OAUTH_SCOPES` - scopes for API key creation via console
- `CLAUDE_AI_OAUTH_SCOPES` - scopes for inference provider subscribers
- `ALL_OAUTH_SCOPES` - union of all OAuth scopes used
- `MCP_CLIENT_METADATA_URL` - URL for MCP OAuth client metadata document
- `getOauthConfig` - returns the full OAuth configuration object for the active environment
