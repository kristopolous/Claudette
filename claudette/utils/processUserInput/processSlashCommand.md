# processSlashCommand

## Purpose
Processes slash commands (/command args). Routes to command handlers based on type (local-jsx, local, prompt), supports forked sub-agent execution, handles MCP commands, and manages progress UI and telemetry.

## Imports
- **Stdlib**: bun:bundle, crypto
- **External**: @anthropic-ai/sdk/resources
- **Internal**: ../../bootstrap/state, ../../constants/xml, ../../hooks/useCanUseTool, ../../services/analytics, ../../services/api/dumpPrompts, ../../services/compact/compact, ../../services/compact/microCompact, ../../tools/AgentTool/AgentTool, ../../tools/AgentTool/runAgent, ../../tools/AgentTool/UI, ../abortController, ../agentContext, ../attachments, ../debug, ../envUtils, ../errors, ../file, ../forkedAgent, ../fsOperations, ../fullscreen, ../generators, ../hooks/registerSkillHooks, ../log, ../messageQueueManager, ../messages, ../model/aliases, ../permissions/permissionSetup, ../permissions/permissions, ../plugins/pluginIdentifier, ../settings/pluginOnlyPolicy, ../slashCommandParsing, ../sleep, ../suggestions/skillUsageTracking, ../telemetry/events, ../telemetry/pluginTelemetry, ../tokens, ../uuid, ../workloadContext, ./processUserInput

## Logic
1. `processSlashCommand()` is the main entry point. Parses input with parseSlashCommand(), validates command exists (falls back to treating as regular prompt if not), routes to getMessagesForSlashCommand().
2. `getMessagesForSlashCommand()` handles three command types:
   - 'local-jsx': Loads JSX module, calls with onDone callback. Supports display modes (skip/system), fullscreen dismissal, and error recovery.
   - 'local': Loads module, calls with args. Supports 'skip' and 'compact' result types. Resets microcompact state on compact.
   - 'prompt': Checks for fork mode (executeForkedSlashCommand) or regular prompt slash command.
3. `executeForkedSlashCommand()` runs commands in background sub-agents. In KAIROS mode, fires asynchronously and re-enqueues results as meta prompts. Waits for MCP servers to settle (200ms poll, 10s timeout). Shows progress UI with agent messages.
4. `getMessagesForPromptSlashCommand()` loads skill content via command.getPromptForCommand(), registers skill hooks, records invoked skill for compaction preservation, extracts attachments, and builds messages with metadata and tool permissions.
5. `processPromptSlashCommand()` Entry point for model-invoked slash commands (not user-invoked). Validates command exists and is 'prompt' type.
6. `looksLikeCommand()` validates command name format (only [a-zA-Z0-9:_-]).
7. Formatting helpers: formatCommandInput, formatSkillLoadingMetadata, formatSlashCommandLoadingMetadata, formatCommandLoadingMetadata — build XML metadata for command/skill loading messages.

## Exports
- `looksLikeCommand` - Validates command name format (alphanumeric, colons, hyphens, underscores only)
- `processSlashCommand` - Main entry point: processes user slash command input, returns ProcessUserInputBaseResult
- `formatSkillLoadingMetadata` - Formats XML metadata for skill loading messages
- `processPromptSlashCommand` - Entry point for model-invoked prompt slash commands

## Source
`processSlashCommand`
