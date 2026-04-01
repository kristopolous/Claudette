## Purpose
Renders the assistant's thinking blocks in terminal output, with support for compact and verbose display modes.

## Imports
- **Stdlib**: None
- **External**: react, @anthropic-ai/sdk
- **Internal**: ink (Box, Text), CtrlOToExpand, Markdown

## Logic
1. Accepts a ThinkingBlock parameter with thinking content and display flags
2. Returns null if thinking is empty or hideInTranscript is true
3. In compact mode, shows a dimmed italic "∴ Thinking" hint with Ctrl+O expand prompt
4. In verbose or transcript mode, renders the full thinking content as dimmed Markdown with a "∴ Thinking…" label

## Exports
- `AssistantThinkingMessage` - React component that renders thinking blocks with conditional truncation based on verbose/transcript mode
