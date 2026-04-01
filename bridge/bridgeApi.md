# bridgeApi

## Purpose
Provides a bridge API client for registering environments, polling for work, and managing remote sessions with an inference provider.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: `debugBody`, `extractErrorDetail`, `BRIDGE_LOGIN_INSTRUCTION`, bridge types

## Logic
1. Creates authenticated API client with OAuth token management
2. Implements single-retry on 401 via `withOAuthRetry` - attempts token refresh then retries once
3. Validates bridge IDs against safe pattern to prevent path traversal injection
4. Manages consecutive empty poll tracking for debug logging
5. Handles bridge-specific error codes (401/403/404/410/429) with appropriate error types
6. Supports trusted device token header for elevated authentication scenarios

## Exports
- `BridgeApiDeps` - dependency interface for client creation
- `BridgeFatalError` - error class for non-retryable bridge errors with status and errorType
- `createBridgeApiClient` - factory function that creates the API client
- `validateBridgeId` - validates server-provided IDs are safe for URL interpolation
- `isExpiredErrorType` - checks if error type indicates session/environment expiry
- `isSuppressible403` - identifies 403 errors that don't affect core functionality
