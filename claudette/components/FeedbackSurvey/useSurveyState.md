## Purpose
A state management utility for feedback surveys that orchestrates the transitions between different survey stages, including selection, transcript sharing prompts, and submission confirmation.

## Imports
- **Stdlib**: `crypto` (for unique identifiers)
- **External**: `ui-framework` (e.g., REACT)
- **Internal**: `components/FeedbackSurvey/TranscriptSharePrompt`, `components/FeedbackSurvey/utils`

## Logic
1. **State Machine**: Maintains the current stage of the survey lifecycle (`closed`, `open`, `thanks`, `transcript_prompt`, `submitting`, `submitted`).
2. **Identification**: Generates a unique "appearance ID" whenever a survey is opened to track a specific survey interaction.
3. **Response Handling**:
    - When a user selects a feedback option, it determines whether to show a follow-up transcript sharing prompt based on configurable logic.
    - If no prompt is needed, it transitions to a "thanks" state and then automatically closes.
4. **Transcript Integration**:
    - Handles the user's decision to share or decline sharing their session transcript.
    - If the user agrees to share, it enters a "submitting" state and waits for the asynchronous upload to complete before showing a final confirmation.
5. **Auto-Cleanup**: Automatically reverts to the `closed` state after a configurable delay when the survey is finished or dismissed.

## Exports
- `useSurveyState` - A hook/utility that provides the current survey state, the last response, and handlers for opening and responding to the survey.
- `SurveyState` - Type representing the possible phases of the survey interaction.
- `UseSurveyStateOptions` - Configuration interface for event callbacks and timing.
