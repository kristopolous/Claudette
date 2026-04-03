'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { getCommands } from '@/lib/commands/registry'

interface PromptInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  showStop?: boolean
  onStop?: () => void
}

interface CommandSuggestion {
  name: string
  description: string
}

export default function PromptInput({ onSend, disabled, showStop, onStop }: PromptInputProps) {
  const [value, setValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<CommandSuggestion[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const commands = getCommands()

  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus()
    }
  }, [disabled])

  useEffect(() => {
    if (!showSuggestions) return
    const handler = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showSuggestions])

  const handleInputChange = (newValue: string) => {
    setValue(newValue)
    if (newValue.startsWith('/')) {
      const query = newValue.slice(1).split(' ')[0].toLowerCase()
      const matches = commands
        .filter(c => c.name.toLowerCase().includes(query) || c.aliases.some(a => a.toLowerCase().includes(query)))
        .map(c => ({ name: c.name, description: c.description }))
        .slice(0, 8)
      setSuggestions(matches)
      setShowSuggestions(matches.length > 0)
      setSelectedIndex(0)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const selectSuggestion = (name: string) => {
    const current = value.startsWith('/') ? value.slice(1).split(' ') : []
    const rest = current.slice(1).join(' ')
    setValue(`/${name}${rest ? ' ' + rest : ''}`)
    setShowSuggestions(false)
    textareaRef.current?.focus()
  }

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (trimmed && !disabled) {
      onSend(trimmed)
      setValue('')
      setShowSuggestions(false)
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, suggestions.length - 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, 0))
        return
      }
      if (e.key === 'Tab' || e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault()
          selectSuggestion(suggestions[selectedIndex].name)
          return
        }
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setShowSuggestions(false)
        return
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = () => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = Math.min(el.scrollHeight, 200) + 'px'
    }
  }

  return (
    <div className="border-t border-[#30363d] bg-[#0d1117] p-4 relative">
      <div className="max-w-4xl mx-auto flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Ask Claudette to build something... (type / for commands)"
            rows={1}
            disabled={disabled}
            className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-sm resize-none focus:outline-none focus:border-[#58a6ff] disabled:opacity-50 min-h-[40px] max-h-[200px]"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute bottom-full left-0 right-0 mb-1 bg-[#161b22] border border-[#30363d] rounded-lg shadow-lg overflow-hidden z-50"
            >
              {suggestions.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => selectSuggestion(s.name)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                    i === selectedIndex ? 'bg-[#30363d]' : 'hover:bg-[#1c2128]'
                  }`}
                >
                  <span className="text-[#58a6ff] font-mono text-xs">/{s.name}</span>
                  <span className="text-[#8b949e] text-xs truncate">{s.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 items-end">
          {showStop && (
            <button
              onClick={onStop}
              className="px-3 bg-[#f8514966] border border-[#f85149] rounded-lg text-xs font-medium text-[#f85149] hover:bg-[#f8514933] transition-colors h-[40px] flex items-center"
            >
              Stop
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            className="px-4 py-2 bg-[#58a6ff] text-white rounded-lg text-sm font-medium hover:bg-[#79b8ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-[40px]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
