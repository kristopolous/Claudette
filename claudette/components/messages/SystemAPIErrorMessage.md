## Purpose
Renders API error messages with retry countdown, attempt tracking, and truncated error details.

## Imports
- **Stdlib**: None
- **External**: react, usehooks-ts (useInterval)
- **Internal**: ink (Box, Text), MessageResponse, CtrlOToExpand, api errorUtils, message types

## Logic
1. Hides error display for early retry attempts (fewer than 4) on external builds
2. Runs a countdown timer using useInterval, incrementing every second until retry time is reached
3. Formats the API error and truncates to 1000 characters in non-verbose mode
4. Shows retry countdown with attempt number, max retries, and optional API_TIMEOUT_MS hint
5. Includes Ctrl+O expand prompt when error is truncated

## Exports
- `SystemAPIErrorMessage` - React component rendering API errors with live retry countdown
