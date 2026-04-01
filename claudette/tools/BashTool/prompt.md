# tools/BashTool/prompt

## Purpose
Provides utility functions for retrieving timeout settings and generating the Bash tool system prompt.

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
- `getDefaultTimeoutMs()` - returns default timeout (from getDefaultBashTimeoutMs)
- `getMaxTimeoutMs()` - returns maximum allowed timeout (from getMaxBashTimeoutMs)
- `getSimplePrompt()` - generates the complete Bash tool system prompt, including:
  - Tool usage guidelines and preference for dedicated tools over bash
  - Instructions for multiple commands, git operations, sleep avoidance
  - Sandbox section with restrictions and override guidance
  - Git instructions (ant vs external), commit/PR guidelines
  - Background task note

## Exports
- `getDefaultTimeoutMs(): number`
- `getMaxTimeoutMs(): number`
- `getSimplePrompt(): string`
