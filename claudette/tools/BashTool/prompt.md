## Purpose
Provides utility functions for retrieving timeout settings used in BashTool prompts.

## Imports
- **External**: `bun:bundle`
- **Internal**:
  - `constants/prompts` - `prependBullets`
  - `utils/attribution` - `getAttributionTexts`
  - `utils/embeddedTools` - `hasEmbeddedSearchTools`
  - `utils/envUtils` - `isEnvTruthy`
  - `utils/gitSettings` - `shouldIncludeGitInstructions`
  - `utils/permissions/filesystem` - `getClaudeTempDir`
  - `utils/sandbox/sandbox-adapter` - `SandboxManager`
  - `utils/slowOperations` - `jsonStringify`
  - `utils/timeouts` - `getDefaultBashTimeoutMs`, `getMaxBashTimeoutMs`
  - `utils/undercover` - `getUndercoverInstructions`, `isUndercover`
  - `AgentTool/constants` - `AGENT_TOOL_NAME`
  - `FileEditTool/constants` - `FILE_EDIT_TOOL_NAME`
  - `FileReadTool/prompt` - `FILE_READ_TOOL_NAME`
  - `FileWriteTool/prompt` - `FILE_WRITE_TOOL_NAME`
  - `GlobTool/prompt` - `GLOB_TOOL_NAME`
  - `GrepTool/prompt` - `GREP_TOOL_NAME`
  - `TodoWriteTool/TodoWriteTool` - `TodoWriteTool`
  - `BashTool/toolName` - `BASH_TOOL_NAME`

## Logic
This module exports two functions for timeout configuration:
- `getDefaultTimeoutMs()` returns the default timeout for bash commands (from `getDefaultBashTimeoutMs`).
- `getMaxTimeoutMs()` returns the maximum allowed timeout (from `getMaxBashTimeoutMs`).

The file also contains extensive internal functions (`getSimplePrompt`, `getCommitAndPRInstructions`, `getSimpleSandboxSection`, etc.) that build the complete Bash tool system prompt. These internal functions combine tool usage guidelines, sandbox restrictions, git protocols, and context-specific instructions to produce the final prompt string used by the tool. 

## Exports
- `getDefaultTimeoutMs(): number`
- `getMaxTimeoutMs(): number`
