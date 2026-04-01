# utils/asciicast

## Purpose
Provides asciicast terminal recording functionality for session playback.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: (none)
- **Internal**: bootstrap state, bufferedWriter, cleanupRegistry, debug, envUtils, fsOperations, path, JSON utils

## Logic
1. `recordingState` - mutable state with filePath and timestamp
2. `getRecordFilePath` - gets asciicast recording file path
3. Ant-only with CLAUDE_CODE_TERMINAL_RECORDING=1 env var
4. Records alongside transcript in projects directory
5. Each launch gets unique file (sessionId-timestamp.cast)
6. `_resetRecordingStateForTesting` - resets state for testing
7. `getSessionRecordingPaths` - finds all .cast files for session
8. Filters by sessionId prefix, sorts chronologically
9. `renameRecordingFile` - renames file after session ID change
10. Called after --resume/--continue changes session ID
11. `appendToRecording` - appends content to recording
12. Uses buffered writer for performance
13. `startRecording` - starts terminal recording
14. `stopRecording` - stops terminal recording
15. Registers cleanup for recording closure

## Exports
- `getRecordFilePath` - gets recording file path
- `_resetRecordingStateForTesting` - resets recording state
- `getSessionRecordingPaths` - gets session recording paths
- `renameRecordingFile` - renames recording file
- `appendToRecording` - appends to recording
- `startRecording` - starts recording
- `stopRecording` - stops recording
