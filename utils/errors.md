# utils/errors

## Purpose
Provides error classes and utilities for error handling.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`
- **Internal**: (none)

## Logic
1. `ClaudeError` - base error class with constructor name
2. `MalformedCommandError` - error for malformed commands
3. `AbortError` - error for abort operations
4. `isAbortError` - type guard for abort-shaped errors
5. Checks AbortError class, DOMException, SDK APIUserAbortError
6. Uses instanceof for SDK class (minified builds mangle names)
7. `ConfigParseError` - error for config file parsing
8. Includes filePath and defaultConfig for recovery
9. `ShellError` - error for shell command failures
10. Includes stdout, stderr, code, interrupted flag
11. `TeleportOperationError` - error for teleport operations
12. Includes message and formattedMessage
13. `TelemetrySafeError` - error safe for telemetry logging
14. Single-arg: same message for user and telemetry
15. Two-arg: different messages (full has paths, telemetry doesn't)
16. `errorMessage` - extracts error message from unknown
17. `getErrnoCode` - extracts errno code from error
18. `isENOENT` - checks for file not found error
19. `toError` - converts unknown to Error

## Exports
- `ClaudeError` - base error class
- `MalformedCommandError` - malformed command error
- `AbortError` - abort error class
- `isAbortError` - abort error type guard
- `ConfigParseError` - config parse error
- `ShellError` - shell error class
- `TeleportOperationError` - teleport error
- `TelemetrySafeError` - telemetry-safe error
- `errorMessage` - extracts error message
- `getErrnoCode` - extracts errno code
- `isENOENT` - checks file not found
- `toError` - converts to Error
