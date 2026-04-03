import { Message, Tool, ToolUseContext, StreamEvent, QueryEngineConfig, Command, CommandContext, PermissionContext, UsageTracker, MemoryStore, Skill, Agent } from '../types'
import { getTools } from './tools'
import { getCommands } from './commands/registry'
import { buildSystemPrompt } from './prompts/system'
import { checkPermission } from './permissions'
import { compactMessages, shouldCompact } from './compact'
import { createMemoryStore } from './memory'
import { getSkills } from './skills'
import { getAgents } from './agents'

const MODEL_MAX_TOKENS: Record<string, number> = {
  'claude-sonnet-4-20250514': 200000,
  'claude-opus-4-20250514': 200000,
  'claude-haiku-4-20250514': 200000,
  'gpt-4o': 128000,
  'gpt-4o-mini': 128000,
}

function buildApiMessages(history: Message[], systemPrompt: string): Array<Record<string, unknown>> {
  const messages: Array<Record<string, unknown>> = [
    { role: 'system', content: systemPrompt },
  ]

  for (const msg of history) {
    if (msg.role === 'tool') {
      messages.push({
        role: 'tool',
        content: msg.content,
        tool_call_id: msg.tool_call_id || msg.tool_use_id,
      })
    } else if (msg.role === 'assistant') {
      if (Array.isArray(msg.content)) {
        const textParts = msg.content.filter((b: any) => b.type === 'text').map((b: any) => b.text).join('')
        const toolCalls = msg.content.filter((b: any) => b.type === 'tool_use').map((b: any, idx: number) => ({
          index: idx,
          id: b.id,
          type: 'function',
          function: {
            name: b.name,
            arguments: JSON.stringify(b.input || {}),
          },
        }))
        const assistantMsg: Record<string, unknown> = {}
        if (textParts) assistantMsg.content = textParts
        if (toolCalls.length > 0) assistantMsg.tool_calls = toolCalls
        messages.push({ role: 'assistant', ...assistantMsg })
      } else {
        messages.push({ role: 'assistant', content: msg.content })
      }
    } else {
      messages.push({ role: msg.role, content: msg.content })
    }
  }

  return messages
}

export class QueryEngine {
  private messages: Message[]
  private tools: Tool[]
  private commands: Command[]
  private skills: Skill[]
  private agents: Agent[]
  private permissionContext: PermissionContext
  private memoryStore: MemoryStore
  private usage: UsageTracker
  private vfs: any
  private apiKey: string
  private model: string
  private baseUrl: string
  private maxTurns: number
  private cwd: string
  private customSystemPrompt: string
  private abortController: AbortController | null = null

  constructor(config: QueryEngineConfig) {
    this.messages = []
    this.tools = config.tools.length > 0 ? config.tools : getTools()
    this.commands = getCommands()
    this.skills = config.skills || getSkills()
    this.agents = config.agents || getAgents()
    this.permissionContext = { mode: 'ask', alwaysAllow: new Set(), alwaysDeny: new Set() }
    this.memoryStore = createMemoryStore()
    this.usage = {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      requests: 0,
      add: (u) => {
        this.usage.promptTokens += u.prompt_tokens
        this.usage.completionTokens += u.completion_tokens
        this.usage.totalTokens = this.usage.promptTokens + this.usage.completionTokens
        this.usage.requests++
      },
      reset: () => {
        this.usage.promptTokens = 0
        this.usage.completionTokens = 0
        this.usage.totalTokens = 0
        this.usage.requests = 0
      },
    }
    this.vfs = config.vfs
    this.apiKey = config.apiKey
    this.model = config.model || 'gpt-4o'
    this.baseUrl = (config.baseUrl || 'https://api.openai.com/v1').replace(/\/+$/, '')
    this.maxTurns = config.maxTurns || 20
    this.cwd = config.cwd || '/'
    this.customSystemPrompt = config.systemPrompt || ''
  }

  getMessages(): Message[] {
    return [...this.messages]
  }

  getVfs() {
    return this.vfs
  }

  getUsage() {
    return { ...this.usage }
  }

  getPermissionContext() {
    return this.permissionContext
  }

  setPermissionContext(ctx: PermissionContext) {
    this.permissionContext = ctx
  }

  setModel(model: string) {
    this.model = model
  }

  setMaxTurns(n: number) {
    this.maxTurns = n
  }

  clearMessages() {
    this.messages = []
    this.usage.reset()
  }

  abort() {
    this.abortController?.abort()
  }

