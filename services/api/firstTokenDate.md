# services/api/firstTokenDate

## Purpose
Fetches and caches user's first Claude Code token date for tenure tracking.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: oauth constants, config, http, log, userAgent

## Logic
1. `fetchAndStoreClaudeCodeFirstTokenDate` - fetches first token date from API
2. Returns early if already cached in global config
3. Gets auth headers, logs error if unavailable
4. Calls /api/organization/claude_code_first_token_date endpoint
5. 10-second timeout for API request
6. Includes User-Agent header
7. Validates date if returned (checks for NaN)
8. Saves to global config as claudeCodeFirstTokenDate
9. Saves null if API returns null (no valid date)
10. Logs errors but doesn't throw (non-critical feature)

## Exports
- `fetchAndStoreClaudeCodeFirstTokenDate` - fetches and stores first token date
