# utils/attachments

## Purpose
Provides attachment creation and handling for messages, images, files, and tool results.

## Imports
- **Stdlib**: `fs/promises`, `crypto`
- **External**: `@anthropic-ai/sdk`
- **Internal**: analytics, Tool, FileReadTool, readFileInRange, path, stringUtils, array, fsOperations, hooks, TodoWriteTool, TaskCreateTool, TaskUpdateTool, BashTool, SkillTool, todo types, tasks, plans, ide, claudemd, cwd, state selectors, log, errors, diagnosticTracking, message types, textInputTypes, settings, config, model model, imageResizer

## Logic
1. `createAttachmentMessage` - creates attachment message from attachment data
2. `createFileAttachment` - creates file attachment with content preview
3. `createImageAttachment` - creates image attachment with base64 data
4. `createToolResultAttachment` - creates tool result attachment
5. `createTaskAttachment` - creates task status attachment
6. `createPlanAttachment` - creates plan attachment
7. `createMemoryAttachment` - creates memory file attachment
8. `createDiagnosticAttachment` - creates diagnostic attachment
9. `createIDEAttachment` - creates IDE selection attachment
10. `createTodoAttachment` - creates todo list attachment
11. `createSkillAttachment` - creates skill attachment
12. `getImagePasteIds` - gets image paste IDs from queued commands
13. `isValidImagePaste` - validates image paste
14. `readImageWithTokenBudget` - reads image within token budget
15. `getSnippetForTwoFileDiff` - gets diff snippet for file edit
16. `filterInjectedMemoryFiles` - filters memory files for injection
17. `getMemoryFiles` - gets memory files for context
18. `getManagedAndUserConditionalRules` - gets conditional rules

## Exports
- `createAttachmentMessage` - creates attachment message
- `createFileAttachment` - creates file attachment
- `createImageAttachment` - creates image attachment
- `createToolResultAttachment` - creates tool result attachment
- (Various attachment creation functions)
