# utils/slowOperations

## Purpose
Provides slow operation logging infrastructure for JSON/clone operations.

## Imports
- **Stdlib**: `fs`
- **External**: BUILDFLAGS, `lodash-es/cloneDeep`
- **Internal**: bootstrap state, debug

## Logic
1. `WriteFileOptionsWithFlush` - extended WriteFileOptions with 'flush' option
2. `SLOW_OPERATION_THRESHOLD_MS` - threshold for logging slow operations
3. Override via CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS env var
4. Dev builds: 20ms, Ants: 300ms, others: Infinity
5. `isLogging` - module-level re-entrancy guard
6. logForDebugging writes to debug file via appendFileSync, which goes through slowLogging again
7. Without guard: slow appendFileSync → dispose → logForDebugging → appendFileSync → dispose → ...
8. `callerFrame` - extracts first stack frame outside this file
9. So DevBar warning points at actual caller instead of useless Object{N keys}
10. Only called when operation was actually slow - never on fast path
11. `buildDescription` - builds human-readable description from tagged template arguments
12. args[0] = TemplateStringsArray, args[1..n] = interpolated values
13. `slowLogging` - logs slow operation
14. `jsonStringify` - JSON stringify with slow operation logging
15. `jsonParse` - JSON parse with slow operation logging
16. `clone` - clone with slow operation logging
17. `writeFileSync_DEPRECATED` - write file sync with flush option
18. `addSlowOperation` - adds slow operation to state
19. `logForDebugging` - debug logging

## Exports
- `SLOW_OPERATION_THRESHOLD_MS` - slow operation threshold
- `callerFrame` - extracts caller frame
- `buildDescription` - builds description
- `slowLogging` - logs slow operation
- `jsonStringify` - JSON stringify with logging
- `jsonParse` - JSON parse with logging
- `clone` - clone with logging
- `writeFileSync_DEPRECATED` - write file sync
- `addSlowOperation` - adds slow operation
