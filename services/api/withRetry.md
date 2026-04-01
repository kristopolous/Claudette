# services/api/withRetry

## Purpose
Provides retry logic for API requests with exponential backoff and error handling.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`, `bun:bundle`
- **Internal**: querySource, message types, aws, debug, log, messages, model providers, auth, envUtils, errors, fastMode, model, proxy, sleep, thinking, growthbook, analytics, rateLimitMocking, errors/errorUtils

## Logic
1. `abortError` - creates APIUserAbortError
2. `DEFAULT_MAX_RETRIES` (10), `FLOOR_OUTPUT_TOKENS` (3000), `MAX_529_RETRIES` (3)
3. `BASE_DELAY_MS` (500) - base delay for exponential backoff
4. `FOREGROUND_529_RETRY_SOURCES` - Set of sources that retry on 529
5. Includes: repl_main_thread, sdk, agent:*, compact, hook_*, verification_agent, side_question, auto_mode
6. Background sources bail immediately (3-10× gateway amplification during cascade)
7. `getRetryDelay` - calculates exponential backoff delay
8. `withRetry` - wraps API call with retry logic
9. Handles: APIConnectionError, APIError, APIUserAbortError
10. Handles AWS credentials provider errors
11. Handles fast mode cooldown and overage rejection
12. Handles mock rate limit errors
13. Handles repeated 529 errors
14. Clears auth caches on relevant errors
15. Creates system API error messages for user display

## Exports
- `DEFAULT_MAX_RETRIES`, `FLOOR_OUTPUT_TOKENS`, `MAX_529_RETRIES`, `BASE_DELAY_MS` - retry constants
- `FOREGROUND_529_RETRY_SOURCES` - foreground sources set
- `getRetryDelay` - calculates retry delay
- `withRetry` - wraps API call with retry logic
