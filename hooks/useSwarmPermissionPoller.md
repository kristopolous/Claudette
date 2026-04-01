# useSwarmPermissionPoller

## Purpose
Polls for permission responses from the team leader when running as a worker agent in a swarm configuration.

## Imports
- **Stdlib**: `useCallback`, `useEffect`, `useRef` from 'react'
- **External**: `useInterval` from 'usehooks-ts'
- **Internal**: `logForDebugging`, `errorMessage`, `permissionUpdateSchema`, `isSwarmWorker`, `pollForResponse`, `removeWorkerResponse`, `getAgentName`, `getTeamName`, `PermissionUpdate`

## Logic
1. Only activates when isSwarmWorker() returns true
2. Polls every 500ms for permission responses
3. Uses module-level registry for pending callbacks
4. Validates incoming permission updates via Zod schema
5. Supports both regular and sandbox permission callbacks
6. Cleans up response files after processing

## Exports
- `useSwarmPermissionPoller` - Hook that runs the polling loop
- `registerPermissionCallback` - Register callback for pending permission request
- `unregisterPermissionCallback` - Unregister a callback
- `hasPermissionCallback` - Check if callback exists
- `clearAllPendingCallbacks` - Clear all pending callbacks
- `processMailboxPermissionResponse` - Process permission response from mailbox
