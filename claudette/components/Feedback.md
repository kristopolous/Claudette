## Purpose
Provides a multi-step feedback and bug report submission dialog that collects user descriptions, environment info, and session transcripts.

## Imports
- **Stdlib**: `fs/promises`
- **External**: `axios`, `react`
- **Internal**: `getLastAPIRequest`, `logEventTo1P`, `logEvent`, `getLastAssistantMessage`, `normalizeMessagesForAPI`, `useTerminalSize`, `Box`, `Text`, `useInput`, `useKeybinding`, `queryHaiku`, `startsWithApiErrorPrefix`, `checkAndRefreshOAuthTokenIfNeeded`, `openBrowser`, `logForDebugging`, `env`, `getGitState`, `getIsGit`, `getAuthHeaders`, `getUserAgent`, `getInMemoryErrors`, `logError`, `isEssentialTrafficOnly`, `extractTeammateTranscriptsFromTasks`, `getTranscriptPath`, `loadAllSubagentTranscriptsFromDisk`, `jsonStringify`, `asSystemPrompt`, `ConfigurableShortcutHint`, `Byline`, `Dialog`, `KeyboardShortcutHint`, `TextInput`

## Logic
Walks the user through four steps: input description, consent review, submitting, and done. Collects environment info, git state, session transcript, subagent transcripts, and error logs. Submits feedback to the inference provider API with fresh OAuth tokens. On success, offers to open a pre-filled GitHub issue URL. All sensitive information (API keys, tokens, credentials) is redacted from titles, descriptions, and error logs before submission or URL generation.

## Exports
- `redactSensitiveInfo` - removes API keys, tokens, and credentials from text using regex patterns
- `Feedback` - renders the multi-step feedback submission dialog
- `createGitHubIssueUrl` - generates a pre-filled GitHub issue URL with redacted feedback data
