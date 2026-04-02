import { Message, Tool, ToolUseContext, StreamEvent, QueryEngineConfig, ToolUseBlock, VirtualFS } from '../types'
import { getTools } from './tools'

const SYSTEM_PROMPT = `You are Claudette Web, an AI coding assistant running in a virtualized web environment. You help users build software by reading, writing, and editing files in a virtual filesystem.

You have access to these tools:
- Bash: Execute shell commands (virtualized - limited to safe commands like ls, cat, mkdir, echo, pwd, tree, find, wc, head, tail)
- Read: Read file contents
- Write: Write content to files
- Edit: Search-and-replace in files
- Grep: Search file contents with regex
- Glob: Find files by pattern
- WebFetch: Fetch URL contents

When you use tools, you'll see the results and can continue working. Always explain what you're doing.

The virtualized filesystem starts at / with a README.md and src/ directory.`

function buildApiMessages(history: Message[], systemPrompt: string, tools: Tool[]): Array<Record<string, unknown>> {
  const messages: Array<Record<string, unknown>> = [
    { role: 'system', content: systemPrompt },
  ]

  for (const msg of history) {
    if (msg.role === 'tool') {
      messages.push({
        role: 'tool',
        content: msg.content,
        tool_call_id: msg.tool_use_id,
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

function extractToolUses(content: unknown): ToolUseBlock[] {
  if (!Array.isArray(content)) return []
  return content
    .filter((block: Record<string, unknown>) => block.type === 'tool_use')
    .map((block: Record<string, unknown>) => ({
      type: 'tool_use' as const,
      id: block.id as string,
      name: block.name as string,
      input: (block.input || {}) as Record<string, unknown>,
    }))
}

async function* query(
  messages: Array<Record<string, unknown>>,
  tools: Tool[],
  vfs: VirtualFS,
  cwd: string,
  apiKey: string,
  model: string,
  baseUrl: string,
  maxTurns: number,
  abortSignal: AbortSignal,
): AsyncGenerator<StreamEvent> {
  const toolDefinitions = tools.map(t => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.description,
      parameters: t.input_schema,
    },
  }))

  const apiUrl = `${baseUrl.replace(/\/+$/, '')}/chat/completions`

  for (let turn = 0; turn < maxTurns; turn++) {
    if (abortSignal.aborted) break

    yield { type: 'stream_request_start' }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          tools: toolDefinitions,
          stream: true,
        }),
        signal: abortSignal,
      })

      if (!response.ok) {
        const errorText = await response.text()
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
      let currentToolCall: { id: string; name: string; argumentsStr: string } | null = null

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed === 'data: [DONE]') continue
          if (!trimmed.startsWith('data: ')) continue

          try {
            const json = JSON.parse(trimmed.slice(6))
            const choice = json.choices?.[0]
            if (!choice) continue

            const delta = choice.delta
            if (delta?.content) {
              fullContent += delta.content
              yield { type: 'text', text: delta.content }
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
                yield { type: 'usage', usage: json.usage }
              }
              break
            }
          } catch {
            // skip malformed SSE data
          }
        }
      }

      // Build assistant message for history
      const assistantBlocks: Array<Record<string, unknown>> = []
      if (fullContent) {
        assistantBlocks.push({ type: 'text', text: fullContent })
      }

      // Handle tool calls
      if (toolCalls.length > 0) {
        const openaiToolCalls: Array<Record<string, unknown>> = []

        for (const tc of toolCalls) {
          let input: Record<string, unknown> = {}
          try {
            input = JSON.parse(tc.argumentsStr)
          } catch {
            // try to parse as best we can
          }

          assistantBlocks.push({
            type: 'tool_use',
            id: tc.id,
            name: tc.name,
            input,
          })

          openaiToolCalls.push({
            index: openaiToolCalls.length,
            id: tc.id,
            type: 'function',
            function: {
              name: tc.name,
              arguments: tc.argumentsStr,
            },
          })

          yield {
            type: 'tool_use',
            tool_use: {
              type: 'tool_use',
              id: tc.id,
              name: tc.name,
              input,
            },
          }

          // Execute the tool
          const tool = tools.find(t => t.name === tc.name)
          const context: ToolUseContext = {
            vfs,
            cwd,
            abortSignal,
            maxTurns,
            apiKey,
            model,
          }

          let result: string
          if (tool) {
            result = await tool.execute(input, context)
          } else {
            result = `Unknown tool: ${tc.name}`
          }

          yield {
            type: 'tool_result',
            tool_result: { tool_use_id: tc.id, content: result },
          }

          // Add tool result to messages
          messages.push({
            role: 'tool',
            content: result,
            tool_call_id: tc.id,
          })
        }

        // Add assistant message in OpenAI format
        const assistantMsg: Record<string, unknown> = {}
        if (fullContent) assistantMsg.content = fullContent
        assistantMsg.tool_calls = openaiToolCalls
        messages.push({ role: 'assistant', ...assistantMsg })

        // Continue loop for next turn
        continue
      }

      // Handle tool calls
      if (toolCalls.length > 0) {
        const openaiToolCalls: Array<Record<string, unknown>> = []

        for (const tc of toolCalls) {
          let input: Record<string, unknown> = {}
          try {
            input = JSON.parse(tc.argumentsStr)
          } catch {
            // try to parse as best we can
          }

          assistantBlocks.push({
            type: 'tool_use',
            id: tc.id,
            name: tc.name,
            input,
          })

          openaiToolCalls.push({
            index: openaiToolCalls.length,
            id: tc.id,
            type: 'function',
            function: {
              name: tc.name,
              arguments: tc.argumentsStr,
            },
          })

          yield {
            type: 'tool_use',
            tool_use: {
              type: 'tool_use',
              id: tc.id,
              name: tc.name,
              input,
            },
          }

          // Execute the tool
          const tool = tools.find(t => t.name === tc.name)
          const context: ToolUseContext = {
            vfs,
            cwd,
            abortSignal,
            maxTurns,
            apiKey,
            model,
          }

          let result: string
          if (tool) {
            result = await tool.execute(input, context)
          } else {
            result = `Unknown tool: ${tc.name}`
          }

          yield {
            type: 'tool_result',
            tool_result: { tool_use_id: tc.id, content: result },
          }

          // Add tool result to messages
          messages.push({
            role: 'tool',
            content: result,
            tool_call_id: tc.id,
          })
        }

        // Add assistant message in OpenAI format
        const assistantMsg: Record<string, unknown> = {}
        if (fullContent) assistantMsg.content = fullContent
        assistantMsg.tool_calls = openaiToolCalls
        messages.push({ role: 'assistant', ...assistantMsg })

        // Continue loop for next turn
        continue
      }

      // No tool calls - we're done
      if (assistantBlocks.length > 0) {
        messages.push({ role: 'assistant', content: fullContent })
      }
      break

    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') break
      yield { type: 'error', error: e instanceof Error ? e.message : String(e) }
      break
    }
  }

  yield { type: 'done' }
}

