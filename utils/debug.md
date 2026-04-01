# utils/debug

## Purpose
Provides debug logging utilities with file output and filtering.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: `lodash-es/memoize`
- **Internal**: bootstrap state, bufferedWriter, cleanupRegistry, debugFilter, envUtils, fsOperations, process, JSON utils

## Logic
1. `DebugLogLevel` - verbose, debug, info, warn, error
2. `LEVEL_ORDER` - numeric ordering for log levels
3. `getMinDebugLogLevel` - gets minimum log level from CLAUDE_CODE_DEBUG_LOG_LEVEL env
4. Defaults to 'debug', filters out 'verbose'
5. `runtimeDebugEnabled` - flag for mid-session debug enable
6. `isDebugMode` - checks if debug mode active
7. Checks: runtimeDebugEnabled, DEBUG env, DEBUG_SDK env, --debug/-d args, debug to stderr, --debug-file
8. `enableDebugLogging` - enables debug logging mid-session (e.g., via /debug)
9. Returns true if logging was already active
10. `getDebugFilter` - parses --debug=pattern from argv
11. `shouldShowDebugMessage` - checks if message matches filter
12. `logForDebugging` - logs debug message with optional level
13. `getDebugFilePath` - gets debug log file path
14. `createDebugLogger` - creates buffered debug logger
15. `writeToDebugLog` - writes to debug log file
16. Registers cleanup for log file closure

## Exports
- `DebugLogLevel` - log level type
- `getMinDebugLogLevel` - gets minimum log level
- `isDebugMode` - checks debug mode
- `enableDebugLogging` - enables debug logging
- `getDebugFilter` - gets debug filter
- `shouldShowDebugMessage` - checks if message should show
- `logForDebugging` - logs debug message
- `getDebugFilePath` - gets debug file path
- `createDebugLogger` - creates debug logger
- `writeToDebugLog` - writes to debug log
