# Claudette Implementation Checklist

This is a step-by-step guide to building Claudette from scratch. Follow these phases **in order**. Do NOT skip phases. Do NOT jump ahead. Each phase builds on the previous one.

## What to SKIP Entirely

These are proprietary Anthropic features. **Do not build these:**
- Telemetry/analytics/tracking (`@ant/*` packages, OpenTelemetry, BigQuery, Datadog)
- Keystroke tracking
- First-party event logging
- GrowthBook feature flags
- BUILDFLAGS build-time flags (use your own build system)
- Vendor-internal packages (`@ant/claude-for-chrome-mcp`, `@ant/computer-use-*`)
- Voice/stream STT
- Desktop deep links (Lodestone)
- Stickers
- Passes
- Teleport
- Buddy
- Torch
- UDS inbox
- Workflow scripts
- History snip
- CCR remote setup
- Upload user settings
- Terminal panel
- Web browser tool
- Transcript classifier
- Fork subagent
- Assistant mode (Kairos)
- Proactive mode
- Ultraplan
- Context collapse

---

## Phase 1: Foundation

- [ ] **1.1** Set up project structure (TypeScript or your language of choice)
- [ ] **1.2** Install core dependencies: inference provider SDK (OpenAI-compatible), HTTP client (axios equivalent), schema validation (zod equivalent), STYLER (ANSI colors), execa (subprocess), ignore (gitignore patterns), picomatch (glob), semver, lru-cache, diff, marked, chokidar, fuse (fuzzy search), shell-quote
- [ ] **1.3** Set up terminal UI framework (Ink/React or equivalent for your language)
- [ ] **1.4** Create `START-HERE.md` dependency lookup for your port
- [ ] **1.5** Implement basic CLI argument parsing (entry point with `--help`, `--version`, etc.)
- [ ] **1.6** Set up configuration file loading (CLAUDEON/settings files with JSONC support)
- [ ] **1.7** Implement platform-specific config/cache/data directory resolution (env-paths equivalent)
- [ ] **1.8** Create system constants file (`constants/system.md` reference)
- [ ] **1.9** Create product constants (name: "Claudette", not "Claude Code")

## Phase 2: Core Conversation Loop

**This is the heart of the system. Do not skip.**

- [ ] **2.1** Implement `QueryEngine` — per-conversation state manager that owns:
  - Messages array
  - Token usage tracking
  - Permission state
  - MCP clients
  - Tool registry reference
- [ ] **2.2** Implement `query()` — the async generator loop:
  - Takes user message
  - Constructs API request with system prompt + messages + tool definitions
  - Streams response from inference provider
  - Handles tool_use blocks by executing tools
  - Feeds tool results back into the loop
  - Yields events (text, tool_use, tool_result, error, done)
- [ ] **2.3** Implement query configuration (`query/config.md`):
  - Immutable config: model, max tokens, temperature, system prompt
  - Feature gates for optional capabilities
- [ ] **2.4** Implement dependency injection (`query/deps.md`):
  - API client
  - Tool registry
  - Permission checker
  - MCP manager
  - Cost tracker
- [ ] **2.5** Implement stop hooks (`query/stopHooks.md`):
  - User interrupt (Ctrl+C)
  - Token budget exceeded
  - Task completed
  - Error recovery
- [ ] **2.6** Implement token budget tracking (`query/tokenBudget.md`):
  - Track input/output tokens per turn
  - Budget-based stop decisions
  - Cost estimation

## Phase 3: Tool System

**Every tool the model can call. Build the interface first, then each tool.**

- [ ] **3.1** Implement `Tool` interface and registry (`Tool.md`, `tools.md`):
  - Tool interface: name, description, input schema (zod), execute method
  - Registry: register, get, list, enable/disable
  - Tool result types (text, error, structured output)
- [ ] **3.2** Implement **BashTool** (`tools/BashTool/`):
  - Shell command execution via subprocess
  - Read-only command validation (allowlist)
  - Timeout handling
  - Output truncation
  - Permission checking (always/never/ask)
- [ ] **3.3** Implement **FileEditTool** (`tools/FileEditTool/`):
  - File reading
  - File writing
  - Diff-based editing (SEARCH/REPLACE blocks)
  - File creation/deletion
  - Path validation (respect .gitignore patterns)
