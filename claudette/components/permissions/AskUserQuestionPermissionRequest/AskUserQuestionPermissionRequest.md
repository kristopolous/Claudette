## Purpose
Renders a permission request dialog that prompts the user to answer one or more questions posed by the inference provider.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `@anthropic-ai/sdk/resources/messages.mjs` (Base64ImageSource, ImageBlockParam)
- **Internal**: `useSettings`, `useTerminalSize`, `stringWidth`, `useTheme`, `useKeybindings`, `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS`, `logEvent`, `useAppState`, `Question`, `AskUserQuestionTool`, `CliHighlight`, `getCliHighlightPromise`, `PastedContent`, `ImageDimensions`, `maybeResizeAndDownsampleImageBlock`, `cacheImagePath`, `storeImage`, `logError`, `applyMarkdown`, `isPlanModeInterviewPhaseEnabled`, `getPlanFilePath`, `PermissionRequestProps`, `QuestionView`, `SubmitQuestionsView`, `useMultipleChoiceState`

## Logic
1. Parses and validates incoming tool input using the AskUserQuestionTool schema
2. Calculates optimal content dimensions based on terminal size and preview content
3. Manages image paste handling with caching and storage
4. Tracks multi-question navigation state via useMultipleChoiceState hook
5. Handles submit, cancel, respond-to-inference-provider, and finish-plan-interview actions with analytics logging
6. Renders either QuestionView for individual questions or SubmitQuestionsView for the final review

## Exports
- `AskUserQuestionPermissionRequest` - main component that conditionally renders with or without syntax highlighting based on settings
