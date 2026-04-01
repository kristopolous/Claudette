# services/api/bootstrap

## Purpose
Fetches bootstrap API data for client configuration and model options.

## Imports
- **Stdlib**: (none)
- **External**: `axios`, `lodash-es/isEqual`, `zod/v4`
- **Internal**: auth, oauth constants, config, debug, http, lazySchema, log, model providers, privacyLevel, userAgent

## Logic
1. `bootstrapResponseSchema` - schema for bootstrap API response
2. client_data - optional record of unknown data
3. additional_model_options - array of { model, name, description }
4. Transforms to { value, label, description } format
5. `BootstrapResponse` - inferred response type
6. `fetchBootstrapAPI` - fetches bootstrap data from /api/claude_cli/bootstrap
7. Skips if essential traffic disabled (non-essential traffic only)
8. Skips if not first-party provider
9. Prefers OAuth (requires user:profile scope), falls back to API key
10. Service-key OAuth tokens lack profile scope and would 403
11. `withOAuth401Retry` handles refresh-and-retry
12. API key users fail through on 401 (no refresh mechanism)
13. Re-reads OAuth on each retry for refreshed token
14. Logs debug info for skipped/failed fetches
15. Caches response in global config

## Exports
- `bootstrapResponseSchema` - bootstrap response schema
- `BootstrapResponse` - bootstrap response type
- `fetchBootstrapAPI` - fetches bootstrap API data