- [ ] **3.4** Implement **GlobTool** (`tools/GlobTool/`):
  - File pattern matching (picomatch)
  - Directory traversal
  - Result formatting
- [ ] **3.5** Implement **GrepTool** (`tools/GrepTool/):
  - File content search
  - Regex support
  - Context lines
  - Result formatting
- [ ] **3.6** Implement **WebFetchTool** (`tools/WebFetchTool/`):
  - HTTP GET requests
  - Content extraction (HTML to text/markdown)
  - URL validation
  - Response size limits
- [ ] **3.7** Implement **WebSearchTool** (`tools/WebSearchTool/`):
  - Web search API integration (or use a search provider)
  - Result formatting
  - Query optimization
- [ ] **3.8** Implement **AgentTool** (`tools/AgentTool/`):
  - Sub-agent spawning (creates a new QueryEngine instance)
  - Built-in agents:
    - [ ] **verificationAgent** — adversarial verification
    - [ ] **planAgent** — software architect planning
    - [ ] **exploreAgent** — file search specialist
    - [ ] **generalPurposeAgent** — general purpose
  - Agent isolation (separate message history, separate tool access)
- [ ] **3.9** Implement utility tools:
  - [ ] **SkillTool** — skill execution
  - [ ] **ConfigTool** — configuration management
  - [ ] **REPLTool** — REPL-specific operations
  - [ ] **MCPTool** — MCP tool wrapper
  - [ ] **ReadMcpResourceTool** — MCP resource reading
  - [ ] **TaskListTool** — list tasks
  - [ ] **TaskGetTool** — get task details
  - [ ] **TaskOutputTool** — task output
  - [ ] **ScheduleCronTool** — scheduled tasks
  - [ ] **SleepTool** — delay execution
  - [ ] **SyntheticOutputTool** — structured output validation (AJV)
  - [ ] **EnterWorktreeTool** — git worktree enter
  - [ ] **ExitWorktreeTool** — git worktree exit
  - [ ] **PowerShellTool** — PowerShell execution (Windows only)
  - [ ] **RemoteTriggerTool** — remote triggers (if building bridge mode)

## Phase 4: System Prompt Construction

**The system prompt is how you instruct the model. This is critical.**

- [ ] **4.1** Build system prompt assembler (`constants/prompts.md`):
  - Intro section (who you are)
  - System section (rules and constraints)
  - Tasks section (what you can do)
  - Actions section (how to do things)
  - Tools section (available tools)
  - Tone section (communication style)
  - Efficiency section (be concise)
  - MCP section (if MCP enabled)
  - Scratchpad section (thinking process)
  - Proactive section (take initiative)
  - Any other sections from `constants/prompts.md`
- [ ] **4.2** Implement system prompt section registration (`constants/systemPromptSections.md`):
  - Section interface: id, title, content, enabled predicate
  - Section caching (don't rebuild on every turn)
  - Dynamic section enabling/disabling based on capabilities
- [ ] **4.3** Implement output style configurations (`constants/outputStyles.md`):
  - Different output styles for different contexts
  - Style-specific prompt variations
- [ ] **4.4** Extract and integrate all prompt templates from `constants/prompts.md`

## Phase 5: REPL UI

**The terminal interface. Build this after the core loop works.**

- [ ] **5.1** Set up Ink (or your terminal UI framework) rendering pipeline
- [ ] **5.2** Implement **App** component (`components/App.md`):
  - Root component
  - State management integration
  - Screen switching (main, help, settings)
- [ ] **5.3** Implement **Screen** component:
  - Main REPL screen layout
  - Header (model, cost, mode)
  - Message list area
  - Prompt input area
  - Status bar
- [ ] **5.4** Implement **Messages** component (`components/Messages.md`):
  - Message list rendering
  - User messages (right-aligned, distinct style)
  - Assistant messages (left-aligned, with tool call indicators)
  - Tool result rendering (collapsible, syntax highlighted)
  - Virtualization for long conversations
- [ ] **5.5** Implement **Message** component (`components/Message.md`):
  - Individual message rendering
  - Markdown rendering (marked)
  - Code block syntax highlighting
  - Tool call display (name, input, status)
  - Streaming text animation
- [ ] **5.6** Implement **PromptInput** component (`components/PromptInput/`):
  - Text input with multi-line support
  - Command history (up/down arrows)
  - Tab completion (file paths, commands)
  - Typeahead suggestions
- [ ] **5.7** Implement **VirtualMessageList** (`components/VirtualMessageList.md`):
  - Virtualized scrolling for performance
  - Windowed rendering (only render visible messages)
  - Scroll position management
- [ ] **5.8** Implement **PermissionRequest** component (`components/PermissionRequest.md`):
  - Tool permission dialog
  - Always/Once/Never options
  - Tool name and arguments display
  - Risk indicators
- [ ] **5.9** Implement **Spinner** component (`components/Spinner/`):
  - Loading animation
  - Spinner verbs from `constants/spinnerVerbs.md`
  - Status text updates
- [ ] **5.10** Implement **CostThresholdDialog** (`components/CostThresholdDialog.md`):
  - Budget warning display
  - Continue/stop options
  - Cost breakdown
- [ ] **5.11** Implement design system (`components/design-system/`):
  - Dialog component
  - Pane component
  - Tabs component
  - Button component
  - Text input component
  - Select component
  - Checkbox component

## Phase 6: Permissions

**Critical for security. Do not skip.**

- [ ] **6.1** Implement permission system:
  - Permission levels: always, ask, never
  - Per-tool permissions
  - Per-path permissions (for file tools)
  - Permission persistence (save to config)
- [ ] **6.2** Implement path-based permission validation:
  - .gitignore-style pattern matching (ignore library)
  - Allowed/denied path lists
  - Worktree-aware path resolution
- [ ] **6.3** Implement risk assessment:
  - Command risk classification (read-only vs destructive)
  - File operation risk (read vs write vs delete)
  - Network operation risk
  - User warning for high-risk operations

## Phase 7: MCP Integration

**Model Context Protocol for extending capabilities.**

- [ ] **7.1** Implement MCP client (`services/mcp/`):
  - stdio transport (local processes)
  - SSE transport (remote servers)
  - Streamable HTTP transport
  - MCP authentication (OAuth)
  - MCP elicitation (user prompts from servers)
- [ ] **7.2** Implement MCP tool discovery:
  - Discover tools from MCP servers
  - Register MCP tools in the tool registry
  - MCP resource reading
- [ ] **7.3** Implement MCP configuration:
  - MCP server config file loading
  - Server lifecycle (start/stop/restart)
  - Error handling and recovery
- [ ] **7.4** Implement MCP UI components (`components/mcp/`):
  - MCP settings panel
  - Server status display
  - Tool list from MCP servers

## Phase 8: Commands (Slash Commands)

**User-facing `/command` operations.**

- [ ] **8.1** Implement central command registry (`commands.md`):
  - Command interface: name, description, handler
  - Command registration
  - Command help generation
- [ ] **8.2** Implement core commands:
  - [ ] `/commit` — git commit with AI-generated message
  - [ ] `/review` — code review
  - [ ] `/security-review` — security review
  - [ ] `/insights` — session insights
  - [ ] `/init-verifiers` — verifier initialization
  - [ ] `/model` — model selection
  - [ ] `/config` — configuration management
  - [ ] `/cost` — cost display
  - [ ] `/status` — status display
  - [ ] `/session` — session management
  - [ ] `/version` — version display
  - [ ] `/install` — installation
  - [ ] `/doctor` — diagnostics
  - [ ] `/autoMode` — auto mode handler
- [ ] **8.3** Extract and integrate all command prompt templates

## Phase 9: State Management

- [ ] **9.1** Implement state store (`state/store.md`):
  - Central state container
  - Immutable updates
  - Subscription system
- [ ] **9.2** Implement state selectors (`state/selectors.md`):
  - Derived state computation
  - Memoized selectors
- [ ] **9.3** Implement UI state management (`AppState.md`):
  - UI context for state
  - State hooks for components
- [ ] **9.4** Implement session-level state (`bootstrap/state.md`):
  - Session ID
  - Current working directory
  - User ID
  - Model selection
  - Permission mode
- [ ] **9.5** Implement command history (`history.md`):
  - History storage
  - Navigate history (up/down)
  - History search
  - History persistence

## Phase 10: Memory System (.claude/ directory)

**Persistent memory across sessions.**

- [ ] **10.1** Implement memory directory management (`memdir/memdir.md`):
  - Memory file paths (`memdir/paths.md`)
  - Memory file creation/editing
  - Memory file loading
- [ ] **10.2** Implement memory types (`memdir/memoryTypes.md`):
  - Project memory
  - Team memory
  - User memory
  - Session memory
- [ ] **10.3** Implement memory retrieval (`memdir/findRelevantMemories.md`):
  - Memory scanning (`memdir/memoryScan.md`)
  - Memory aging (`memdir/memoryAge.md`)
  - Relevance scoring
- [ ] **10.4** Implement team memory (`memdir/teamMemPrompts.md`, `memdir/teamMemPaths.md`):
  - Team memory file paths
  - Team memory prompts
  - Team memory sharing
- [ ] **10.5** Integrate memory into system prompt:
  - Load relevant memories at session start
  - Inject memories into system prompt
  - Update memories during session

## Phase 11: Context Window Management

- [ ] **11.1** Implement context compaction (`services/compact/`):
  - Detect when context is approaching limit
  - Summarize older messages
  - Replace message history with summary
  - Compact prompt templates (`services/compact/prompt.md`)
- [ ] **11.2** Implement token estimation:
  - Estimate token count for messages
  - Estimate token count for tool definitions
  - Estimate token count for system prompt
  - Total context size calculation

## Phase 12: Skills

**Reusable prompt packages.**

- [ ] **12.1** Implement skill loading (`skills/`):
  - Skill discovery (directory scanning)
  - Skill manifest parsing
  - Skill activation
- [ ] **12.2** Implement SkillTool execution:
  - Skill execution flow
  - Skill-specific prompts
  - Skill context injection
- [ ] **12.3** Implement bundled skills:
  - [ ] **skillify** — skill capture workflow
  - [ ] **updateConfig** — config update skill
  - [ ] **keybindings** — keybindings skill

## Phase 13: Keybindings

**Customizable keyboard shortcuts.**

- [ ] **13.1** Implement keybinding schema (`keybindings/schema.md`)
- [ ] **13.2** Implement keybinding parser (`keybindings/parser.md`)
- [ ] **13.3** Implement key matching (`keybindings/match.md`)
- [ ] **13.4** Implement key resolution (`keybindings/resolver.md`)
- [ ] **13.5** Implement default bindings (`keybindings/defaultBindings.md`)
- [ ] **13.6** Implement user binding loading (`keybindings/loadUserBindings.md`)
- [ ] **13.7** Implement validation (`keybindings/validate.md`)
- [ ] **13.8** Implement shortcut formatting (`keybindings/shortcutFormat.md`)
- [ ] **13.9** Implement keybinding hooks (`keybindings/useKeybinding.md`)
- [ ] **13.10** Implement reserved shortcuts (`keybindings/reservedShortcuts.md`)
- [ ] **13.11** Implement template system (`keybindings/template.md`)
- [ ] **13.12** Implement KeybindingProvider (`keybindings/KeybindingProviderSetup.md`)

## Phase 14: Plugins

**Third-party extensibility.**

- [ ] **14.1** Implement plugin loading (`utils/plugins/`):
  - Plugin discovery
  - Plugin manifest validation
  - Plugin initialization
- [ ] **14.2** Implement built-in plugins (`plugins/builtinPlugins.md`)
- [ ] **14.3** Implement bundled plugins (`plugins/bundled/`)
- [ ] **14.4** Implement plugin marketplace integration (if desired)
- [ ] **14.5** Implement plugin validation

## Phase 15: Cost Tracking

- [ ] **15.1** Implement usage tracking (`cost-tracker.md`):
  - Token usage per turn
  - Cost estimation based on model pricing
  - Cumulative session cost
- [ ] **15.2** Implement cost hook (`costHook.md`):
  - Cost display in UI
  - Budget warnings
  - Cost threshold dialogs

## Phase 16: Tasks / Background Agents

- [ ] **16.1** Implement task system (`tasks.md`):
  - Task interface
  - Task creation
  - Task execution
  - Task status tracking
- [ ] **16.2** Implement local main session task (`tasks/LocalMainSessionTask.md`)
- [ ] **16.3** Implement task UI components (`components/tasks/`):
  - Task dialogs
  - Task status display
  - Task progress indicators

## Phase 17: LSP Integration (Optional but Recommended)

- [ ] **17.1** Implement LSP client (`services/lsp/`):
  - LSP server lifecycle
  - JSON-RPC communication
  - Diagnostic reception
- [ ] **17.2** Implement LSP tool:
  - Get diagnostics
  - Get definitions
  - Get references
  - Get completions
- [ ] **17.3** Implement diagnostic tracking (`services/diagnosticTracking.md`)

## Phase 18: Remote / Bridge Mode (Optional)

**Only build this if you need remote execution.**

- [ ] **18.1** Implement bridge protocol (`bridge/`)
- [ ] **18.2** Implement session management (`remote/`)
- [ ] **18.3** Implement remote permission forwarding (`remote/remotePermissionBridge.md`)
- [ ] **18.4** Implement WebSocket session management (`remote/SessionsWebSocket.md`)
- [ ] **18.5** Implement remote session manager (`remote/RemoteSessionManager.md`)
- [ ] **18.6** Implement coordinator mode (`coordinator/coordinatorMode.md`)

## Phase 19: Polish

- [ ] **19.1** Implement file system watching for config hot-reload (chokidar)
- [ ] **19.2** Implement graceful shutdown (`signal-exit` equivalent)
- [ ] **19.3** Implement error handling and display
- [ ] **19.4** Implement help system
- [ ] **19.5** Implement version checking and update notifications
- [ ] **19.6** Implement release notes display
- [ ] **19.7** Implement feedback submission (optional)
- [ ] **19.8** Test with multiple inference providers (OpenAI, OpenRouter, LiteLLM, Ollama, vLLM)
- [ ] **19.9** Test with various terminal emulators
- [ ] **19.10** Test on multiple platforms (macOS, Linux, Windows)

---

## Verification Checklist

After completing all phases, verify:

- [ ] Can start Claudette with `claudette` command
- [ ] Can send a message and get a response
- [ ] Can execute shell commands via BashTool
- [ ] Can read/write files via FileEditTool
- [ ] Can search files via GlobTool and GrepTool
- [ ] Can fetch web content via WebFetchTool
- [ ] Can spawn sub-agents via AgentTool
- [ ] Permissions work (always/ask/never)
- [ ] Cost tracking works
- [ ] Context compaction triggers when needed
- [ ] Slash commands work (/commit, /review, etc.)
- [ ] Skills can be loaded and executed
- [ ] Keybindings are customizable
- [ ] Plugins can be installed
- [ ] Memory persists across sessions
- [ ] MCP servers can be connected
- [ ] Works with at least 2 different inference providers

---

## Order Dependencies

```
Phase 1 (Foundation) → Phase 2 (Core Loop) → Phase 3 (Tools) → Phase 4 (Prompts)
                                                          ↓
Phase 5 (REPL UI) ← Phase 2 (Core Loop)
     ↓
Phase 6 (Permissions) — can be built alongside Phase 5
     ↓
Phase 7 (MCP) — depends on Phase 3 (Tool System)
     ↓
Phase 8 (Commands) — depends on Phase 4 (Prompts)
     ↓
Phase 9 (State) — can be built alongside Phase 5
     ↓
Phase 10 (Memory) — depends on Phase 4 (Prompts)
     ↓
Phase 11 (Context) — depends on Phase 2 (Core Loop)
     ↓
Phase 12-19 can be built in parallel after Phase 11
```

---

## Critical Reminders

1. **Provider-agnostic**: Every API call should work with any OpenAI-compatible endpoint. Do not hardcode Anthropic-specific features.
2. **No telemetry**: Do not build any tracking, analytics, or telemetry.
3. **Prompt templates matter**: The system prompt and tool instructions are what make the agent work. Extract all templates from the documentation and integrate them.
4. **Tool interface is key**: Every tool must have a name, description, zod schema for input, and an execute method. The model uses these to decide what to call.
5. **The query loop is the core**: Everything else is support infrastructure. If the query loop works, you have a working agent.
6. **Test with real models**: Don't just test with mock responses. Test with actual inference providers to catch API shape mismatches.
