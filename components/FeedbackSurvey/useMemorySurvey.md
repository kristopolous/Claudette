## Purpose
A specialized UI hook that triggers a feedback survey specifically targeting the user's experience with the application's "memory" or persistent context features.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react)
- **Internal**: `services/analytics`, `services/policyLimits`, `tools/FileReadTool`, `types/message`, `utils/config`, `utils/envUtils`, `utils/memoryFileDetection`, `utils/messages`, `utils/telemetry/events`, `components/FeedbackSurvey/submitTranscriptShare`, `components/FeedbackSurvey/TranscriptSharePrompt`, `components/FeedbackSurvey/useSurveyState`, `components/FeedbackSurvey/utils`

## Logic
1. **Memory Usage Detection**: 
    - Scans the conversation history for evidence that the assistant has accessed auto-managed memory files (via specific tool calls).
    - Uses a regex to detect keywords like "memory" or "memories" in the assistant's responses.
2. **Triggering Conditions**:
    - Only activates if a memory-related interaction is detected.
    - Respects global survey disabling flags, organizational policies (ZDR), and environment variables.
    - Implements a probability gate (default 20%) to avoid over-surveying users.
    - Ensures a survey is only rolled for once per unique assistant response to prevent re-triggering on every UI re-render.
3. **Analytics and Transcript Sharing**:
    - Integrates with the standard survey state machine for handling responses.
    - Includes logic for transcript sharing requests, specifically triggered by the "memory survey" context.
    - Logs appearances and responses to analytics platforms with a "memory" survey type.
4. **Session Management**:
    - Resets internal tracking (seen messages, observed memory reads) if the conversation history is cleared.

## Exports
- `useMemorySurvey` - A hook that monitors conversation context for memory usage and manages the lifecycle of the memory-specific feedback survey.
