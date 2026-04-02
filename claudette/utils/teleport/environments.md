# environments

## Purpose
Fetches and manages remote compute environments for CCR (Claude Code Remote) sessions, supporting anthropic_cloud, BYOC, and bridge environment types.

## Imports
- **External**: axios
- **Internal**: src/constants/oauth, src/services/oauth/client, ../auth, ../errors, ../log, ./api

## Logic
1. Authenticates via Claude.ai OAuth tokens (API keys are insufficient)
2. Retrieves organization UUID for scoped requests
3. Calls `/v1/environment_providers` API to list or create environments
4. Supports fallback to create a default anthropic_cloud environment with preconfigured languages (python 3.11, node 20) and network settings

## Exports
- `EnvironmentKind` - Union type: `'anthropic_cloud' | 'byoc' | 'bridge'`
- `EnvironmentState` - Union type: `'active'`
- `EnvironmentResource` - Object with `kind`, `environment_id`, `name`, `created_at`, `state`
- `EnvironmentListResponse` - Paginated response with `environments`, `has_more`, `first_id`, `last_id`
- `fetchEnvironments` - Fetches available environments from the API; requires Claude.ai OAuth authentication; 15s timeout
- `createDefaultCloudEnvironment` - Creates a default anthropic_cloud environment with python 3.11 and node 20 preconfigured; uses `/v1/environment_providers/cloud/create` endpoint with `ccr-byoc-2025-07-29` beta header

## Source
`environments`
