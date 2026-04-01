# services/api/errors

## Purpose
Provides API error classification, parsing, and user-facing error message generation.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`
- **Internal**: betas, agentSdkTypes, message types, auth, messages, model model/strings/providers, bootstrap state, apiLimits, envUtils, format, imageResizer/imageValidation, analytics, claudeAiLimits, rateLimitMocking, errorUtils

## Logic
1. `API_ERROR_MESSAGE_PREFIX` - 'API Error'
2. `startsWithApiErrorPrefix` - checks if message starts with prefix
3. `PROMPT_TOO_LONG_ERROR_MESSAGE` - 'Prompt is too long'
4. `isPromptTooLongMessage` - checks if message is prompt too long error
5. `parsePromptTooLongTokens` - extracts actual/limit from error text
6. `classifyAPIError` - classifies error type for handling
7. `formatAPIError` - formats error for user display
8. Handles: connection errors, timeout errors, rate limits, auth errors
9. Handles: prompt too long, context window exceeded, invalid request
10. Handles: PDF limits (API_PDF_MAX_PAGES, PDF_TARGET_RAW_SIZE)
11. Handles: image resize/size errors
12. Handles: Claude.ai limits with overage disabled reasons
13. Handles: mock rate limits for /mock-limits command
14. `createAssistantAPIErrorMessage` - creates error message for assistant
15. `NO_RESPONSE_REQUESTED` - constant for no-response scenarios
16. Logs events for analytics tracking

## Exports
- `API_ERROR_MESSAGE_PREFIX` - error message prefix
- `startsWithApiErrorPrefix` - checks error prefix
- `PROMPT_TOO_LONG_ERROR_MESSAGE` - prompt too long message
- `isPromptTooLongMessage` - checks prompt too long
- `classifyAPIError` - classifies API error
- `formatAPIError` - formats error for display
- `createAssistantAPIErrorMessage` - creates error message
- `NO_RESPONSE_REQUESTED` - no-response constant
