# agentSdkTypes

## Purpose
Main entrypoint for Claudette Agent SDK types, re-exporting public API from core and runtime types.

## Imports
- **Stdlib**: (none)
- **External**: `@modelcontextprotocol/sdk` types
- **Internal**: SDK control/core/runtime/types, settings, tool types

## Logic
1. Re-exports SDKControlRequest/Response for SDK builders (bridge subpath)
2. Re-exports all core types (common serializable types)
3. Re-exports runtime types (callbacks, interfaces with methods)
4. Re-exports generated settings types from JSON schema
5. Re-exports tool types (all marked @internal until SDK API stabilizes)
6. `tool` function - defines a tool with name, description, input schema, handler
7. Handler receives args and extra context, returns CallToolResult
8. SDKSession, SDKSessionOptions types for session management
9. ForkSessionOptions, ListSessionsOptions for session operations

## Exports
- SDK control types (for SDK builders)
- All core SDK types (re-exported)
- All runtime SDK types (re-exported)
- Settings types (re-exported)
- Tool types (re-exported)
- `tool` - function to define custom tools
