'use client'

import { useState, useMemo } from 'react'
import { marked } from 'marked'

interface WriteResultProps {
  toolInput: Record<string, unknown>
  content: string
  isRunning?: boolean
}

export default function WriteResult({ toolInput, content, isRunning }: WriteResultProps) {
  const [expanded, setExpanded] = useState(false)
  const filePath = String(toolInput.file_path || '')
  const fileName = filePath.split('/').pop() || filePath
  const writtenBytes = toolInput.content ? String(toolInput.content).length : 0

  const previewHtml = useMemo(() => {
    const text = String(toolInput.content || '')
    if (!text) return ''
    return marked(text)
  }, [toolInput.content])

  return (
    <div className="my-2 border border-[#30363d] rounded-md overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 bg-[#161b22] hover:bg-[#1c2128] transition-colors text-left"
      >
        <span className="text-xs font-mono text-[#3fb950]">Write</span>
        <span className="text-xs font-mono text-[#c9d1d9]">{fileName}</span>
        {isRunning && (
          <span className="ml-auto flex items-center gap-1 text-xs text-[#d29922]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d29922] animate-pulse" />
            writing...
          </span>
        )}
        {!isRunning && content && (
          <span className="ml-auto text-xs text-[#8b949e]">
            {writtenBytes} bytes
          </span>
        )}
        <span className="text-xs text-[#8b949e]">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <div className="border-t border-[#30363d]">
          <div className="px-3 py-2 bg-[#0d1117]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-[#8b949e]">Preview</span>
            </div>
            {previewHtml ? (
              <div
                className="prose prose-invert prose-sm max-w-none bg-[#161b22] rounded-md p-4 text-[#c9d1d9]"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            ) : (
              <div className="bg-[#161b22] rounded-md p-4 text-xs text-[#8b949e] italic">
                No content to preview
              </div>
            )}
          </div>
          {content && (
            <div className="px-3 py-2 bg-[#0d1117] border-t border-[#30363d]">
              <span className="text-xs font-medium text-[#8b949e]">Result</span>
              <pre className="text-xs font-mono whitespace-pre-wrap text-[#8b949e] mt-1 max-h-32 overflow-y-auto">
                {content}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
