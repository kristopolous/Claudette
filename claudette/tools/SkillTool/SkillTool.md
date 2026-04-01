## Purpose
Tool for executing skills (slash commands) either inline or in a forked sub-agent context, supporting both local and remote marketplace skills.

## Imports
- **External**: `zod/v4`, `@anthropic-ai/sdk`, `lodash-es/uniqBy`
- **Internal**: 
  - Bootstrap: `getProjectRoot`
  - Commands: `builtInCommandNames`, `findCommand`, `getCommands`, `PromptCommand`
  - Tool: `buildTool`, `ToolDef`, `Tool`, `ToolCallProgress`, `ToolResult`, `ToolUseContext`, `ValidationResult`
  - Types: `Command`, `AssistantMessage`, `AttachmentMessage`, `Message`, `SystemMessage`, `UserMessage`, `ModelAlias`
  - Utils: `logForDebugging`, `PermissionDecision`, `getRuleByContentsForTool`, `isOfficialMarketplaceName`, `parsePluginIdentifier`, `buildPluginCommandTelemetryFields`, `lazySchema`, `getAgentContext`, `errorMessage`, `extractResultText`, `prepareForkedCommandContext`, `parseFrontmatter`, `createUserMessage`, `normalizeMessages`, `resolveSkillModelOverride`, `recordSkillUsage`, `createAgentId`, `runAgent`, `getToolUseIDFromParentMessage`, `tagMessagesWithToolUseID`
  - Analytics: `logEvent`, types
  - Constants: `COMMAND_MESSAGE_TAG`
  - Hooks: `CanUseToolFn`
  - Local: `SKILL_TOOL_NAME`, `getPrompt`, `renderToolResultMessage`, `renderToolUseErrorMessage`, `renderToolUseMessage`, `renderToolUseProgressMessage`, `renderToolUseRejectedMessage`
  - Remote skill modules (conditional): remoteSkillState, remoteSkillLoader, telemetry, featureCheck

## Logic
1. Validates skill name format and existence
2. Checks if skill has disableModelInvocation flag or is non-prompt type
3. Handles remote canonical skills (ant-only experimental)
4. Permission check: deny rules, auto-allow for safe properties, ask by default
5. Execution paths:
   - Forked (context='fork'): runs in isolated sub-agent with own token budget
   - Inline: expands command into prompt via processPromptSlashCommand
   - Remote: loads from AKI/GCS and injects as user message
6. Applies context modifications: allowed tools, model override, effort level
7. Tracks telemetry for skill invocations and remote skill loading
8. Returns result with success status, command name, and optional agent ID/result for forked

## Exports
- `SkillTool` - Main tool definition with progress support
- `Input` - Type for input (skill, optional args)
- `Output` - Union type for inline or forked output
- `Progress` - Type alias for SkillToolProgress (re-exported)
- Helper: `getAllCommands` (combines local and MCP skills)
- Helper: `skillHasOnlySafeProperties` (determines auto-allow)
- Helper: `isOfficialMarketplaceSkill`
- Helper: `extractUrlScheme`
- Helper: `executeRemoteSkill`
