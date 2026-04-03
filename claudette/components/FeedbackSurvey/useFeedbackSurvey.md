## Purpose
A complex UI hook that implements the business logic and pacing for showing feedback surveys and transcript sharing prompts based on user interaction, session duration, and remote configuration.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., REACT)
- **Internal**: `hooks/useDynamicConfig`, `services/analytics`, `services/policyLimits`, `types/message`, `utils/config`, `utils/envUtils`, `utils/messages`, `utils/model/model`, `utils/settings/settings`, `utils/telemetry/events`, `components/FeedbackSurvey/submitTranscriptShare`, `components/FeedbackSurvey/TranscriptSharePrompt`, `components/FeedbackSurvey/useSurveyState`, `components/FeedbackSurvey/utils`

## Logic
1. **Pacing and Eligibility**:
    - Evaluates multiple conditions before showing a survey: minimum time since session start, minimum user turns, minimum time between surveys (session-local and global), and specific model compatibility.
    - Respects environment variable and organizational policy overrides (e.g., ZDR).
    - Prevents showing surveys while the user is actively interacting with other prompts (permissions, questions).
2. **Probability Gating**:
    - Uses a "roll once per eligibility window" strategy to ensure surveys don't become inevitable across multiple re-renders.
    - Fetch configurations from a dynamic remote source (GrowthBook) to adjust probabilities and pacing on the fly.
3. **Analytics Integration**:
    - Logs detailed events for survey appearances, responses, and transcript sharing steps to both internal analytics and OpenTelemetry sinks.
4. **Transcript Sharing Orchestration**:
    - Logic for deciding whether to prompt for transcript sharing based on the survey rating ("good" vs "bad") and additional probability rolls.
    - Coordinates with the submission utility to upload redacted data when the user consents.
5. **State Synchronization**:
    - Persists the timestamp of the last survey shown to a global configuration file to maintain pacing across different application restarts.

## Exports
- `useFeedbackSurvey` - The primary hook managing the lifecycle, logic, and telemetry of the feedback survey system.
