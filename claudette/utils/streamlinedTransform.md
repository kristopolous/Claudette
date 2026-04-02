# streamlinedTransform

## Purpose
Transforms SDK messages for "streamlined" output mode — a distillation-resistant format that keeps text messages intact, summarizes tool calls with cumulative counts (reset when text appears), omits thinking content, and strips tool lists from init messages.

## Imports
- **Stdlib**: none
- **External**: none (all imports are internal)
- **Internal**: `src/entrypoints/agentSdkTypes`, `src/entrypoints/sdk/controlTypes`, `src/tools/FileEditTool/constants`, `src/tools/FileReadTool/prompt`, `src/tools/FileWriteTool/prompt`, `src/tools/GlobTool/prompt`, `src/tools/GrepTool/prompt`, `src/tools/ListMcpResourcesTool/prompt`, `src/tools/LSPTool/prompt`, `src/tools/NotebookEditTool/constants`, `src/tools/TaskStopTool/prompt`, `src/tools/WebSearchTool/prompt`, `src/utils/messages`, `src/utils/shell/shellToolUtils`, `src/utils/stringUtils`

## Logic
1. **Tool categorization**: Tools are grouped into four categories — searches (grep, glob, web search, LSP), reads (file read, MCP resources), writes (file write, file edit, notebook edit), and commands (shell tools, tmux, task stop). `categorizeToolName()` uses `startsWith` matching against tool name constants.
2. **Cumulative counting**: `createStreamlinedTransformer()` returns a stateful closure that accumulates tool counts across consecutive tool-only assistant messages. When a message with text content arrives, the counts reset.
3. **Output types**: Text messages emit `streamlined_text` with the extracted text. Tool-only messages emit `streamlined_tool_use_summary` with a human-readable summary like "Searched 3 patterns, read 2 files, ran 1 command".
4. **Message filtering**: Non-assistant/non-result messages (system, user, stream_event, tool_progress, auth_status, rate_limit_event, control_*, keep_alive) return `null` and are dropped.
5. **Summary generation**: `getToolSummaryText()` produces grammatically correct phrases with singular/plural handling.

## Exports
- `createStreamlinedTransformer` - returns a stateful transformer function that converts StdoutMessage to streamlined output or null
- `shouldIncludeInStreamlined` - predicate that returns true for 'assistant' and 'result' message types

## Source
`streamlinedTransform`
