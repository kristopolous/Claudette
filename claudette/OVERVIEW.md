# Claudette Documentation Overview

This file helps you navigate the documentation. Find the feature you need, then follow the path to the relevant markdown files.

## Architecture at a Glance

```
main → REPL Screen → QueryEngine → query() loop → API + Tools
                                    ↘ State Store
                                    ↘ MCP Clients
```

## Feature Index

### 1. Core Conversation Loop

The heart of the system: user message → LLM → tool execution → response.

| File | What it covers |
|------|---------------|
| `QueryEngine.md` | Per-conversation state manager, owns messages/usage/permissions |
| `query.md` | The async generator loop: API calls, streaming, tool execution |
| `query/config.md` | Immutable query configuration and feature gates |
| `query/deps.md` | Dependency injection types and factory |
| `query/stopHooks.md` | Stop hooks, teammate idle hooks, task completed hooks |
| `query/tokenBudget.md` | Token usage tracking and budget-based decisions |

### 2. Tool System

Every tool the model can call. Each tool has a prompt (instructions for the model) and an implementation.

| File | What it covers |
|------|---------------|
| `Tool.md` | Core Tool interface and registry |
| `tools.md` | Registry overview, list of all built-in tools |
| `tools/BashTool/prompt.md` | Bash tool instructions + **prompt templates** |
| `tools/BashTool/readOnlyValidation.md` | Read-only command allowlist + **prompt templates** |
| `tools/FileEditTool/` | File editing tool (prompt, UI, types, constants) |
| `tools/GlobTool/` | File glob search |
| `tools/GrepTool/` | File content search |
| `tools/WebFetchTool/` | HTTP requests |
| `tools/WebSearchTool/prompt.md` | Web search instructions |
| `tools/AgentTool/` | Sub-agent spawning (built-in agents below) |
| `tools/AgentTool/built-in/verificationAgent.md` | Adversarial verification agent + **full prompt** |
| `tools/AgentTool/built-in/planAgent.md` | Software architect planning agent + **full prompt** |
| `tools/AgentTool/built-in/exploreAgent.md` | File search specialist agent + **full prompt** |
| `tools/AgentTool/built-in/generalPurposeAgent.md` | General purpose agent |
| `tools/SkillTool/` | Skill execution |
| `tools/ScheduleCronTool/` | Scheduled tasks |
| `tools/SleepTool/` | Delay execution |
| `tools/SyntheticOutputTool/` | Synthetic output |
| `tools/ConfigTool/` | Configuration tool |
| `tools/PowerShellTool/` | PowerShell execution (Windows) |
| `tools/EnterWorktreeTool/` | Git worktree enter |
| `tools/ExitWorktreeTool/` | Git worktree exit |
| `tools/TaskListTool/` | List tasks |
| `tools/TaskGetTool/` | Get task details |
| `tools/TaskOutputTool/` | Task output |
| `tools/REPLTool/` | REPL-specific operations |
| `tools/MCPTool/` | MCP tool wrapper |
| `tools/ReadMcpResourceTool/` | MCP resource reading |
| `tools/RemoteTriggerTool/` | Remote triggers |

### 3. System Prompt Construction

How the system prompt is assembled from parts.

| File | What it covers |
|------|---------------|
| `constants/prompts.md` | **All system prompt sections** (intro, system, tasks, actions, tools, tone, efficiency, MCP, scratchpad, proactive) + **26 prompt templates** |
| `constants/system.md` | System-level constants and CLI sysprompt prefixes |
| `constants/systemPromptSections.md` | Section registration and caching |
| `constants/outputStyles.md` | Output style configurations + prompt templates |
| `constants/cyberRiskInstruction.md` | Security risk warning text |
| `constants/tools.md` | Tool-related constants |
| `constants/messages.md` | Message-related constants |
| `constants/xml.md` | XML tag constants |
| `constants/files.md` | File-related constants |
| `constants/keys.md` | Key constants |
| `constants/product.md` | Product constants and URLs |
| `constants/betas.md` | Beta feature flags |
| `constants/apiLimits.md` | API rate limits |
| `constants/spinnerVerbs.md` | Spinner loading messages |
| `constants/turnCompletionVerbs.md` | Turn completion indicators |
| `constants/figures.md` | Unicode figure constants |
| `constants/errorIds.md` | Error ID constants |
| `constants/toolLimits.md` | Tool-specific limits |
| `constants/github-app.md` | GitHub app constants |
| `constants/oauth.md` | OAuth constants |

