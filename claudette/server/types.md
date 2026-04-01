## Purpose
Defines shared types and Zod schemas for server configuration, session state, and session indexing.

## Imports
- **Stdlib**: `child_process` (ChildProcess type)
- **External**: `zod/v4`
- **Internal**: `utils/lazySchema`

## Logic
Provides type definitions and validation schemas for the direct-connect server, including session configuration, session lifecycle states, session metadata, and the session index persisted to disk for cross-restart session resumption.

## Exports
- `connectResponseSchema` - Zod schema validating the server's session creation response (session_id, ws_url, optional work_dir)
- `ServerConfig` - type defining server settings including port, host, auth token, idle timeout, max sessions, and workspace directory
- `SessionState` - union type for session lifecycle states: starting, running, detached, stopping, stopped
- `SessionInfo` - type for active session metadata including ID, status, creation time, work directory, and child process
- `SessionIndexEntry` - type for persisted session entries with server-assigned ID, transcript session ID, cwd, permission mode, and timestamps
- `SessionIndex` - type mapping stable session keys to SessionIndexEntry records
