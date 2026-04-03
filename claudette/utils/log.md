# utils/log

## Purpose
Provides logging utilities for error logging and session display titles.

## Imports
- **Stdlib**: `fs/promises`
- **External**: BUILDFLAGS, `@anthropic-ai/sdk`, `lodash-es/memoize`
- **Internal**: querySource, bootstrap state, xml constants, logs types, cachePaths, displayTags, envUtils, errors, privacyLevel, JSON utils

## Logic
1. `getLogDisplayTitle` - gets display title for log/session with fallbacks
2. Skips firstPrompt if starts with tick/goal tag (autonomous mode)
3. Strips display-unfriendly tags (ide_opened_file, command-name, etc.)
4. Falls back to: agentName, customTitle, summary, firstPrompt, defaultTitle, sessionId
5. For autonomous sessions without context: shows "Autonomous session"
6. `dateToFilename` - converts Date to filename-safe string
7. `MAX_IN_MEMORY_ERRORS` (100) - max errors in memory log
8. `inMemoryErrorLog` - in-memory error log array
9. `addToInMemoryErrorLog` - adds error to in-memory log
10. `getInMemoryErrors` - gets in-memory errors
11. `clearInMemoryErrors` - clears in-memory errors
12. `logError` - logs error to file and in-memory
13. `logAntError` - logs ant-specific error
14. `logMCPDebug` - logs MCP debug info
15. `captureAPIRequest` - captures API request for logging
16. `setLastAPIRequest`, `setLastAPIRequestMessages` - sets last API request

## Exports
- `getLogDisplayTitle` - gets display title for log
- `dateToFilename` - converts date to filename
- `getInMemoryErrors` - gets in-memory errors
- `clearInMemoryErrors` - clears in-memory errors
- `logError` - logs error
- `logAntError` - logs ant error
- `logMCPDebug` - logs MCP debug
- `captureAPIRequest` - captures API request
