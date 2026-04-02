# toolValidationConfig

## Purpose
Configuration for tool-specific permission rule validation. Most tools need no configuration — basic validation works automatically. Only tools with special pattern requirements are listed here.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
Defines three categories of validation configuration:
1. **File pattern tools** — tools that accept file glob patterns (`*.ts`, `src/**`): Read, Write, Edit, Glob, NotebookRead, NotebookEdit
2. **Bash prefix tools** — tools that accept bash wildcard patterns and legacy `:*` prefix syntax: Bash
3. **Custom validation** — tool-specific validation functions:
   - `WebSearch`: rejects wildcards (`*`, `?`), requires exact search terms
   - `WebFetch`: rejects URL formats, requires `domain:hostname` format, allows wildcards in domain patterns

Three helper functions provide lookup into the config.

## Exports
- `ToolValidationConfig` — type defining the config shape (`filePatternTools`, `bashPrefixTools`, `customValidation`)
- `TOOL_VALIDATION_CONFIG` — the config object with file pattern tools, bash tools, and custom validators for WebSearch and WebFetch
- `isFilePatternTool(toolName)` — returns true if the tool accepts file glob patterns
- `isBashPrefixTool(toolName)` — returns true if the tool accepts bash wildcard/`:*` patterns
- `getCustomValidation(toolName)` — returns the custom validation function for a tool, or undefined
