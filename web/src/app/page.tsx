'use client'

import { useState } from 'react'
import ApiKeyInput from '@/components/ApiKeyInput'
import ChatUI from '@/components/ChatUI'

export default function Home() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [model, setModel] = useState('')
  const [baseUrl, setBaseUrl] = useState('')

  if (!apiKey) {
    return <ApiKeyInput onSubmit={(key, m, url) => { setApiKey(key); setModel(m); setBaseUrl(url) }} />
  }

  return <ChatUI apiKey={apiKey} model={model} baseUrl={baseUrl} />
}
