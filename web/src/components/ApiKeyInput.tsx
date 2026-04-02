'use client'

import { useState, useEffect } from 'react'

interface ApiKeyInputProps {
  onSubmit: (apiKey: string, model: string, baseUrl: string) => void
}

export default function ApiKeyInput({ onSubmit }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('https://api.openai.com/v1')
  const [model, setModel] = useState('')
  const [models, setModels] = useState<string[]>([])
  const [loadingModels, setLoadingModels] = useState(false)
  const [modelError, setModelError] = useState('')

  const fetchModels = async (url: string, key: string) => {
    if (!key) return
    setLoadingModels(true)
    setModelError('')
    try {
      const base = url.replace(/\/+$/, '')
      const res = await fetch(`${base}/models`, {
        headers: { Authorization: `Bearer ${key}` },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const list = (data.data || []).map((m: any) => m.id).filter(Boolean) as string[]
      setModels(list)
      if (!model && list.length > 0) {
        setModel(list[0])
      }
    } catch (e) {
      setModelError(e instanceof Error ? e.message : 'Failed to fetch models')
      setModels([])
    } finally {
      setLoadingModels(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (apiKey.trim() && baseUrl.trim()) {
        fetchModels(baseUrl, apiKey.trim())
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [apiKey, baseUrl])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim() && baseUrl.trim()) {
      onSubmit(apiKey.trim(), model || models[0] || '', baseUrl.trim().replace(/\/+$/, ''))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Claudette Web</h1>
        <p className="text-[#8b949e] text-center mb-8">AI coding assistant with virtualized filesystem</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="baseUrl" className="block text-sm font-medium mb-1">
              API Base URL
            </label>
            <input
              id="baseUrl"
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.openai.com/v1"
              className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md text-sm focus:outline-none focus:border-[#58a6ff]"
            />
          </div>
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
              API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md text-sm focus:outline-none focus:border-[#58a6ff]"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium mb-1">
              Model
              {loadingModels && <span className="ml-2 text-xs text-[#8b949e] animate-pulse">fetching...</span>}
            </label>
            {modelError && <p className="text-xs text-[#f85149] mb-1">{modelError}</p>}
            {models.length > 0 ? (
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md text-sm focus:outline-none focus:border-[#58a6ff]"
              >
                {models.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            ) : (
              <input
                id="model"
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. gpt-4o, claude-sonnet-4-20250514"
                className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md text-sm focus:outline-none focus:border-[#58a6ff]"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={!apiKey.trim() || !baseUrl.trim()}
            className="w-full px-4 py-2 bg-[#58a6ff] text-white rounded-md text-sm font-medium hover:bg-[#79b8ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Start Session
          </button>
        </form>
        <p className="text-xs text-[#8b949e] mt-4 text-center">
          Your API key is only used server-side and never stored.
        </p>
      </div>
    </div>
  )
}

export default function ApiKeyInput({ onSubmit }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('https://api.openai.com/v1')
  const [model, setModel] = useState('')
  const [models, setModels] = useState<string[]>([])
  const [loadingModels, setLoadingModels] = useState(false)
  const [modelError, setModelError] = useState('')

  const fetchModels = async (url: string, key: string) => {
    if (!key) return
    setLoadingModels(true)
    setModelError('')
    try {
      const base = url.replace(/\/+$/, '')
      const res = await fetch(`${base}/models`, {
        headers: { Authorization: `Bearer ${key}` },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const list = (data.data || []).map((m: any) => m.id).filter(Boolean) as string[]
      setModels(list)
      if (!model && list.length > 0) {
        setModel(list[0])
      }
    } catch (e) {
      setModelError(e instanceof Error ? e.message : 'Failed to fetch models')
      setModels([])
    } finally {
      setLoadingModels(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (apiKey.trim() && baseUrl.trim()) {
        fetchModels(baseUrl, apiKey.trim())
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [apiKey, baseUrl])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim() && baseUrl.trim()) {
      onSubmit(apiKey.trim(), model || models[0] || '', baseUrl.trim().replace(/\/+$/, ''))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Claudette Web</h1>
        <p className="text-[#8b949e] text-center mb-8">AI coding assistant with virtualized filesystem</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="baseUrl" className="block text-sm font-medium mb-1">
              API Base URL
            </label>
            <input
              id="baseUrl"
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.openai.com/v1"
              className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md text-sm focus:outline-none focus:border-[#58a6ff]"
            />
          </div>
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
              API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md text-sm focus:outline-none focus:border-[#58a6ff]"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium mb-1">
              Model
              {loadingModels && <span className="ml-2 text-xs text-[#8b949e] animate-pulse">fetching...</span>}
            </label>
            {modelError && <p className="text-xs text-[#f85149] mb-1">{modelError}</p>}
            {models.length > 0 ? (
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md text-sm focus:outline-none focus:border-[#58a6ff]"
              >
                {models.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            ) : (
              <input
                id="model"
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. gpt-4o, claude-sonnet-4-20250514"
                className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md text-sm focus:outline-none focus:border-[#58a6ff]"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={!apiKey.trim() || !baseUrl.trim()}
            className="w-full px-4 py-2 bg-[#58a6ff] text-white rounded-md text-sm font-medium hover:bg-[#79b8ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Start Session
          </button>
        </form>
        <p className="text-xs text-[#8b949e] mt-4 text-center">
          Your API key is only used server-side and never stored.
        </p>
      </div>
    </div>
  )
}
