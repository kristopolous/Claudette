# policyLimits/types

## Purpose
Provides Zod schemas and types for policy limits API response.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: lazySchema utils

## Logic
1. `PolicyLimitsResponseSchema` - schema with restrictions record
2. Only blocked policies included in response; absent keys mean allowed
3. Restrictions map policy key to `{ allowed: boolean }`
4. `PolicyLimitsFetchResult` - result type with success, restrictions, etag, error, skipRetry
5. `restrictions` null means 304 Not Modified (cache valid)
6. `skipRetry` prevents retry on auth errors and similar

## Exports
- `PolicyLimitsResponseSchema` - Zod schema for API response
- `PolicyLimitsResponse` - inferred response type
- `PolicyLimitsFetchResult` - fetch result type with success/error handling