  private async executeCommand(name: string, args: string): Promise<{ output: string; triggerQuery?: boolean; queryMessage?: string }> {
    const cmd = this.commands.find(c => c.name === name || c.aliases.includes(name))
    if (!cmd) {
      return { output: `Unknown command: /${name}. Type /help for available commands.` }
    }

    if (cmd.requiresArg && !args.trim()) {
      return { output: `Command /${name} requires an argument. Usage: /${name} <args>` }
    }

    const ctx: CommandContext = {
      vfs: this.vfs,
      messages: this.messages,
      model: this.model,
      maxTurns: this.maxTurns,
      setModel: (m) => { this.model = m },
      setMaxTurns: (n) => { this.maxTurns = n },
      clearMessages: () => { this.messages = [] },
      usage: this.usage,
      skills: this.skills,
      agents: this.agents,
      memoryStore: this.memoryStore,
      permissionContext: this.permissionContext,
    }

    const result = await cmd.execute(args, ctx)
    return {
      output: result.output,
      triggerQuery: result.triggerQuery,
      queryMessage: result.queryMessage,
    }
  }

  private getToolUseContext(): ToolUseContext {
    return {
      vfs: this.vfs,
      cwd: this.cwd,
      abortSignal: this.abortController?.signal || new AbortController().signal,
      maxTurns: this.maxTurns,
      apiKey: this.apiKey,
      model: this.model,
      baseUrl: this.baseUrl,
      messages: this.messages,
      permissionContext: this.permissionContext,
      memoryStore: this.memoryStore,
      skills: this.skills,
      agents: this.agents,
      mcpTools: [],
      usage: this.usage,
    }
  }

