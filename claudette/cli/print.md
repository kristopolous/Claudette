# print

## Purpose
Main entry point for headless/SDK mode execution, handling prompt processing, tool orchestration, and streaming output.

## Imports
- **Stdlib**: `fs/promises`, `path`, `process`, `crypto`
- **External**: `bun:bundle`, `axios`, `lodash-es`, `@anthropic-ai/sdk`
- **Internal**: settings sync, remote managed settings, IO handlers, commands, tools, analytics, GrowthBook, debug/diag utils, types, messages, session state, MCP, plugins, permissions, hooks, file state cache, auth, model utils, and many more core modules

## Logic
1. `runHeadless` - main entry point for headless execution with prompt processing
2. StructuredIO for NDJSON/stream-json output formats
3. StreamJsonStdoutGuard prevents stray stdout from breaking NDJSON parsing
4. Sandbox initialization with callback for network permission requests
5. Settings change detector for headless mode (no React tree)
6. GrowthBook initialization for feature flags in headless mode
7. Grove eligibility check for non-interactive consumer subscribers
8. Handles resume, rewind-files, fork-session, teleport options
9. Message queue management for batched prompt commands
10. Tool execution with permission checking and result formatting
11. Session persistence and recovery
12. MCP server setup and tool discovery
13. Plugin installation and refresh
14. Analytics event logging throughout

## Exports
- `runHeadless` - main headless execution function
- `joinPromptValues` - joins queued command prompts into single value
- `canBatchWith` - checks if commands can be batched into same ask() call
- (Many internal helpers for headless operation)
