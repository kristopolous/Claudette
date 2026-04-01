# tools/AskUserQuestionTool/AskUserQuestionTool

## Purpose
Tool for prompting users with multiple-choice questions, supporting single or multi-select answers with optional preview content and annotations.

## Imports
- **Internal**: 
  - State: `getAllowedChannels`, `getQuestionPreviewFormat`
  - Components: `MessageResponse`
  - Constants: `BLACK_CIRCLE`
  - Utils: `getModeColor`
  - External: `zod/v4`
  - UI: `Box`, `Text` (from ink)
  - Tool: `buildTool`, `ToolDef`, `Tool`
  - Utils: `lazySchema`
  - Local: `ASK_USER_QUESTION_TOOL_CHIP_WIDTH`, `ASK_USER_QUESTION_TOOL_NAME`, `ASK_USER_QUESTION_TOOL_PROMPT`, `DESCRIPTION`, `PREVIEW_FEATURE_PROMPT`

## Logic
1. Defines schemas for questions, options (label, description, optional preview), and annotations
2. Validates HTML previews (must be fragment, no script/style tags)
3. Enforces uniqueness of question texts and option labels
4. Supports 1-4 questions with 2-4 options each
5. Multi-select enabled via flag
6. Requires user interaction; disabled when channels are active
7. Permissions: always 'ask' behavior (user confirmation)
8. UI: renders question dialog; result message shows answers
9. call() returns questions, answers (question text → answer string), and optional annotations
10. mapToolResultToToolResultBlockParam formats answer string with preview/notes if present

## Exports
- `AskUserQuestionTool` - Main tool definition
- `Question` - Type for question (question, header, options[], multiSelect?)
- `QuestionOption` - Type for option (label, description, preview?)
- `Output` - Output type (questions, answers, annotations?)
- `_sdkInputSchema` - SDK-facing input schema
- `_sdkOutputSchema` - SDK-facing output schema
