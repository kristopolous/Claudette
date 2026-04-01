## Purpose
Copy Claude's responses to clipboard, with options to select full text or individual code blocks.

## Imports
- **Stdlib**: `fs/promises` (mkdir, writeFile), `os` (tmpdir), `path` (join)
- **External**: `marked` (markdown parsing)
- **Internal**: Multiple UI components (Select, Pane, Box, Text), utilities (extractTextContent, setClipboard, getGlobalConfig, saveGlobalConfig), types (Message, AssistantMessage, CommandResultDisplay)

## Logic
1. Collects recent assistant messages (up to 20) from conversation history
2. Extracts code blocks from markdown using marked.lexer()
3. If no code blocks or `copyFullResponse` config is set, copies entire response
4. Otherwise, presents interactive picker to let user choose:
   - Full response
   - Individual code blocks (with language and line count)
   - "Always copy full response" option to set preference
5. Writes to temp file at `~/.cache/claude/response.md` as fallback
6. Sends to clipboard via OSC 52 escape sequence
7. Supports keyboard shortcuts: Enter (copy), W (write to file), Esc (cancel)

## Exports
- `call` - LocalJSXCommandCall async function that returns React component or null
