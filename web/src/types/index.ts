export interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string | ContentBlock[]
  tool_use_id?: string
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
  type: 'text' | 'tool_use' | 'tool_result' | 'error' | 'done' | 'stream_request_start' | 'usage'
  text?: string
  tool_use?: ToolUseBlock
  tool_result?: { tool_use_id: string; content: string }
  error?: string
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number }
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
}

export interface ToolUseContext {
  vfs: VirtualFS
  cwd: string
  abortSignal: AbortSignal
  maxTurns: number
  apiKey: string
  model: string
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
  read: (path: string) => Promise<string>
  write: (path: string, content: string) => Promise<void>
  edit: (path: string, oldString: string, newString: string) => Promise<string>
  glob: (pattern: string) => Promise<string[]>
  grep: (pattern: string, path?: string) => Promise<{ file: string; line: number; match: string }[]>
  exists: (path: string) => boolean
  isDir: (path: string) => boolean
  mkdir: (path: string) => void
  list: (path: string) => string[]
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
}

export interface ChatRequest {
  message: string
  history: Message[]
  apiKey: string
  model?: string
  maxTurns?: number
}
