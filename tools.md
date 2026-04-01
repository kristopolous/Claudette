# tools.ts

## Purpose
Tool registry - imports all built-in tools and provides a unified `getTools()` function that returns all available tools.

## Items

### getTools() Function
**Purpose**: Returns all registered tools as a map keyed by tool name.

**Logic**:
1. Import all tool classes (BashTool, FileReadTool, etc.)
2. Optionally include conditional tools based on feature flags
3. Instantiate each tool with config
4. Return as `Record<string, Tool>`

### Built-in Tools

| Tool | Purpose | Input |
|------|---------|-------|
| `Bash` | Execute shell commands | `{ command: string }` |
| `Read` | Read file contents | `{ file_path: string }` |
| `Write` | Write file contents | `{ file_path: string, content: string }` |
| `Edit` | Search-replace in files | `{ file_path: string, old_string: string, new_string: string }` |
| `Glob` | Find files by pattern | `{ pattern: string }` |
| `Grep` | Search file contents | `{ pattern: string, path?: string }` |
| `WebFetch` | HTTP GET requests | `{ url: string }` |
| `WebSearch` | Search the web | `{ query: string }` |
| `NotebookEdit` | Edit Jupyter notebooks | `{ notebook_path: string, ... }` |
| `Agent` | Spawn sub-agent | `{ prompt: string, agent?: string }` |
| `TaskOutput` | Get task results | `{ task_id: string }` |
| `TaskStop` | Stop a running task | `{ task_id: string }` |
| `TodoWrite` | Manage todos | `{ action: string, ... }` |
| `LSP` | Language Server Protocol | `{ method: string, params: object }` |
| `EnterPlanMode` | Enable plan mode | `{}` |
| `ExitPlanMode` | Exit plan mode | `{}` |
| `Skill` | Execute a skill | `{ name: string, prompt: string }` |

### Conditional Tools (Feature Gated)

| Tool | Feature Flag | Purpose |
|------|--------------|---------|
| `REPLTool` | `USER_TYPE === 'ant'` | REPL-specific operations |
| `SuggestBackgroundPRTool` | `USER_TYPE === 'ant'` | Suggest PR backgrounds |
| `SleepTool` | `PROACTIVE \|\| KAIROS` | Delay execution |
| `CronCreate/Delete/List` | `AGENT_TRIGGERS` | Scheduled tasks |
| `RemoteTriggerTool` | `AGENT_TRIGGERS_REMOTE` | Remote triggers |
| `MonitorTool` | `MONITOR_TOOL` | Monitoring |
| `SendUserFileTool` | `KAIROS` | Send files to user |
| `PushNotificationTool` | `KAIROS` | Push notifications |
| `SubscribePRTool` | `KAIROS_GITHUB_WEBHOOKS` | GitHub webhooks |
| `BriefTool` | `KAIROS \|\| KAIROS_BRIEF` | Brief mode |

## Imports
- **External**: None
- **Internal**: All tool classes from `./tools/*/`

## Insights
- **Dead code elimination**: Conditional imports via feature flags mean unused tools aren't in shipped binaries
- **Lazy circular deps**: Team tools use `getTeamCreateTool()` function to avoid circular imports
- **Tool name collision**: MCP tools can override built-ins - MCP takes precedence
- **Tool instantiation**: Tools are created fresh per QueryEngine, config passed at creation time

## Exports
- `getTools()` - returns `Tools` (Record<string, Tool>)