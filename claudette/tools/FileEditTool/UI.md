# FileEditTool/UI.tsx

## Purpose

Renders UI components for file edit tool messages including use, result, rejected, and error states in the terminal interface.

## Imports

- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`, `@anthropic-ai/sdk/resources/index.mjs`, `diff`
- **Internal**: `src/components/FileEditToolUseRejectedMessage`, `src/components/MessageResponse`, `src/utils/messages`, `components/FallbackToolUseErrorMessage`, `components/FileEditToolUpdatedMessage`, `components/FilePathLink`, `ink`, `Tool`, `types/message`, `utils/diff`, `utils/file`, `utils/log`, `utils/plans`, `utils/readEditContext`, `utils/stringUtils`, `utils/theme`, `FileEditTool/types`, `FileEditTool/utils`

## Logic

1. Determines user-facing action name (Create, Update, Updated plan) based on input properties
2. Generates tool use summary showing the display path of the file being edited
3. Renders tool use message with file path link, omitting path for plan files
4. Renders tool result message showing diff of changes with optional plan file hint
5. Renders rejection message with content preview for new files or diff for existing files
6. Renders error message with simplified text for common errors like unread files or missing files
7. Loads rejection diff asynchronously with chunked file read around edit context
8. Adjusts hunk line numbers for truncated file reads in rejection diffs

## Exports

- `userFacingName(input: Partial<{ file_path: string; old_string: string; new_string: string; replace_all: boolean; edits: unknown[]; }> | undefined): string`
- `getToolUseSummary(input: Partial<{ file_path: string; old_string: string; new_string: string; replace_all: boolean; }> | undefined): string | null`
- `renderToolUseMessage({ file_path }?: { file_path?: string }, { verbose }: { verbose: boolean }): React.ReactNode`
- `renderToolResultMessage({ filePath, structuredPatch, originalFile }: FileEditOutput, _progressMessagesForMessage: ProgressMessage[], { style, verbose }: { style?: 'condensed'; verbose: boolean }): React.ReactNode`
- `renderToolUseRejectedMessage(input: { file_path: string; old_string?: string; new_string?: string; replace_all?: boolean; edits?: unknown[] }, options: { columns: number; messages: Message[]; progressMessagesForMessage: ProgressMessage[]; style?: 'condensed'; theme: ThemeName; tools: Tools; verbose: boolean }): React.ReactElement`
- `renderToolUseErrorMessage(result: ToolResultBlockParam['content'], options: { progressMessagesForMessage: ProgressMessage[]; tools: Tools; verbose: boolean }): React.ReactElement`
