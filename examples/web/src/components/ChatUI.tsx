'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import MessageBubble from './MessageBubble'
import PromptInput from './PromptInput'
import ToolResult from './ToolResult'
import WriteResult from './WriteResult'
import TerminalOutput from './TerminalOutput'
import ResizeHandle from './ResizeHandle'
import FileExplorer from './FileExplorer'
import JshTerminal from './JshTerminal'
import FileViewer from './FileViewer'
import UsageDisplay, { calculateCost } from './UsageDisplay'
import SettingsPanel from './SettingsPanel'

interface StreamEvent {
  type: 'text' | 'tool_use' | 'tool_result' | 'error' | 'done' | 'stream_request_start' | 'usage' | 'command_result'
  text?: string
  tool_use?: { id: string; name: string; input: Record<string, unknown> }
  tool_result?: { tool_use_id: string; content: string }
  error?: string
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number }
  command_result?: { command: string; output: string }
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

interface CommandMessage {
  type: 'command'
  command: string
  output: string
}

type Message = UserMessage | AssistantMessage | CommandMessage

type Panel = 'chat' | 'files' | 'viewer' | 'jsh'

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
  const [fileRefreshKey, setFileRefreshKey] = useState(0)
  const [usageStats, setUsageStats] = useState<UsageStats>({
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
    requests: 0,
  })
  const [sidebarWidth, setSidebarWidth] = useState(256)
  const [viewerWidth, setViewerWidth] = useState(384)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSend = useCallback(async (text: string) => {
    console.log('[ChatUI] handleSend called with:', text)
    const userMsg: UserMessage = { type: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setIsProcessing(true)

    const assistantMsg: AssistantMessage = { type: 'assistant', text: '', toolUses: [], isStreaming: true }
    setMessages(prev => [...prev, assistantMsg])

    abortRef.current = new AbortController()

    try {
      console.log('[ChatUI] Fetching /api/chat with:', { message: text, model: currentModel, sessionId, baseUrl })
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, apiKey, model: currentModel, sessionId, maxTurns, baseUrl }),
        signal: abortRef.current.signal,
      })

      console.log('[ChatUI] Response status:', response.status, response.statusText)

      if (!response.ok) {
        const errorBody = await response.text()
        console.error('[ChatUI] Error response:', errorBody)
        throw new Error(`HTTP ${response.status}: ${errorBody}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      console.log('[ChatUI] Got reader, starting SSE stream')

      const decoder = new TextDecoder()
      let buffer = ''
      let eventCount = 0

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          console.log('[ChatUI] Stream done. Total events:', eventCount)
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed === 'data: [DONE]') {
            console.log('[ChatUI] Got DONE signal')
            continue
          }
          if (!trimmed.startsWith('data: ')) continue

          try {
            const event: StreamEvent = JSON.parse(trimmed.slice(6))
            eventCount++
            console.log(`[ChatUI] Event #${eventCount}:`, event.type, event.text ? `"${event.text.slice(0, 50)}..."` : '')

            if (event.sessionId && !sessionId) {
              setSessionId(event.sessionId)
            }

            setMessages(prev => {
              const updated = [...prev]
              const lastMsg = updated[updated.length - 1]

              if (event.type === 'command_result' && event.command_result) {
                const cmdMsg: CommandMessage = {
                  type: 'command',
                  command: event.command_result.command,
                  output: event.command_result.output,
                }
                updated.push(cmdMsg)
                return updated
              }

              if (lastMsg?.type !== 'assistant') {
                console.warn('[ChatUI] Last message is not assistant type:', lastMsg?.type)
                return updated
              }

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
                setFileRefreshKey(k => k + 1)
              } else if (event.type === 'error' && event.error) {
                assistant.text += `\n\nError: ${event.error}`
                assistant.isStreaming = false
              } else if (event.type === 'done') {
                assistant.isStreaming = false
              }

              updated[updated.length - 1] = assistant
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
          } catch (parseErr) {
            console.error('[ChatUI] SSE parse error:', parseErr, 'line:', line)
          }
        }
      }
    } catch (e) {
      console.error('[ChatUI] handleSend error:', e)
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
    } catch (e) {
      console.error('Failed to load file:', e)
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

  const handleExport = useCallback(async () => {
    if (!sessionId) return
    try {
      const res = await fetch(`/api/files?export=1&sessionId=${sessionId}`)
      const data = await res.json()
      if (data.files && data.files.length > 0) {
        const JSZip = (await import('jszip')).default
        const zip = new JSZip()
        for (const file of data.files) {
          zip.file(file.path.replace(/^\//, ''), file.content)
        }
        const blob = await zip.generateAsync({ type: 'blob' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `claudette-project-${sessionId.slice(0, 8)}.zip`
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (e) {
      console.error('Export failed:', e)
    }
  }, [sessionId])

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
          {sessionId && (
            <button
              onClick={handleExport}
              className="px-2 py-1 text-xs bg-[#21262d] border border-[#30363d] rounded hover:bg-[#30363d] transition-colors"
              title="Export project as JSON"
            >
              Export
            </button>
          )}
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
            onClick={() => setActivePanel(activePanel === 'jsh' ? 'chat' : 'jsh')}
            className={`px-2 py-1 text-xs border rounded transition-colors ${activePanel === 'jsh' ? 'bg-[#58a6ff22] border-[#58a6ff] text-[#58a6ff]' : 'bg-[#21262d] border-[#30363d] text-[#8b949e] hover:text-[#c9d1d9]'}`}
            title="jsh terminal"
          >
            jsh
          </button>
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
        <div className="hidden lg:block" style={{ width: sidebarWidth, minWidth: 160, maxWidth: 600, flexShrink: 0 }}>
          <FileExplorer
            sessionId={sessionId}
            onFileSelect={handleFileSelect}
            selectedPath={selectedFilePath || undefined}
            refreshKey={fileRefreshKey}
          />
        </div>
        <ResizeHandle orientation="vertical" onResize={(d) => setSidebarWidth(w => Math.max(160, Math.min(600, w + d)))} />

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="max-w-4xl mx-auto">
              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.type === 'command' ? (
                    <div className="my-2 border border-[#58a6ff33] rounded-lg bg-[#161b22] overflow-hidden">
                      <div className="px-3 py-1.5 bg-[#58a6ff22] border-b border-[#58a6ff33] flex items-center gap-2">
                        <span className="text-xs font-mono text-[#58a6ff]">/{msg.command}</span>
                        <span className="text-xs text-[#8b949e]">command</span>
                      </div>
                      <div className="px-3 py-2 text-sm text-[#c9d1d9] whitespace-pre-wrap">{msg.output}</div>
                    </div>
                  ) : msg.type === 'user' ? (
                    <div className="flex justify-end">
                      <div className="max-w-[80%]">
                        <MessageBubble role="user" content={msg.text} />
                      </div>
                    </div>
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
                            ) : tu.name === 'Write' ? (
                              <WriteResult
                                key={tu.id}
                                toolInput={tu.input}
                                content={tu.result || ''}
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

          <div>
            <PromptInput onSend={handleSend} disabled={isProcessing} showStop={isProcessing} onStop={handleAbort} />
          </div>
        </div>

        {activePanel === 'jsh' && (
          <>
            <ResizeHandle orientation="vertical" onResize={(d) => setViewerWidth(w => Math.max(200, Math.min(900, w - d)))} />
            <div style={{ width: viewerWidth, minWidth: 200, maxWidth: 900, flexShrink: 0 }} className="border-l border-[#30363d]">
              <JshTerminal sessionId={sessionId} />
            </div>
          </>
        )}
        {activePanel === 'viewer' && selectedFilePath && (
          <>
            <ResizeHandle orientation="vertical" onResize={(d) => setViewerWidth(w => Math.max(200, Math.min(900, w - d)))} />
            <div style={{ width: viewerWidth, minWidth: 200, maxWidth: 900, flexShrink: 0 }} className="border-l border-[#30363d]">
              <FileViewer
                path={selectedFilePath}
                content={fileContent}
                isDirty={isDirty}
                onChange={handleFileChange}
                onSave={handleFileSave}
                onClose={() => setActivePanel('chat')}
              />
            </div>
          </>
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
