# shared/spawnMultiAgent.ts

## Purpose

Shared module for spawning teammates (multi-agent). Extracted from TeammateTool to allow reuse by AgentTool. Handles backend selection (in-process, tmux/iTerm2 split panes, or separate windows), teammate identity generation, team registration, mailbox initialization, and AppState tracking.

## Imports

- **Stdlib**: React, process, Buffer (via others)
- **External**: None
- **Internal** (abbreviated - many):
  - Bootstrap state: multiple `get*` functions (chrome flags, plugins, model override, session bypass, session ID)
  - Task: `createTaskStateBase`, `generateTaskId`
  - Tool: `ToolUseContext`, type `InProcessTeammateTaskState`
  - Agent: `CustomAgentDefinition`, `isCustomAgent`
  - Swarm: backends (detect, registry, teammate mode snapshot), constants (SWARM_SESSION_NAME, TEAM_LEAD_NAME, etc.), It2SetupPrompt, spawnInProcess, spawnUtils, teamHelpers, teammateLayoutManager, teammateModel
  - Utils: agentId, bash/shellQuote, bundledMode, config, cwd, debug, errors, execFileNoThrow, model/model, permissions/PermissionMode, swarm/backends/detection, swarm/backends/types, swarm/backends/registry, swarm/teammateMailbox, task/framework
  - UI: `registerTask` from task utils

## Logic

**Types**:
- `SpawnOutput`: Return shape with teammate identifiers, names, colors, tmux details, team name, split-pane flag, plan_mode_required
- `SpawnTeammateConfig`: Input config (name, prompt, team_name?, cwd?, use_splitpane?, plan_mode_required?, model?, agent_type?, description?, invokingRequestId?)
- Internal `SpawnInput` mirrors config (no description)

**Helper Functions**:
- `getDefaultTeammateModel(leaderModel)`: Returns teammate model from global config, leader model, or hardcoded fallback
- `resolveTeammateModel(inputModel, leaderModel)`: Handles `'inherit'` alias; falls back to default
- `hasSession(sessionName)`: Checks tmux session existence via `tmux has-session`
- `ensureSession(sessionName)`: Creates tmux session if missing
- `getTeammateCommand()`: Binary path for spawning: from `TEAMMATE_COMMAND_ENV_VAR`, or `process.execPath` if bundled, else `process.argv[1]`
- `buildInheritedCliFlags(options)`: Builds CLI flags to propagate to teammate:
  - Permission mode: `--dangerously-skip-permissions` (bypass) unless plan mode required; `--permission-mode acceptEdits` or `auto`
  - Model: `--model <model>` if `getMainLoopModelOverride()` set
  - Settings: `--settings <path>` if set
  - Plugins: `--plugin-dir` for each inline plugin
  - Chrome: `--chrome` or `--no-chrome` based on override
  - Returns space-separated string
- `generateUniqueTeammateName(baseName, teamName)`: Reads team file, appends numeric suffix if name collision (lowercase comparison)
- `buildInheritedEnvVars()`: Returns environment string for spawning (utility not shown)
- `registerOutOfProcessTeammateTask(...)`: Registers a background task for tmux/iTerm2 teammates so they appear in tasks UI. Creates `InProcessTeammateTaskState` with task ID, description, identity, prompt, abortController. Registers abort listener to kill pane via backend.

**Spawn Handlers** (all async, return `{data: SpawnOutput}`):
- `handleSpawnSplitPane(input, context)`:
  - Resolves model, validates name/prompt, gets team name (from input or leader context)
  - Generates unique/sanitized name, teammateId, workingDir
  - Detects backend; if iTerm2 needs setup and `context.setToolJSX` available, shows `It2SetupPrompt` and reacts to user choice (install/tmux/cancel); resets detection accordingly
  - Determines if inside tmux; assigns color, creates teammate pane via `createTeammatePaneInSwarmView`
  - Builds command: `cd <cwd> && env <env> <binary> <teammateArgs> <inheritedFlags>`
  - Sends command to pane (or swarm socket if outside tmux)
  - Updates AppState teamContext with teammate info
  - Registers task via `registerOutOfProcessTeammateTask`
  - Writes team file entry (`backendType` from detection)
  - Sends initial prompt to mailbox
  - Returns output with `is_splitpane: true`
- `handleSpawnSeparateWindow(input, context)`:
  - Similar to split-pane but creates separate tmux window using `tmux new-window` and `send-keys`
  - Returns `is_splitpane: false`, `tmux_window_name` set
- `handleSpawnInProcess(input, context)`:
  - Uses in-process runner (`spawnInProcessTeammate`) to start agent in same process
  - Looks up custom agent definition if `agent_type` provided
  - On success, calls `startInProcessTeammate` with identity, taskId, prompt, agentDefinition, context (with empty messages), abortController
  - Updates AppState (includes leader auto-setup if needed)
  - Writes team file with `backendType: 'in-process'`
  - Does NOT send mailbox (direct prompt)
  - Returns `tmux_*` fields set to `'in-process'`, `is_splitpane: false`

**Main Entry**:
- `handleSpawn(input, context)`: Chooses path:
  - If `isInProcessEnabled()` → in-process
  - Else tries backend detection; on failure in auto mode, falls back to in-process and marks fallback
  - If `use_splitpane !== false` → split-pane; else separate window
- `spawnTeammate(config, context)`: Public API; simply calls `handleSpawn`

## Exports

- `SpawnOutput` type
- `SpawnTeammateConfig` type
- `resolveTeammateModel(inputModel: string | undefined, leaderModel: string | null): string`
- `generateUniqueTeammateName(baseName: string, teamName: string | undefined): Promise<string>`
- `spawnTeammate(config: SpawnTeammateConfig, context: ToolUseContext): Promise<{data: SpawnOutput}>`
