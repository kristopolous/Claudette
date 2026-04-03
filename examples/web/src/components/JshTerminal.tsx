'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface JshTerminalProps {
  sessionId: string | null
}

export default function JshTerminal({ sessionId }: JshTerminalProps) {
  const outputRef = useRef<HTMLPreElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!sessionId) return

    setOutput('')
    setInput('')
    setCmdHistory([])
    setHistoryIdx(-1)

    const init = async () => {
      try {
        await fetch('/api/shell', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'create', sessionId }),
        })

        const abort = new AbortController()
        abortRef.current = abort

        const res = await fetch(`/api/shell?sessionId=${sessionId}`, {
          signal: abort.signal,
        })

        const reader = res.body?.getReader()
        if (!reader) return

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
              const event = JSON.parse(trimmed.slice(6))
              if (event.type === 'output') {
                setOutput(prev => prev + event.data)
              }
            } catch {
              // skip
            }
          }
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return
        setOutput(prev => prev + `\n[Shell error: ${e instanceof Error ? e.message : String(e)}]\n`)
      }
    }

    init()

    return () => {
      abortRef.current?.abort()
    }
  }, [sessionId])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const sendInput = useCallback((data: string) => {
    if (!sessionId) return
    fetch('/api/shell', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'write', sessionId, data }),
    }).catch(() => {})
  }, [sessionId])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = input
      sendInput(cmd + '\n')
      setOutput(prev => prev + `user@jsh:~$ ${cmd}\n`)
      if (cmd.trim()) {
        setCmdHistory(prev => [...prev, cmd.trim()])
        setHistoryIdx(-1)
      }
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const newIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1)
        setHistoryIdx(newIdx)
        setInput(cmdHistory[newIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx !== -1) {
        const newIdx = historyIdx + 1
        if (newIdx >= cmdHistory.length) {
          setHistoryIdx(-1)
          setInput('')
        } else {
          setHistoryIdx(newIdx)
          setInput(cmdHistory[newIdx])
        }
      }
    } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      setOutput(prev => prev + `user@jsh:~$ ${input}^C\n`)
      setInput('')
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      setOutput('')
    }
  }

  if (!sessionId) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0d1117] text-[#8b949e] text-sm">
        Start a session to use the terminal
      </div>
    )
  }

  return (
    <div
      className="h-full flex flex-col bg-[#0d1117] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#30363d] flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#8b949e] text-xs font-mono">jsh</span>
          <span className="text-[#3fb950] text-xs">● connected</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (sessionId) {
              fetch('/api/shell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'kill', sessionId }),
              }).then(() => {
                setOutput('')
                setInput('')
                setCmdHistory([])
              })
            }
          }}
          className="px-2 py-1 text-xs bg-[#21262d] border border-[#30363d] rounded hover:bg-[#30363d] transition-colors text-[#8b949e]"
        >
          Reset
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-auto p-2 font-mono text-xs leading-5">
        <pre ref={outputRef} className="text-[#c9d1d9] whitespace-pre-wrap break-all">{output}</pre>
        <div className="flex items-center">
          <span className="text-[#58a6ff] whitespace-nowrap">user@jsh:~$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[#c9d1d9] focus:outline-none font-mono text-xs"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}
