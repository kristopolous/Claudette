# services/tools/toolOrchestration

## Purpose
Orchestrates tool execution with concurrency control and context management.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`
- **Internal**: hooks, Tool, message types, generators, toolExecution

## Logic
1. `getMaxToolUseConcurrency` - reads from CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY env (default 10)
2. `MessageUpdate` - message and newContext for tool execution updates
3. `runTools` - async generator for tool execution
4. `partitionToolCalls` - partitions tool calls by concurrency safety
5. Concurrent-safe tools run in parallel via runToolsConcurrently
6. Non-concurrent tools run serially via runToolsSerially
7. Queues context modifiers for application after concurrent batch
8. Applies context modifiers in order after batch completion
9. Yields message updates with context changes
10. Handles tool result aggregation and context propagation
11. Supports both parallel and serial execution modes
12. Maintains tool execution order for deterministic results

## Exports
- `getMaxToolUseConcurrency` - gets max concurrency setting
- `MessageUpdate` - message update type
- `runTools` - async generator for tool orchestration
