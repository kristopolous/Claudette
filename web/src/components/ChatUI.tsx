'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import MessageBubble from './MessageBubble'
import PromptInput from './PromptInput'
import ToolResult from './ToolResult'
import TerminalOutput from './TerminalOutput'
import FileExplorer from './FileExplorer'
import FileViewer from './FileViewer'
import UsageDisplay, { calculateCost } from './UsageDisplay'
import SettingsPanel from './SettingsPanel'

interface StreamEvent {
  type: 'text' | 'tool_use' | 'tool_result' | 'error' | 'done' | 'stream_request_start' | 'usage'
  text?: string
  tool_use?: { id: string; name: string; input: Record<string, unknown> }
  tool_result?: { tool_use_id: string; content: string }
  error?: string
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number }
  sessionId?: string
}

interface ToolUse {
  id: string
  name: string
  input: Record<string, unknown>
  result?: string
  running: boolean
}

interface AssistantMessage {
  type: 'assistant'
  text: string
  toolUses: ToolUse[]
  isStreaming: boolean
}

interface UserMessage {
  type: 'user'
  text: string
}

interface UsageStats {
  inputTokens: number
  outputTokens: number
  totalTokens: number
  estimatedCost: number
  requests: number
}

type Message = UserMessage | AssistantMessage

type Panel = 'chat' | 'files' | 'viewer'

