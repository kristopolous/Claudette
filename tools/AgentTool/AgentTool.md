# AgentTool.tsx

## Purpose
Implements the Agent tool that launches sub-agents to perform tasks. One of the most complex tools with support for multi-agent teams, background execution, worktree isolation, and remote CCR execution.

## Items

### Input Schema
**Purpose**: Defines all parameters for agent spawning.

**Fields**:
- `description` - Short (3-5 word) task description
- `prompt` - The task for the agent to perform
- `subagent_type` - Type of specialized agent to use (optional)
- `model` - Optional model override (sonnet, opus, haiku)
- `run_in_background` - Run agent in background (optional)
- `name` - Name for spawned teammate (for SendMessage routing)
- `team_name` - Team name for spawning
- `mode` - Permission mode for spawned teammate (e.g., "plan")
- `isolation` - Isolation mode: "worktree" (git worktree) or "remote" (CCR)
- `cwd` - Absolute path to run agent in (KAIROS feature-gated)

### Output Schema
**Purpose**: Defines possible result types from agent execution.

**Variants**:
- `status: "completed"` - Synchronous completion with result content
- `status: "async_launched"` - Background agent launched successfully
- `status: "teammate_spawned"` - Teammate spawned in multi-agent team
- `status: "remote_launched"` - Remote CCR agent launched

### Multi-Agent Spawn (spawnTeammate)
**Purpose**: Spawn a teammate within a team for parallel work.

**Logic**:
1. Validates agent teams feature is enabled
2. Sets agent color for grouped UI display
3. Calls `spawnTeammate()` with name, prompt, team_name, etc.
4. Returns teammate_spawned status with tmux session details

**Constraints**:
- Teammates cannot spawn other teammates (flat roster)
- In-process teammates cannot spawn background agents

### Fork Subagent Path
**Purpose**: Routes to fork experiment when subagent_type is omitted and gate is enabled.

**Logic**:
1. Check if querySource indicates fork agent or already in fork child
2. Reject fork attempts inside forked workers
3. Pass parent's system prompt and tools for cache-identical API prefix
4. Build forked messages from parent's assistant message

### Agent Selection
**Purpose**: Find the agent definition for the requested subagent_type.

**Logic**:
1. Filter agents by MCP requirements
2. Filter by permission rules (Agent(AgentName) deny syntax)
3. Check if agent exists but is denied
4. Resolve effective type (fork vs explicit)

### MCP Server Validation
**Purpose**: Ensure required MCP servers are connected and authenticated before launching agent.

**Logic**:
1. Wait up to 30s for pending required servers
2. Early exit if any required server fails
3. Check servers have tools (connected + authenticated)
4. Throw descriptive error if requirements not met

### Worktree Isolation
**Purpose**: Create isolated git worktree for agent to work in.

**Logic**:
1. Create worktree with slug `agent-{id.slice(0,8)}`
2. Inject path translation notice for fork + worktree case
3. After completion, check for changes before cleanup
4. Keep worktree if changes exist (for resume)

### Async vs Sync Execution
**Purpose**: Determine whether to run agent synchronously or background it.

**Should Run Async When**:
- `run_in_background: true` explicitly set
- Agent definition has `background: true`
- Coordinator mode enabled
- Fork subagent experiment enabled
- KAIROS assistant mode enabled
- Proactive module is active

### Sync Agent Loop
**Purpose**: Execute agent synchronously with progress streaming.

**Logic**:
1. Register as foreground task immediately
2. Show background hint after 2s threshold
3. Race between next message and background signal
4. On background: continue agent in background, return async_launched
5. On completion: finalize result, handle worktree cleanup
6. Forward bash/powershell progress events to parent

### Async Agent Lifecycle
**Purpose**: Fire-and-forget agent execution with notification on completion.

**Logic**:
1. Register async agent task
2. Set up name registry for SendMessage routing
3. Run with agent context for analytics
4. On completion: notify via enqueueAgentNotification
5. Handle cleanup (worktree, summarization, skills)

### Remote Isolation (CCR)
**Purpose**: Launch agent in remote CCR environment.

**Logic**:
1. Check remote agent eligibility
2. Teleport to remote session
3. Register remote agent task
4. Return remote_launched status with session URL

## Imports
- **Stdlib**: None
- **External**: `React`, `zod/v4`
- **Internal**: Multiple modules from `src/tasks/`, `src/services/`, `src/utils/`, `src/tools/` including LocalAgentTask, RemoteAgentTask, spawnMultiAgent, agentToolUtils, prompts, permissions, analytics

## Insights
- **Complex routing**: Multiple execution paths (teammate, fork, normal, remote) with shared cleanup logic
- **Dead code elimination**: Uses feature gates ("external" === 'ant') to strip remote/isolation code from external builds
- **Progress streaming**: Forwards shell progress events from sub-agent to parent for SDK tool_progress events
- **Worktree lifecycle**: Keeps worktrees with changes for resume, deletes clean ones
- **Auto-background**: Configurable via env var or GrowthBook gate (120s default)
- **Agent context**: Wraps execution in agent context for analytics attribution

## Exports
- `AgentTool` - main tool definition
- `inputSchema` - exported for tool registration
- `outputSchema` - exported for tool registration
- `InputSchema` - inferred type from inputSchema
- `OutputSchema` - inferred type from outputSchema
- `Output` - z.input type for output
- `Progress` - union of AgentToolProgress | ShellProgress
- `RemoteLaunchedOutput` - remote launch result type
