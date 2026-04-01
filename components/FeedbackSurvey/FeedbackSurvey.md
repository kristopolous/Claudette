## Purpose
A UI module that manages the lifecycle of post-session feedback surveys, including sentiment collection, optional transcript sharing prompts, and follow-up interaction routing.

## Imports
- **Internal**: 
    - UI: `ink`, `FeedbackSurveyView`, `TranscriptSharePrompt`
    - Logic/State: `services/analytics`, `useDebouncedDigitInput`, `utils`

## Logic
1. **State-Driven Rendering**: The module acts as a state machine, switching between different views based on the survey lifecycle:
    - **Open**: Displays the initial sentiment collection interface.
    - **Transcript Prompt**: Asks the user if they want to share their conversation transcript for diagnostic purposes.
    - **Submitting/Submitted**: Shows progress indicators and success confirmation during and after data transmission.
    - **Thanks**: Displays a final gratitude message with optional follow-up actions.
2. **Sentiment Logic**: 
    - Analyzes the user's initial response (e.g., "good" or "bad") to determine the appropriate follow-up path.
    - If a "good" response is received, it offers a shortcut to provide detailed praise.
    - If a "bad" response is received, it suggests using specific reporting commands for deeper investigation.
3. **Input Handling**: 
    - Utilizes debounced digit input for quick, single-key responses (e.g., pressing "1" to confirm or select an option).
    - Validates inputs against state-specific allowed values to prevent accidental transitions.
4. **Analytics Integration**: Logs feedback events, including sentiment and transcript sharing decisions, to assist in long-term model and tool improvement.

## Exports
- `FeedbackSurvey` - The primary controller for the feedback collection interface.
