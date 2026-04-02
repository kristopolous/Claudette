# tools/GrepTool/prompt.ts

## Purpose
Provides tool name, description, and usage instructions for the Grep tool (ripgrep-based search).

## Imports
- **Internal**:
  - `AGENT_TOOL_NAME` from AgentTool/constants
  - `BASH_TOOL_NAME` from BashTool/toolName

## Logic
Exports:
- `GREP_TOOL_NAME` = 'Grep'
- `getDescription(): string`: Returns a multi-line description covering:
  - Powerful search built on ripgrep.
  - Usage notes:
    - ALWAYS use Grep tool, never raw grep/rg via Bash.
    - Full regex syntax supported.
    - Filter files with `glob` or `type` parameters.
    - Output modes: content (matching lines), files_with_matches (default), count (match counts).
    - Use Agent tool for open-ended multi-round searches.
    - Pattern syntax: ripgrep, not grep; escape literal braces (e.g., `interface\\{\\{\\}` for Go).
    - Multiline matching: default single-line only; use `multiline: true` for cross-line patterns.

The description serves both as tool metadata and part of the prompt.

## Exports
- `GREP_TOOL_NAME` (string)
- `getDescription(): string`
