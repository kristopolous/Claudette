## Purpose
Renders a side-by-side question view with a vertical option list on the left and a preview panel on the right for questions that have preview content.

## Imports
- **Stdlib**: none
- **External**: REACT, `figures`
- **Internal**: `useTerminalSize`, `KeyboardEvent`, `Box`, `Text`, `useKeybinding`, `useKeybindings`, `useAppState`, `Question`, `getExternalEditor`, `toIDEDisplayName`, `editPromptInEditor`, `Divider`, `TextInput`, `PermissionRequestTitle`, `PreviewBox`, `QuestionNavigationBar`, `QuestionState`

## Logic
1. Displays options as a numbered vertical list on the left panel with focus and selection indicators
2. Shows the focused option's preview content in a PreviewBox on the right panel
3. Supports a notes input field activated by pressing 'n' for adding annotations to selections
4. Handles keyboard navigation for options (up/down), notes (escape to exit), footer (up/down/enter), and question tabs
5. Computes preview max lines based on parent height budget to prevent terminal overflow
6. Supports external editor integration via ctrl+g for editing notes

## Exports
- `PreviewQuestionView` - renders a side-by-side layout with option list and preview panel for questions with preview content