### 4. REPL / UI Components

The terminal interface built with Ink (React for CLI).

| File | What it covers |
|------|---------------|
| `ink.md` | Ink rendering engine overview |
| `ink/ink.md` | Core Ink renderer |
| `ink/terminal.md` | Terminal abstraction |
| `ink/dom.md` | DOM node creation and management |
| `ink/output.md` | Output buffer management |
| `ink/colorize.md` | ANSI color application |
| `ink/measure-text.md` | Text measurement |
| `ink/focus.md` | Focus management |
| `ink/log-update.md` | Terminal content updates |
| `ink/optimizer.md` | Render optimization |
| `ink/render-node-to-output.md` | Node-to-output rendering |
| `ink/hooks/` | UI hooks for terminal (use-input, use-app, use-stdin, etc.) |
| `components/App.md` | Root App component |
| `components/Messages.md` | Message list rendering |
| `components/Message.md` | Individual message dispatcher |
| `components/PromptInput/PromptInput.md` | User text input component |
| `components/VirtualMessageList.md` | Virtualized message list |
| `components/PermissionRequest.md` | Tool permission dialogs |
| `components/CostThresholdDialog.md` | Budget warning dialogs |
| `components/Spinner/` | Loading animations |
| `components/design-system/` | Reusable UI primitives (Dialog, Pane, Tabs, etc.) |

### 5. Commands (Slash Commands)

User-facing `/command` operations.

| File | What it covers |
|------|---------------|
| `commands.md` | Central command registry and loader |
| `commands/commit.md` | Git commit command + **prompt template** |
| `commands/security-review.md` | Security review command + **prompt template** |
| `commands/review.md` | Code review command + **prompt template** |
| `commands/insights.md` | Session insights + **10 prompt templates** |
| `commands/init-verifiers.md` | Verifier initialization + **prompt template** |
| `commands/pr_comments/` | PR comment display |
| `commands/upgrade/` | Upgrade flow |
| `commands/autoMode.md` | Auto mode handler + **prompt template** |
| `commands/model/` | Model selection |
| `commands/config/` | Configuration |
| `commands/cost/` | Cost display |
| `commands/feedback/` | Feedback submission |
| `commands/status/` | Status display |
| `commands/session/` | Session management |
| `commands/passes/` | Passes management |
| `commands/stickers/` | Stickers |
| `commands/ide/` | IDE integration |
| `commands/ultraplan.md` | Ultraplan command |
| `commands/version.md` | Version display |
| `commands/install.md` | Installation |
| `commands/release-notes/` | Release notes |
| `commands/thinkback/` | Thinkback |
| `commands/bridge/` | Bridge commands |
| `commands/plugin/` | Plugin commands |
| `commands/doctor/` | Doctor diagnostics |
| `commands/stats/` | Statistics |

### 6. State Management

| File | What it covers |
|------|---------------|
| `AppState.md` | UI state management |
| `state/store.md` | Core state store |
| `state/selectors.md` | State selectors |
| `state/onChangeAppState.md` | State change handlers |
| `state/AppStateStore.md` | UI state store |
| `state/teammateViewHelpers.md` | Teammate view helpers |
| `bootstrap/state.md` | Session-level state (sessionId, cwd, userId) |
| `context.md` | Context utilities |
| `history.md` | Command history |

### 7. Memory System (.claude/ directory)

Persistent memory across sessions.

| File | What it covers |
|------|---------------|
| `memdir/memdir.md` | Core memory management |
| `memdir/findRelevantMemories.md` | Memory retrieval |
| `memdir/memoryTypes.md` | Memory type definitions |
| `memdir/memoryScan.md` | Memory scanning |
| `memdir/memoryAge.md` | Memory aging |
| `memdir/paths.md` | Memory directory paths |
| `memdir/teamMemPrompts.md` | Team memory prompts |
| `memdir/teamMemPaths.md` | Team memory paths |

