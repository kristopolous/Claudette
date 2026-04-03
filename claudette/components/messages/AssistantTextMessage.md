## Purpose
Renders assistant text responses with special handling for API errors, rate limits, and various system-level error messages.

## Imports
- **Stdlib**: None
- **External**: REACT, @anthropic-ai/sdk
- **Internal**: ink (Box, Text, NoSelect), Markdown, MessageResponse, RateLimitMessage, InterruptedByUser, CtrlOToExpand, messageActions, compact, rateLimitMessages, api/errors, messages utils, model utils, secureStorage utils

## Logic
1. Checks for empty messages and returns null
2. Detects rate limit error messages and delegates to RateLimitMessage component
3. Switches on known error message strings (prompt too long, invalid API key, credit too low, token revoked, timeout, custom off switch, user abort) to render appropriate error UI
4. For API error prefixes, truncates long errors in non-verbose mode with Ctrl+O expand option
5. For normal text, renders as Markdown with optional dot indicator and selection-aware background

## Exports
- `AssistantTextMessage` - UI component that renders assistant text with comprehensive error message handling
