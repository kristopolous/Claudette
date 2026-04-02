'use client'

import { marked } from 'marked'
import { useState, useEffect, useMemo } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-[#30363d]">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-[#30363d]">
        <span className="text-xs text-[#8b949e] font-mono">{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-3 bg-[#0d1117] overflow-x-auto">
        <code className="text-xs font-mono text-[#c9d1d9]">{code}</code>
      </pre>
    </div>
  )
}

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const renderer = new marked.Renderer()
    renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
      return `__CODEBLOCK__${JSON.stringify({ code: text, language: lang })}__CODEBLOCK__`
    }
    Promise.resolve(marked(content, { renderer })).then(result => {
      setHtml(result)
    })
  }, [content])

  const parts = useMemo(() => {
    const segments: Array<{ type: 'html' | 'code'; content: string; language?: string }> = []
    const regex = /__CODEBLOCK__(.*?)__CODEBLOCK__/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(html)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'html', content: html.slice(lastIndex, match.index) })
      }
      try {
        const parsed = JSON.parse(match[1])
        segments.push({ type: 'code', content: parsed.code, language: parsed.language })
      } catch {
        segments.push({ type: 'html', content: match[0] })
      }
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < html.length) {
      segments.push({ type: 'html', content: html.slice(lastIndex) })
    }

    return segments
  }, [html])

  return (
    <div className="prose prose-invert prose-sm max-w-none">
      {parts.map((part, i) =>
        part.type === 'code' ? (
          <CodeBlock key={i} code={part.content} language={part.language} />
        ) : (
          <div
            key={i}
            dangerouslySetInnerHTML={{ __html: part.content }}
          />
        )
      )}
    </div>
  )
}