### 8. MCP Integration

Model Context Protocol for extending capabilities.

| File | What it covers |
|------|---------------|
| `services/mcp/` | MCP client, types, connections |
| `components/mcp/` | MCP UI components (settings, server menus, tool views) |

### 9. Remote / Bridge Mode

Running Claudette remotely with local permission forwarding.

| File | What it covers |
|------|---------------|
| `bridge/` | Bridge protocol, session management, permissions |
| `remote/sdkMessageAdapter.md` | SDK message adaptation |
| `remote/SessionsWebSocket.md` | WebSocket session management |
| `remote/RemoteSessionManager.md` | Remote session lifecycle |
| `remote/remotePermissionBridge.md` | Remote permission forwarding |
| `server/` | Direct connect session management |
| `coordinator/coordinatorMode.md` | Coordinator mode + **prompt templates** |
| `upstreamproxy/` | Upstream proxy and relay |

### 10. Keybindings

Customizable keyboard shortcuts.

| File | What it covers |
|------|---------------|
| `keybindings/schema.md` | Keybinding schema |
| `keybindings/parser.md` | Keybinding parser |
| `keybindings/match.md` | Key matching logic |
| `keybindings/resolver.md` | Key resolution |
| `keybindings/defaultBindings.md` | Default keybindings |
| `keybindings/loadUserBindings.md` | User binding loading |
| `keybindings/validate.md` | Validation |
| `keybindings/shortcutFormat.md` | Shortcut formatting |
| `keybindings/useShortcutDisplay.md` | Shortcut display |
| `keybindings/useKeybinding.md` | Keybinding hook |
| `keybindings/reservedShortcuts.md` | Reserved shortcuts |
| `keybindings/template.md` | Template system |
| `keybindings/KeybindingProviderSetup.md` | Provider setup |
| `keybindings/KeybindingContext.md` | Context |

### 11. Skills

Reusable prompt packages.

| File | What it covers |
|------|---------------|
| `skills/` | Skill loading, bundled skills, skill tool |
| `skills/bundled/skillify.md` | Skill capture + **prompt template** |
| `skills/bundled/updateConfig.md` | Config update skill + **prompt templates** |
| `skills/bundled/keybindings.md` | Keybindings skill + **prompt template** |

### 12. Plugins

Third-party extensibility.

| File | What it covers |
|------|---------------|
| `plugins/builtinPlugins.md` | Built-in plugin list |
| `plugins/bundled/` | Bundled plugins |
| `utils/plugins/` | Plugin loading, marketplace, validation |

### 13. Context Window Management

| File | What it covers |
|------|---------------|
| `services/compact/` | Context compaction (summarization) |
| `services/compact/prompt.md` | **8 compact prompt templates** |
| `services/compact/compact.md` | Compaction logic + **prompt template** |

### 14. Cost Tracking

| File | What it covers |
|------|---------------|
| `cost-tracker.md` | Usage tracking |
| `costHook.md` | Cost hook |

### 15. Tasks / Background Agents

| File | What it covers |
|------|---------------|
| `tasks.md` | Task system overview |
| `tasks/LocalMainSessionTask.md` | Local main session task |
| `components/tasks/` | Task UI components (dialogs, status, progress) |

### 16. Entry Points

| File | What it covers |
|------|---------------|
| `main.md` | CLI entry point |
| `entrypoints/init.md` | Initialization module |
| `entrypoints/cli.md` | CLI bootstrap |
| `entrypoints/sdk/` | SDK types and exports |
| `entrypoints/mcp.md` | MCP server entrypoint |
| `entrypoints/clix.md` | CLI extensions |
| `entrypoints/agentSdkTypes.md` | Agent SDK types |
| `entrypoints/sandboxTypes.md` | Sandbox types |

### 17. Services

