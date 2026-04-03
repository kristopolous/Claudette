'use client'

import { useState, useEffect } from 'react'
import ApiKeyInput from '@/components/ApiKeyInput'
import ChatUI from '@/components/ChatUI'

const STORAGE_KEY = 'claudette-web-config'

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { apiKey: '', model: '', baseUrl: '' }
}

function saveConfig(apiKey: string, model: string, baseUrl: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ apiKey, model, baseUrl }))
}

export default function Home() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [model, setModel] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const cfg = loadConfig()
    if (cfg.apiKey) {
      setApiKey(cfg.apiKey)
      setModel(cfg.model || '')
      setBaseUrl(cfg.baseUrl || 'https://api.openai.com/v1')
    }
    setInitialized(true)
  }, [])

  const handleSubmit = (key: string, m: string, url: string) => {
    saveConfig(key, m, url)
    setApiKey(key)
    setModel(m)
    setBaseUrl(url)
  }

  if (!initialized || !apiKey) {
    return <ApiKeyInput onSubmit={handleSubmit} defaultValues={loadConfig()} />
  }

  return <ChatUI apiKey={apiKey} model={model} baseUrl={baseUrl} />
}
