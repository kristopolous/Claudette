## Purpose
Copies Claude's last response to clipboard, with options to select code blocks or full text.

## Imports
- **Stdlib**: `fs/promises`, `os`, `path`
- **External**: `marked`, REACT
- **Internal**: Many components (Select, Byline, KeyboardShortcutHint, Pane), `setClipboard`, `logEvent`, `LocalJSXCommandCall`, `Message` types, `getGlobalConfig`, `saveGlobalConfig`, `extractTextContent`, `stripPromptXMLTags`, `countCharInString`

## Logic
`collectRecentAssistantTexts` walks message history (up to 20 turns) to collect assistant responses. `extractCodeBlocks` lexes markdown to find code blocks with language. `copyOrWriteToFile` copies to clipboard via OSC 52 and writes a fallback file in temp dir. `CopyPicker` component presents options: full response, individual code blocks, or "always copy full" (sets config). `call` determines what to copy: if no code blocks or config.copyFullResponse set, copies full text directly; else shows picker. Handles `/copy N` for Nth-latest message.

## Exports
- `call` - JSX command function
- `collectRecentAssistantTexts` - Helper
- `extractCodeBlocks` - Helper
- `fileExtension` - Helper to get extension from language