  async *submitMessage(userMessage: Message): AsyncGenerator<StreamEvent> {
    const textContent = typeof userMessage.content === 'string'
      ? userMessage.content
      : userMessage.content.filter((b: any) => b.type === 'text').map((b: any) => b.text).join('')

    console.log('[QueryEngine] submitMessage:', textContent.slice(0, 100))

    if (textContent.startsWith('/')) {
      const parts = textContent.slice(1).split(/\s+/)
      const cmdName = parts[0]
      const args = parts.slice(1).join(' ')

      console.log('[QueryEngine] Executing command:', cmdName, args)
      const cmdResult = await this.executeCommand(cmdName, args)
      yield { type: 'command_result', command_result: { command: cmdName, output: cmdResult.output } }

      if (cmdResult.triggerQuery && cmdResult.queryMessage) {
        this.messages.push({ role: 'user', content: cmdResult.queryMessage })
      } else {
        this.messages.push(userMessage)
        this.messages.push({ role: 'assistant', content: cmdResult.output })
        yield { type: 'done' }
        return
      }
    } else {
      this.messages.push(userMessage)
    }

    this.abortController = new AbortController()

    const allTools = [...this.tools]
    console.log('[QueryEngine] Tools available:', allTools.map(t => t.name).join(', '))

    const systemPrompt = buildSystemPrompt({
      tools: allTools,
      commands: this.commands,
      cwd: this.cwd,
      vfs: this.vfs,
      memories: this.memoryStore.getAll(),
      skills: this.skills,
      agents: this.agents,
      customPrompt: this.customSystemPrompt,
    })

    console.log('[QueryEngine] System prompt length:', systemPrompt.length)

    let apiMessages = buildApiMessages(this.messages, systemPrompt)
    console.log('[QueryEngine] API messages count:', apiMessages.length)

    for (let turn = 0; turn < this.maxTurns; turn++) {
      if (this.abortController.signal.aborted) break

      console.log(`[QueryEngine] Turn ${turn + 1}/${this.maxTurns}`)

      if (shouldCompact(apiMessages, MODEL_MAX_TOKENS[this.model] || 128000)) {
        apiMessages = compactMessages(apiMessages, MODEL_MAX_TOKENS[this.model] || 128000)
      }

      yield { type: 'stream_request_start' }

      try {
        const toolDefinitions = allTools.map(t => ({
          type: 'function',
          function: {
            name: t.name,
            description: t.description,
            parameters: t.input_schema,
          },
        }))

        const apiUrl = `${this.baseUrl}/chat/completions`
        console.log('[QueryEngine] Calling API:', apiUrl, 'model:', this.model, 'messages:', apiMessages.length, 'tools:', toolDefinitions.length)

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: this.model,
            messages: apiMessages,
            tools: toolDefinitions.length > 0 ? toolDefinitions : undefined,
            stream: true,
          }),
          signal: this.abortController.signal,
        })

        console.log('[QueryEngine] API response status:', response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('[QueryEngine] API error body:', errorText.slice(0, 500))
          yield { type: 'error', error: `API error ${response.status}: ${errorText}` }
          break
        }

        const reader = response.body?.getReader()
        if (!reader) {
          yield { type: 'error', error: 'No response body' }
          break
        }

        const decoder = new TextDecoder()
        let buffer = ''
        let fullContent = ''
        let toolCalls: Array<{ id: string; name: string; argumentsStr: string }> = []
        let finished = false
        let lineCount = 0

        while (!finished) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed) continue
            if (trimmed === 'data: [DONE]') {
              console.log('[QueryEngine] SSE DONE after', lineCount, 'lines')
              finished = true
              continue
            }
            if (!trimmed.startsWith('data: ')) continue

            lineCount++
            try {
              const json = JSON.parse(trimmed.slice(6))
              const choice = json.choices?.[0]
              if (!choice) continue

              const delta = choice.delta
              const text = delta?.content || delta?.reasoning || ''
              if (text) {
                fullContent += text
                yield { type: 'text', text }
              }

              if (delta?.tool_calls) {
                for (const tc of delta.tool_calls) {
                  if (tc.index !== undefined && toolCalls[tc.index]) {
                    if (tc.id) toolCalls[tc.index].id = tc.id
                    if (tc.function?.name) toolCalls[tc.index].name = tc.function.name
                    if (tc.function?.arguments) toolCalls[tc.index].argumentsStr += tc.function.arguments
                  } else if (tc.id || tc.function?.name) {
                    const newTc = {
                      id: tc.id || '',
                      name: tc.function?.name || '',
                      argumentsStr: tc.function?.arguments || '',
                    }
                    if (tc.index !== undefined) {
                      toolCalls[tc.index] = newTc
                    } else {
                      toolCalls.push(newTc)
                    }
                  }
                }
              }

              if (choice.finish_reason === 'stop' || choice.finish_reason === 'tool_calls') {
                if (json.usage) {
                  this.usage.add(json.usage)
                  yield { type: 'usage', usage: json.usage }
                }
                finished = true
              }
            } catch {
              // skip malformed SSE
            }
          }
        }

        console.log('[QueryEngine] After stream: fullContent length:', fullContent.length, 'toolCalls:', toolCalls.length)

        if (toolCalls.length > 0) {
          console.log('[QueryEngine] Processing', toolCalls.length, 'tool calls')
          const assistantBlocks: Array<Record<string, unknown>> = []
          const openaiToolCalls: Array<Record<string, unknown>> = []

          if (fullContent) {
            assistantBlocks.push({ type: 'text', text: fullContent })
          }

          const toolCtx = this.getToolUseContext()

          for (const tc of toolCalls) {
            let input: Record<string, unknown> = {}
            try {
              input = JSON.parse(tc.argumentsStr)
            } catch {
              // best effort
            }

            console.log('[QueryEngine] Tool call:', tc.name, JSON.stringify(input).slice(0, 100))

            const perm = checkPermission(tc.name, input, this.permissionContext)
            console.log('[QueryEngine] Permission result:', perm)
            if (perm === 'deny') {
              const result = `Permission denied for tool: ${tc.name}`
              yield { type: 'tool_use', tool_use: { type: 'tool_use', id: tc.id, name: tc.name, input } }
              yield { type: 'tool_result', tool_result: { tool_use_id: tc.id, content: result } }
              apiMessages.push({ role: 'tool', content: result, tool_call_id: tc.id })
              assistantBlocks.push({ type: 'tool_use', id: tc.id, name: tc.name, input })
              continue
            }

            assistantBlocks.push({ type: 'tool_use', id: tc.id, name: tc.name, input })
            openaiToolCalls.push({
              index: openaiToolCalls.length,
              id: tc.id,
              type: 'function',
              function: { name: tc.name, arguments: tc.argumentsStr },
            })

            yield { type: 'tool_use', tool_use: { type: 'tool_use', id: tc.id, name: tc.name, input } }

            const tool = allTools.find(t => t.name === tc.name)
            console.log('[QueryEngine] Tool found:', !!tool, 'name:', tc.name)
            let result: string
            if (tool) {
              result = await tool.execute(input, toolCtx)
              console.log('[QueryEngine] Tool result length:', result.length)
            } else {
              result = `Unknown tool: ${tc.name}`
            }

            yield { type: 'tool_result', tool_result: { tool_use_id: tc.id, content: result } }
            apiMessages.push({ role: 'tool', content: result, tool_call_id: tc.id })
          }

          const assistantMsg: Record<string, unknown> = {}
          if (fullContent) assistantMsg.content = fullContent
          if (openaiToolCalls.length > 0) assistantMsg.tool_calls = openaiToolCalls
          apiMessages.push({ role: 'assistant', ...assistantMsg })

          console.log('[QueryEngine] Continuing to next turn')
          continue
        }

        console.log('[QueryEngine] No tool calls, breaking loop')
        if (fullContent) {
          apiMessages.push({ role: 'assistant', content: fullContent })
        }
        break

      } catch (e) {
        console.error('[QueryEngine] Turn error:', e)
        if (e instanceof DOMException && e.name === 'AbortError') break
        yield { type: 'error', error: e instanceof Error ? e.message : String(e) }
        break
      }
    }

    yield { type: 'done' }
  }
}
