# rateLimitMocking

## Purpose
Provides facade for rate limit header processing with mock support for /mock-limits command.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`
- **Internal**: mockRateLimits

## Logic
1. `processRateLimitHeaders` - applies mock headers if /mock-limits active
2. `shouldProcessRateLimits` - checks if should process (subscriber or mock)
3. `checkMockRateLimitError` - checks if mock should throw 429 error
4. Returns APIError with 429 status if mock conditions met
5. Checks status=rejected AND (no overage OR overage rejected)
6. Opus-specific limits only throw for Opus models
7. Handles headerless 429 scenario
8. Extracts rate limit type from representative-claim header
9. Supports fast-mode-only mock scenarios
10. `getMockHeaders` - retrieves current mock headers
11. `applyMockHeaders` - applies mock headers to response

## Exports
- `processRateLimitHeaders` - processes headers with mock support
- `shouldProcessRateLimits` - checks if rate limits should be processed
- `checkMockRateLimitError` - checks if mock should throw 429
