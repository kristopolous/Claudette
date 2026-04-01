## Purpose
Handles the collection, redaction, and submission of session transcripts to the inference provider for feedback or diagnostic purposes.

## Imports
- **Stdlib**: `fs/promises`
- **External**: `http-client` (e.g., axios)
- **Internal**: `types/message`, `utils/auth`, `utils/debug`, `utils/errors`, `utils/http`, `utils/messages`, `utils/sessionStorage`, `utils/slowOperations`, `components/Feedback`

## Logic
1. **Data Collection**: Normalizes current session messages and identifies sub-agents to load their associated transcripts.
2. **Raw File Reading**: Attempts to read the raw log from disk, implementing a size-guard to prevent memory exhaustion if the file exceeds a predefined threshold.
3. **Payload Construction**: Combines session metadata (trigger type, application version, platform), normalized messages, sub-agent transcripts, and the raw log into a single data structure.
4. **Redaction**: Serializes the data and applies sensitive information filtering to ensure no private data is shared.
5. **Authentication**: Verifies/refreshes authentication tokens and retrieves necessary authorization headers.
6. **Submission**: Transmits the redacted payload to the inference provider's transcript sharing endpoint with a timeout.
7. **Error Handling**: Logs failures and returns a success status along with an optional transcript identifier.

## Exports
- `submitTranscriptShare` - Async function that gathers, redacts, and uploads session data, returning a success status and transcript ID.
- `TranscriptShareTrigger` - Type defining the possible reasons for sharing a transcript (e.g., feedback surveys, user frustration).
- `TranscriptShareResult` - Type for the submission response containing success status and an optional transcript identifier.
