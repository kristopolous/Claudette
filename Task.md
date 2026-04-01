# Task.ts

## Purpose
Defines core Task types, states, and ID generation utilities used across the application for managing task lifecycle and identification.

## Imports
- **Stdlib**: `crypto` (for `randomBytes`)
- **External**: None
- **Internal**: `AppState` from `./state/AppState.js`, `AgentId` from `./types/ids.js`, `getTaskOutputPath` from `./utils/task/diskOutput.js`

## Logic
1. Defines `TaskType` union for all supported task variants (local_bash, local_agent, remote_agent, in_process_teammate, local_workflow, monitor_mcp, dream)
2. Defines `TaskStatus` union for task lifecycle states (pending, running, completed, failed, killed)
3. Provides `isTerminalTaskStatus()` to detect terminal states for cleanup and guard logic
4. Generates unique task IDs using cryptographic random bytes with type-specific prefix letters for easy identification
5. Creates `TaskStateBase` containing shared fields for all task states (id, type, status, description, timing, output file info)

## Exports
- `TaskType` - union type of all task variant strings
- `TaskStatus` - union type of all task status strings
- `isTerminalTaskStatus()` - returns true if status is terminal (completed/failed/killed)
- `TaskHandle` - type with taskId and optional cleanup function
- `SetAppState` - type for state update function
- `TaskContext` - type containing abort controller and state accessors
- `TaskStateBase` - base fields shared by all task states
- `LocalShellSpawnInput` - input type for local shell spawns
- `Task` - task interface with name, type, and kill method
- `generateTaskId()` - generates unique task ID with type prefix
- `createTaskStateBase()` - factory to create base task state