export class QueryEngine {
  private messages: Message[]
  private tools: Tool[]
  private vfs: VirtualFS
  private apiKey: string
  private model: string
  private baseUrl: string
  private maxTurns: number
  private cwd: string

  constructor(config: QueryEngineConfig) {
    this.messages = []
    this.tools = config.tools.length > 0 ? config.tools : getTools()
    this.vfs = config.vfs
    this.apiKey = config.apiKey
    this.model = config.model || 'gpt-4o'
    this.baseUrl = (config.baseUrl || 'https://api.openai.com/v1').replace(/\/+$/, '')
    this.maxTurns = config.maxTurns || 20
    this.cwd = config.cwd || '/'
  }

  getMessages(): Message[] {
    return [...this.messages]
  }

  getVfs(): VirtualFS {
    return this.vfs
  }

  async *submitMessage(userMessage: Message): AsyncGenerator<StreamEvent> {
    this.messages.push(userMessage)

    const apiMessages = buildApiMessages(this.messages, SYSTEM_PROMPT, this.tools)
    const abortController = new AbortController()

    yield* query(
      apiMessages,
      this.tools,
      this.vfs,
      this.cwd,
      this.apiKey,
      this.model,
      this.baseUrl,
      this.maxTurns,
      abortController.signal,
    )

    // Update internal messages from the API messages
    // (The query function modifies apiMessages in place)
  }

  abort() {
    // Signal abort to any running query
  }
}
