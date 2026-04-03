## Purpose
Manages state for multi-question navigation including current question index, answers, per-question state, and text input mode.

## Imports
- **Stdlib**: none
- **External**: REACT (useCallback, useReducer)

## Logic
1. Uses a reducer pattern to manage state transitions for question navigation and answer tracking
2. Supports actions: next-question, prev-question, update-question-state, set-answer, set-text-input-mode
3. Tracks per-question state including selected values and text input values
4. Optionally auto-advances to the next question when an answer is set

## Exports
- `AnswerValue` - type alias for string answer values
- `QuestionState` - type defining selected value and text input value for a question
- `MultipleChoiceState` - type defining the full state shape with navigation and update functions
- `useMultipleChoiceState` - hook that returns current state and dispatchers for question navigation and answer management
