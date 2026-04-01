# BashTool/toolName.ts

## Purpose

Exports a single constant defining the canonical tool name for the BashTool. Exists in its own file to break circular dependencies, particularly from `prompt.ts`.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic

- `BASH_TOOL_NAME`: String constant with value `'Bash'`
- Used throughout the codebase to refer to the Bash tool in prompts, messages, and cross-tool references.

## Exports

- `BASH_TOOL_NAME: string`
