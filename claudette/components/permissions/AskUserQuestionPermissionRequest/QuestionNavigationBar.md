## Purpose
Renders a tab-based navigation bar showing all questions with their answered status, allowing users to switch between questions.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `figures`
- **Internal**: `useTerminalSize`, `stringWidth`, `Box`, `Text`, `Question`, `truncateToWidth`

## Logic
1. Calculates available width for tab headers based on terminal columns and fixed-width elements
2. Truncates tab headers when total width exceeds available space, prioritizing the current question tab
3. Displays checkboxes showing answered status for each question
4. Highlights the currently active question tab with inverse colors
5. Shows a submit tab when not hidden, with active styling when on the submit view

## Exports
- `QuestionNavigationBar` - renders a horizontal navigation bar with question tabs, answered indicators, and optional submit tab