| File | What it covers |
|------|---------------|
| `services/api/` | API client for inference provider |
| `services/compact/` | Context compaction |
| `services/mcp/` | MCP protocol support |
| `services/SessionMemory/prompts.md` | **3 session memory prompt templates** |
| `services/MagicDocs/prompts.md` | **2 MagicDocs prompt templates** |
| `services/lsp/` | LSP client |
| `services/notifier.md` | Notification service |
| `services/diagnosticTracking.md` | LSP diagnostic tracking |
| `services/settingsSync/` | Settings synchronization |
| `services/tips/` | Tip scheduler and registry |

### 18. Utilities

| File | What it covers |
|------|---------------|
| `utils/messages.md` | Message creation/manipulation + **14+ prompt templates** |
| `utils/sideQuestion.md` | Side question utility + **prompt template** |
| `utils/undercover.md` | Undercover mode + **prompt template** |
| `utils/agenticSessionSearch.md` | Agentic session search + **prompt template** |
| `utils/claudeInChrome/prompt.md` | Chrome integration prompts + **4 templates** |
| `utils/hooks/skillImprovement.md` | Skill improvement + **4 prompt templates** |
| `utils/mcp/dateTimeParser.md` | Date/time parser + **prompt template** |
| `utils/systemPrompt.md` | System prompt utilities |
| `utils/settings/` | Settings management |
| `utils/telemetry/` | Telemetry |
| `utils/plugins/` | Plugin utilities |

### 19. Migrations

Settings migrations between versions.

| File | What it covers |
|------|---------------|
| `migrations/` | All migration scripts (model changes, settings moves, etc.) |

### 20. Native Modules

| File | What it covers |
|------|---------------|
| `native-ts/yoga-layout/` | Yoga flexbox engine |
| `native-ts/color-diff/` | Syntax-highlighted diff rendering |
| `native-ts/file-index/` | Fuzzy file search index |

## Where Prompt Templates Live

Prompt engineering is distributed across many files. Here are the key locations:

| Location | What's there |
|----------|-------------|
| `constants/prompts.md` | **Main system prompt** (26 sections: intro, system, tasks, actions, tools, tone, efficiency, MCP, scratchpad, proactive, etc.) |
| `tools/AgentTool/built-in/*.md` | **Built-in agent prompts** (verification, plan, explore, general purpose, statusline) |
| `tools/BashTool/prompt.md` | Bash tool instructions, git commit/PR guidance, sandbox rules |
| `tools/WebSearchTool/prompt.md` | Web search instructions |
| `tools/BashTool/readOnlyValidation.md` | Read-only command allowlists |
| `services/compact/prompt.md` | **8 compaction prompt templates** |
| `services/SessionMemory/prompts.md` | **3 session memory templates** |
| `services/MagicDocs/prompts.md` | **2 MagicDocs templates** |
| `commands/security-review.md` | Security review prompt |
| `commands/insights.md` | **10 insight extraction templates** |
| `commands/commit.md` | Git commit prompt |
| `commands/review.md` | Code review prompt |
| `utils/messages.md` | **14+ message templates** (memory hints, cancel/reject, denial guidance) |
| `utils/claudeInChrome/prompt.md` | **4 Chrome integration templates** |
| `utils/hooks/skillImprovement.md` | **4 skill analysis templates** |
| `utils/sideQuestion.md` | Side question wrapper |
| `utils/undercover.md` | Undercover mode instructions |
| `coordinator/coordinatorMode.md` | **2 coordinator templates** |
| `skills/bundled/skillify.md` | 4-round skill capture workflow |
| `skills/bundled/updateConfig.md` | **3 config update templates** |
| `constants/outputStyles.md` | Output style prompts |
| `constants/system.md` | CLI sysprompt prefixes |

## Implementation Guide

See `IMPLEMENTATION_CHECKLIST.md` for a step-by-step build guide. It covers 19 phases in dependency order, explicitly marks what to SKIP (telemetry, proprietary features), and includes a verification checklist.

## Implementation Guide

See `IMPLEMENTATION_CHECKLIST.md` for a step-by-step build guide. It covers 19 phases in dependency order, explicitly marks what to SKIP (telemetry, proprietary features), and includes a verification checklist.

## Porting Guide

See `START-HERE.md` for a comprehensive dependency purpose lookup table. It maps every external library to what it does and what to look for when porting to other languages/platforms.