export default function ChatUI({ apiKey, model, baseUrl }: { apiKey: string; model: string; baseUrl: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [currentModel, setCurrentModel] = useState(model)
  const [systemPrompt, setSystemPrompt] = useState('')
  const [maxTurns, setMaxTurns] = useState(20)
  const [activePanel, setActivePanel] = useState<Panel>('chat')
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [vfs, setVfs] = useState<any>(null)
  const [usageStats, setUsageStats] = useState<UsageStats>({
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
    requests: 0,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSend = useCallback(async (text: string) => {
    const userMsg: UserMessage = { type: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setIsProcessing(true)

    const assistantMsg: AssistantMessage = { type: 'assistant', text: '', toolUses: [], isStreaming: true }
    setMessages(prev => [...prev, assistantMsg])

    abortRef.current = new AbortController()

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, apiKey, model: currentModel, sessionId, maxTurns, baseUrl }),
        signal: abortRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''

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
            const event: StreamEvent = JSON.parse(trimmed.slice(6))

            if (event.sessionId && !sessionId) {
              setSessionId(event.sessionId)
            }

            setMessages(prev => {
              const updated = [...prev]
              const lastMsg = updated[updated.length - 1]

              if (lastMsg?.type === 'assistant') {
                const assistant = { ...lastMsg }

                if (event.type === 'text' && event.text) {
                  assistant.text += event.text
                } else if (event.type === 'tool_use' && event.tool_use) {
                  assistant.toolUses = [
                    ...assistant.toolUses,
                    {
                      id: event.tool_use.id,
                      name: event.tool_use.name,
                      input: event.tool_use.input,
                      running: true,
                    },
                  ]
                } else if (event.type === 'tool_result' && event.tool_result) {
                  assistant.toolUses = assistant.toolUses.map(tu =>
                    tu.id === event.tool_result!.tool_use_id
                      ? { ...tu, result: event.tool_result!.content, running: false }
                      : tu
                  )
                } else if (event.type === 'error' && event.error) {
                  assistant.text += `\n\nError: ${event.error}`
                  assistant.isStreaming = false
                } else if (event.type === 'done') {
                  assistant.isStreaming = false
                }

                updated[updated.length - 1] = assistant
              }

              return updated
            })

            if (event.type === 'usage' && event.usage) {
              setUsageStats(prev => {
                const inputTokens = prev.inputTokens + event.usage!.prompt_tokens
                const outputTokens = prev.outputTokens + event.usage!.completion_tokens
                return {
                  inputTokens,
                  outputTokens,
                  totalTokens: inputTokens + outputTokens,
                  estimatedCost: calculateCost(inputTokens, outputTokens, currentModel),
                  requests: prev.requests + 1,
                }
              })
            }

            if (event.type === 'usage' && event.usage) {
              setUsageStats(prev => {
                const inputTokens = prev.inputTokens + event.usage!.prompt_tokens
                const outputTokens = prev.outputTokens + event.usage!.completion_tokens
                return {
                  inputTokens,
                  outputTokens,
                  totalTokens: inputTokens + outputTokens,
                  estimatedCost: calculateCost(inputTokens, outputTokens, currentModel),
                  requests: prev.requests + 1,
                }
              })
            }
          } catch {
            // skip malformed SSE
          }
        }
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return
      setMessages(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last?.type === 'assistant') {
          updated[updated.length - 1] = {
            ...last,
            text: last.text + `\n\nError: ${e instanceof Error ? e.message : String(e)}`,
            isStreaming: false,
          }
        }
        return updated
      })
    } finally {
      setIsProcessing(false)
      abortRef.current = null
    }
  }, [apiKey, currentModel, sessionId, maxTurns])

  const handleAbort = useCallback(() => {
    abortRef.current?.abort()
    setMessages(prev => {
      const updated = [...prev]
      const last = updated[updated.length - 1]
      if (last?.type === 'assistant') {
        updated[updated.length - 1] = { ...last, isStreaming: false }
      }
      return updated
    })
    setIsProcessing(false)
  }, [])

  const handleFileSelect = useCallback(async (path: string) => {
    setSelectedFilePath(path)
    setActivePanel('viewer')
    try {
      const response = await fetch(`/api/files?path=${encodeURIComponent(path)}&sessionId=${sessionId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      })
      if (response.ok) {
        const data = await response.json()
        setFileContent(data.content)
        setIsDirty(false)
      }
    } catch {
      setFileContent('Error loading file')
    }
  }, [sessionId, apiKey])

  const handleFileSave = useCallback(async () => {
    if (!selectedFilePath) return
    try {
      await fetch('/api/files', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ path: selectedFilePath, content: fileContent, sessionId }),
      })
      setIsDirty(false)
    } catch (e) {
      console.error('Failed to save file:', e)
    }
  }, [selectedFilePath, fileContent, sessionId, apiKey])

  const handleFileChange = useCallback((content: string) => {
    setFileContent(content)
    setIsDirty(true)
  }, [])

  const handleNewSession = useCallback(() => {
    setMessages([])
    setSessionId(null)
    setUsageStats({
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      estimatedCost: 0,
      requests: 0,
    })
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-[#30363d] px-4 py-2 flex items-center justify-between bg-[#161b22]">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold">Claudette Web</h1>
          <button
            onClick={handleNewSession}
            className="px-2 py-1 text-xs bg-[#21262d] border border-[#30363d] rounded hover:bg-[#30363d] transition-colors"
          >
            New Session
          </button>
        </div>
        <div className="flex items-center gap-3">
          <UsageDisplay stats={usageStats} />
          <span className="text-xs text-[#8b949e] font-mono">{currentModel}</span>
          {sessionId && (
            <span className="text-xs text-[#8b949e] font-mono">
              {sessionId.slice(0, 8)}...
            </span>
          )}
          <button
            onClick={() => setShowSettings(true)}
            className="p-1 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
            title="Settings"
          >
            ⚙
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 flex-shrink-0 hidden lg:block">
          {vfs ? (
            <FileExplorer
              vfs={vfs}
              onFileSelect={handleFileSelect}
              selectedPath={selectedFilePath || undefined}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-[#8b949e]">
              File explorer will appear after first tool use
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="max-w-4xl mx-auto">
              {messages.length === 0 && (
                <div className="text-center text-[#8b949e] mt-16">
                  <p className="text-lg font-medium mb-2">Welcome to Claudette Web</p>
                  <p className="text-sm">Ask me to create files, write code, or explore the virtualized filesystem.</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.type === 'user' ? (
                    <MessageBubble role="user" content={msg.text} />
                  ) : (
                    <>
                      {msg.toolUses.length > 0 && (
                        <div className="mb-2">
                          {msg.toolUses.map(tu => (
                            tu.name === 'Bash' && tu.result ? (
                              <TerminalOutput
                                key={tu.id}
                                command={String(tu.input.command || '')}
                                output={tu.result}
                                exitCode={tu.result.includes('[Exit code:') ? 
                                  parseInt(tu.result.match(/\[Exit code: (\d+)\]/)?.[1] || '0') : 
                                  (tu.running ? -1 : 0)
                                }
                                isRunning={tu.running}
                              />
                            ) : (
                              <ToolResult
                                key={tu.id}
                                toolName={tu.name}
                                toolInput={tu.input}
                                content={tu.result || ''}
                                isRunning={tu.running}
                              />
                            )
                          ))}
                        </div>
                      )}
                      {msg.text && (
                        <MessageBubble role="assistant" content={msg.text} isStreaming={msg.isStreaming} />
                      )}
                    </>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="relative">
            {isProcessing && (
              <button
                onClick={handleAbort}
                className="absolute top-2 right-2 z-10 px-3 py-1 bg-[#f8514966] border border-[#f85149] rounded-md text-xs text-[#f85149] hover:bg-[#f8514933] transition-colors"
              >
                Stop
              </button>
            )}
            <PromptInput onSend={handleSend} disabled={isProcessing} />
          </div>
        </div>

        {activePanel === 'viewer' && selectedFilePath && (
          <div className="w-96 flex-shrink-0 border-l border-[#30363d]">
            <FileViewer
              path={selectedFilePath}
              content={fileContent}
              isDirty={isDirty}
              onChange={handleFileChange}
              onSave={handleFileSave}
              onClose={() => setActivePanel('chat')}
            />
          </div>
        )}
      </div>

      {showSettings && (
        <SettingsPanel
          model={currentModel}
          systemPrompt={systemPrompt}
          maxTurns={maxTurns}
          onModelChange={setCurrentModel}
          onSystemPromptChange={setSystemPrompt}
          onMaxTurnsChange={setMaxTurns}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
