## Purpose
Generates permission option labels and configurations for file operations, with special handling for .claude folder paths and input modes.

## Imports
- **Stdlib**: `os` (homedir), `path` (basename, join, sep)
- **External**: REACT (ReactNode)
- **Internal**: `getOriginalCwd`, `Text`, `getShortcutDisplay`, `ToolPermissionContext`, `expandPath`, `getDirectoryForPath`, `normalizeCaseForComparison`, `pathInAllowedWorkingPath`, `OptionWithDescription`

## Logic
1. Checks if a file path is within the project .claude/ folder or global ~/.claude/ folder using case-insensitive comparison
2. Generates permission options: accept-once (Yes), accept-session (with scope for .claude folders), and reject (No)
3. Shows special "allow the inference provider to edit its own settings" option for .claude folder write operations
4. Customizes session option labels based on whether the path is in the allowed working directory or outside it
5. Switches between simple option labels and input field options based on yesInputMode/noInputMode state

## Exports
- `isInClaudeFolder` - checks if a file path is within the project .claude/ folder
- `isInGlobalClaudeFolder` - checks if a file path is within the global ~/.claude/ folder
- `PermissionOption` - union type for accept-once, accept-session (with optional scope), and reject options
- `PermissionOptionWithLabel` - type combining an option with its display label and description
- `FileOperationType` - union type for read, write, and create operations
- `getFilePermissionOptions` - generates the array of permission options based on file path, context, and operation type
