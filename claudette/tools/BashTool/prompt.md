## Purpose
Prompt generation module for BashTool that creates LLM prompts for various bash operations and validations.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: 
  - `shouldUseSandbox` (BashTool/shouldUseSandbox)
  - `toolName` (BashTool/toolName)
  - `utils` (BashTool/utils)
  - `sedValidation` (BashTool/sedValidation)
  - `pathValidation` (BashTool/pathValidation)
  - `readOnlyValidation` (BashTool/readOnlyValidation)
  - `destructiveCommandWarning` (BashTool/destructiveCommandWarning)
  - `sedEditParser` (BashTool/sedEditParser)
  - `commentLabel` (BashTool/commentLabel)

## Logic
Provides specialized prompt generators for bash operations including directory creation, file removal, sed edits, and command execution. Each function returns a formatted prompt string that guides the LLM on proper usage, safety checks, and validation requirements. The module also defines constants for plan mode transitions and includes helper functions for constructing prompts that incorporate validation results, sandbox status, and command-specific guidelines.

## Exports
- `mkdirPrompt` - Generates prompt for mkdir command with validation messages
- `rmPrompt` - Generates prompt for rm command with validation and warnings
- `rmdirPrompt` - Generates prompt for rmdir command
- `mvPrompt` - Generates prompt for mv command
- `cpPrompt` - Generates prompt for cp command
- `findPrompt` - Generates prompt for find command
- `EXIT_PLAN_MODE_PROMPT` - Constant prompt text for exiting plan mode
- `getCommandPrompt` - Generates prompt for general command execution with validation
- `getSedPrompt` - Generates prompt specifically for sed edit operations
- `getPromptWithOverwriteCheck` - Generates prompt with file overwrite validation
- `getPromptWithSandboxCheck` - Generates prompt with sandbox environment notice
- `getPromptWithReadOnlyCheck` - Generates prompt with read-only file system warning
