export interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string | ContentBlock[]
  tool_use_id?: string
  tool_call_id?: string
  name?: string
}

export interface ContentBlock {
  type: 'text' | 'tool_use' | 'tool_result'
  text?: string
  id?: string
  name?: string
  input?: Record<string, unknown>
  content?: string | ContentBlock[]
}

export interface ToolUseBlock {
  type: 'tool_use'
  id: string
  name: string
  input: Record<string, unknown>
}

export interface StreamEvent {
  type: 'text' | 'tool_use' | 'tool_result' | 'error' | 'done' | 'stream_request_start' | 'usage' | 'command_result'
  text?: string
  tool_use?: ToolUseBlock
  tool_result?: { tool_use_id: string; content: string }
  error?: string
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number }
  command_result?: { command: string; output: string }
}

export interface ToolInputJSONSchema {
  type: 'object'
  properties: Record<string, unknown>
  required?: string[]
}

export interface Tool {
  name: string
  description: string
  input_schema: ToolInputJSONSchema
  execute: (input: Record<string, unknown>, context: ToolUseContext) => Promise<string>
  isReadOnly?: (input: Record<string, unknown>) => boolean
  isDestructive?: (input: Record<string, unknown>) => boolean
}

export interface ToolUseContext {
  vfs: VirtualFS
  cwd: string
  abortSignal: AbortSignal
  maxTurns: number
  apiKey: string
  model: string
  baseUrl: string
  messages: Message[]
  permissionContext: PermissionContext
  memoryStore: MemoryStore
  skills: Skill[]
  agents: Agent[]
  mcpTools: Tool[]
  usage: UsageTracker
}

export interface VirtualFSNode {
  type: 'file' | 'directory'
  name: string
  content?: string
  children?: Map<string, VirtualFSNode>
  modifiedAt: Date
}

export interface VirtualFS {
  root: VirtualFSNode
  baseDir: string
  read: (path: string) => Promise<string>
  write: (path: string, content: string) => Promise<void>
  edit: (path: string, oldString: string, newString: string) => Promise<string>
  glob: (pattern: string) => Promise<string[]>
  grep: (pattern: string, path?: string) => Promise<{ file: string; line: number; match: string }[]>
  exists: (path: string) => boolean
  isDir: (path: string) => boolean
  mkdir: (path: string) => void
  list: (path: string) => string[]
  exportAll: () => Array<{ path: string; content: string }>
}

export interface QueryEngineConfig {
  apiKey: string
  model?: string
  baseUrl?: string
  maxTurns?: number
  systemPrompt?: string
  tools: Tool[]
  vfs: VirtualFS
  cwd?: string
  skills?: Skill[]
  agents?: Agent[]
  mcpServers?: McpServerConfig[]
  memories?: MemoryEntry[]
}

export interface ChatRequest {
  message: string
  history: Message[]
  apiKey: string
  model?: string
  baseUrl?: string
  maxTurns?: number
}

// Slash Commands
export interface Command {
  name: string
  aliases: string[]
  description: string
  category: 'session' | 'model' | 'review' | 'config' | 'help'
  execute: (args: string, context: CommandContext) => Promise<CommandResult>
  requiresArg?: boolean
}

export interface CommandContext {
  vfs: VirtualFS
  messages: Message[]
  model: string
  maxTurns: number
  setModel: (model: string) => void
  setMaxTurns: (n: number) => void
  clearMessages: () => void
  usage: UsageTracker
  skills: Skill[]
  agents: Agent[]
  memoryStore: MemoryStore
  permissionContext: PermissionContext
}

export interface CommandResult {
  output: string
  addToHistory?: boolean
  triggerQuery?: boolean
  queryMessage?: string
}

// Permissions
export interface PermissionContext {
  mode: 'ask' | 'auto' | 'yolo'
  alwaysAllow: Set<string>
  alwaysDeny: Set<string>
}

// MCP
export interface McpServerConfig {
  name: string
  command: string
  args: string[]
  env?: Record<string, string>
}

export interface McpTool {
  name: string
  description: string
  inputSchema: ToolInputJSONSchema
  serverName: string
}

// Skills
export interface Skill {
  name: string
  description: string
  trigger: string
  systemPrompt: string
  category: string
}

// Agents
export interface Agent {
  name: string
  description: string
  systemPrompt: string
  tools?: string[]
}

// Memory
export interface MemoryEntry {
  id: string
  content: string
  tags: string[]
  createdAt: Date
  importance: number
}

export interface MemoryStore {
  add: (entry: Omit<MemoryEntry, 'id' | 'createdAt'>) => void
  search: (query: string) => MemoryEntry[]
  getAll: () => MemoryEntry[]
  clear: () => void
}

// Usage
export interface UsageTracker {
  promptTokens: number
  completionTokens: number
  totalTokens: number
  requests: number
  add: (usage: { prompt_tokens: number; completion_tokens: number }) => void
  reset: () => void
}
