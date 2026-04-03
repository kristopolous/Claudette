## Purpose
A UI hook that triggers a feedback survey after a "session memory compaction" event, gathering user feedback on the quality of the conversation after context has been compressed.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., REACT)
- **Internal**: `services/analytics`, `services/compact/sessionMemoryCompact`, `types/message`, `utils/envUtils`, `utils/messages`, `utils/telemetry/events`, `components/FeedbackSurvey/useSurveyState`, `components/FeedbackSurvey/utils`

## Logic
1. **Compaction Detection**:
    - Monitors the message list for special "boundary" messages that indicate a context compaction has occurred.
    - Tracks "seen" boundaries to avoid re-triggering the survey for the same event.
2. **Post-Event Pacing**:
    - Instead of showing the survey immediately, it waits for at least one user or assistant message to appear *after* the compaction boundary. This ensures the user has actually interacted with the "compacted" context.
3. **Triggering Conditions**:
    - Activates with a 20% probability once a post-compaction interaction is detected.
    - Respects remote feature gates (GrowthBook), global survey disabling flags, and environment variable overrides.
    - Inhibits display if other prompts are active or if the system is currently loading.
4. **Analytics Integration**:
    - Logs appearances and responses with a specific `post_compact` survey type.
    - Includes metadata about whether session memory compaction was enabled at the time of the event.
5. **State Management**:
    - Leverages the common survey state machine for handling transitions and auto-dismissal.

## Exports
- `usePostCompactSurvey` - A hook that coordinates the timing and logic for showing feedback surveys following context compaction events.
