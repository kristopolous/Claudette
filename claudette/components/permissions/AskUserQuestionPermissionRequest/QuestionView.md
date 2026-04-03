## Purpose
Renders a single question view with selectable options, text input, image paste support, and footer actions for responding to the inference provider.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `figures`
- **Internal**: `KeyboardEvent`, `Box`, `Text`, `useAppState`, `Question`, `QuestionOption`, `PastedContent`, `getExternalEditor`, `toIDEDisplayName`, `ImageDimensions`, `editPromptInEditor`, `OptionWithDescription`, `Select`, `SelectMulti`, `Divider`, `FilePathLink`, `PermissionRequestTitle`, `PreviewQuestionView`, `QuestionNavigationBar`, `QuestionState`

## Logic
1. Determines if the question has preview options to render either PreviewQuestionView or inline select components
2. Manages footer focus state for keyboard navigation between "Chat about this" and plan interview options
3. Handles keyboard events for up/down navigation, selection, escape, and external editor invocation
4. Supports single-select and multi-select modes with an "Other" text input option
5. Displays plan mode indicator when in plan mode with a link to the plan file

## Exports
- `QuestionView` - renders a question with options, text input, image attachments, and navigation footer
