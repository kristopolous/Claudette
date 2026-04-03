# tools/AskUserQuestionTool/AskUserQuestionTool

## Purpose
Tool for prompting users with multiple-choice questions, supporting single or multi-select answers with optional preview content and annotations.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS, `react`, `zod/v4`
- **Internal**:
  - State: `getAllowedChannels`, `getQuestionPreviewFormat`
  - Components: `MessageResponse`
  - Constants: `BLACK_CIRCLE`
  - Utils: `getModeColor`
  - UI: `Box`, `Text`
  - Tool: `buildTool`, `ToolDef`, `Tool` (type)
  - Utils: `lazySchema`
  - Local: `ASK_USER_QUESTION_TOOL_CHIP_WIDTH`, `ASK_USER_QUESTION_TOOL_NAME`, `ASK_USER_QUESTION_TOOL_PROMPT`, `DESCRIPTION`, `PREVIEW_FEATURE_PROMPT`

## Logic
1. Defines schemas for question options (label, description, optional preview) and questions (question text, header, options array, multiSelect flag).
2. Enforces uniqueness of question texts and option labels within each question.
3. Limits to 1-4 questions with 2-4 options each.
4. Validates HTML previews to ensure they are fragments without executable content when preview format is HTML.
5. The tool is disabled when channels are active (KAIROS/Telegram/Discord) to avoid hanging.
6. Permissions always return 'ask' behavior.
7. `call()` returns the questions asked, answers (mapping question text to answer string), and optional annotations.
8. `mapToolResultToToolResultBlockParam` formats the answer string with preview and notes if present.
9. The tool integrates with the UI via rendering functions.

## Exports
- `AskUserQuestionTool` - Main tool definition
- `_sdkInputSchema` - input schema for SDK consumers
- `_sdkOutputSchema` - output schema for SDK consumers
- `Question` - Type for question object
- `QuestionOption` - Type for option object
- `Output` - Type for tool output
