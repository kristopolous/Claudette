# FileWriteTool/prompt.ts

## Purpose

Provides tool name, description, and instructions for the Write tool, including pre-read requirement.

## Imports

- **Internal**: `FILE_READ_TOOL_NAME` from FileReadTool/prompt

## Logic

Exports:
- `FILE_WRITE_TOOL_NAME` = 'Write'
- `DESCRIPTION` = 'Write a file to the local filesystem.'
- `getWriteToolDescription(): string`: Returns detailed usage notes:
  - Overwrites existing files; pre-read requirement (must use Read first or tool fails)
  - Prefer Edit tool for modifications; only use Write for new files or complete rewrites
  - Never create documentation (*.md) or README unless explicitly requested
  - Only use emojis if explicitly requested

The pre-read instruction is conditionally added.

## Exports

- `FILE_WRITE_TOOL_NAME: string`
- `DESCRIPTION: string`
- `getWriteToolDescription(): string`
