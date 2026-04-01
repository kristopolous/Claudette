## Purpose
Provides a concise codebase summary for the user with a strategic plan to tackle the task.

## Imports
- **Internal**: `Command` type, `getProjectPath`, `getCurrentTask`, `formatAsPlan`, `createMovedToPluginCommand`

## Logic
Uses a markdown prompt embedded in the command to guide the assistant in analyzing the codebase and creating a plan. The prompt asks for: clear problem statement, relevant file analysis, detailed step-by-step plan with file paths and code snippets, and time estimates. The plan is formatted as a structured markdown document. This command is implemented as a plugin command that can be moved to the marketplace.

## Exports
- `default` - Command object created by `createMovedToPluginCommand` for 'brief' command
