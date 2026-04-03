## Purpose
Renders a review screen that displays all answered questions before final submission, with options to submit or cancel.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `figures`
- **Internal**: `Box`, `Text`, `Question`, `PermissionDecision`, `Select`, `Divider`, `PermissionRequestTitle`, `PermissionRuleExplanation`, `QuestionNavigationBar`

## Logic
1. Displays a navigation bar showing all questions with their answered status
2. Shows a warning if not all questions have been answered
3. Renders each question-answer pair in a formatted list
4. Displays permission rule explanation context
5. Provides a select component with "Submit answers" and "Cancel" options for final response

## Exports
- `SubmitQuestionsView` - renders the final review and submission screen for answered questions
