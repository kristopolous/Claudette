# tasks/InProcessTeammateTask/InProcessTeammateTask

## Purpose
Manages in-process teammate lifecycle for team-based agent execution.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: Task types, message types, debug, messages, swarm spawnInProcess, task framework, teammate types

## Logic
1. InProcessTeammateTask implements Task interface
2. Runs in same Node.js process using AsyncLocalStorage for isolation
3. Team-aware identity (agentName@teamName)
4. Supports plan mode approval flow
5. Can be idle (waiting) or active (processing)
6. `kill` - kills in-process teammate via killInProcessTeammate
7. `requestTeammateShutdown` - requests graceful shutdown
8. `appendTeammateMessage` - appends message to conversation history (zoomed view)
9. `injectUserMessageToTeammate` - injects user message to pending queue
10. Allows injection when running/idle, rejects in terminal state
11. Adds message to task.messages for immediate transcript display

## Exports
- `InProcessTeammateTask` - task definition for in-process teammates
- `requestTeammateShutdown` - requests teammate shutdown
- `appendTeammateMessage` - appends message to teammate history
- `injectUserMessageToTeammate` - injects user message to teammate
