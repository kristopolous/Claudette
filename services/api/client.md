# services/api/client

## Purpose
Creates Anthropic SDK client with support for multiple providers (Direct API, Bedrock, Vertex, Foundry).

## Imports
- **Stdlib**: `crypto`
- **External**: `@anthropic-ai/sdk`, `google-auth-library`
- **Internal**: auth, http, model model/providers, proxy, bootstrap state, oauth constants, debug, envUtils

## Logic
1. Supports Direct API, AWS Bedrock, Foundry (Azure), Vertex AI providers
2. Environment variables for each provider type
3. Direct API: ANTHROPIC_API_KEY required
4. Bedrock: AWS credentials, AWS_REGION/ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION
5. Foundry: ANTHROPIC_FOUNDRY_RESOURCE/BASE_URL, API key or Azure AD auth
6. Vertex: Model-specific region vars, CLOUD_ML_REGION, ANTHROPIC_VERTEX_PROJECT_ID
7. Region priority: model-specific → CLOUD_ML_REGION → default → fallback (us-east5)
8. `createStderrLogger` - logs SDK errors/warnings to stderr
9. `getAnthropicClient` - creates configured client instance
10. Handles OAuth token refresh for Claude.ai subscribers
11. Handles AWS credentials refresh for Bedrock
12. Handles GCP credentials for Vertex
13. Supports proxy configuration
14. Debug logging to stderr option
15. Session ID tracking for non-interactive sessions

## Exports
- `createStderrLogger` - creates stderr logger for SDK
- `getAnthropicClient` - creates configured Anthropic client
