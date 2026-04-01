# bridgeMain

## Purpose
Implements the main bridge loop that registers environments, polls for work, and spawns sessions for remote control mode.

## Imports
- **Stdlib**: `crypto`, `os`, `path`
- **External**: (none)
- **Internal**: bridge API/client, analytics, debug utils, session runner, work secret utils

## Logic
1. `runBridgeLoop` - main loop that polls for work and manages session lifecycle
2. Implements exponential backoff for connection and general errors with configurable caps
3. Handles environment registration with idempotent re-registration for session resume
4. Spawns multiple sessions concurrently (default 32) when multi-session enabled
5. Detects system sleep/wake via poll interval threshold (2x backoff cap)
6. Manages token refresh scheduling for OAuth tokens
7. Tracks capacity and wakes environments when slots become available
8. Handles session archival, reconnection, and heartbeat operations

## Exports
- `BackoffConfig` - configuration for exponential backoff behavior
- `runBridgeLoop` - main entry point for bridge operation
