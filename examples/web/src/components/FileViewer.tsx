'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import hljs from 'highlight.js'

interface FileViewerProps {
  path: string
  content: string
  isDirty: boolean
  onChange: (content: string) => void
  onSave: () => void
  onClose: () => void
}

function getLanguage(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() || ''
  const map: Record<string, string> = {
    js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
    py: 'python', rb: 'ruby', pl: 'perl', pm: 'perl',
    go: 'go', rs: 'rust', java: 'java', kt: 'kotlin',
    c: 'c', cpp: 'cpp', h: 'c', hpp: 'cpp',
    cs: 'csharp', php: 'php', swift: 'swift',
    sh: 'bash', zsh: 'bash', fish: 'bash',
    html: 'html', css: 'css', scss: 'scss', less: 'less',
    json: 'json', yaml: 'yaml', yml: 'yaml', xml: 'xml',
    md: 'markdown', sql: 'sql', dockerfile: 'dockerfile',
    toml: 'toml', ini: 'ini', cfg: 'ini', conf: 'ini',
    lua: 'lua', r: 'r', scala: 'scala',
  }
  return map[ext] || ''
}

function highlightCode(code: string, language: string): string {
  if (!language) return code
  try {
    if (hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value
    }
  } catch {
    // fall through
  }
  return code
}

export default function FileViewer({
  path,
  content,
  isDirty,
  onChange,
  onSave,
  onClose,
}: FileViewerProps) {
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState(content)

  useEffect(() => {
    setEditContent(content)
    setEditMode(false)
  }, [content])

  const handleSave = useCallback(() => {
    onChange(editContent)
    onSave()
    setEditMode(false)
  }, [editContent, onChange, onSave])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (editMode) handleSave()
      }
    },
    [editMode, handleSave]
  )

  const fileName = path.split('/').pop() || path
  const language = getLanguage(path)

  const highlightedHtml = useMemo(() => {
    if (editMode) return ''
    return highlightCode(content, language)
  }, [content, language, editMode])

  return (
    <div className="h-full flex flex-col bg-[#0d1117]" onKeyDown={handleKeyDown}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#c9d1d9]">{fileName}</span>
          {language && (
            <span className="text-[10px] px-1.5 py-0.5 bg-[#21262d] border border-[#30363d] rounded text-[#8b949e]">
              {language}
            </span>
          )}
          {isDirty && <span className="text-xs text-[#d29922]">●</span>}
        </div>
        <div className="flex items-center gap-2">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-2 py-1 text-xs bg-[#21262d] border border-[#30363d] rounded hover:bg-[#30363d] transition-colors"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditContent(content)
                  setEditMode(false)
                }}
                className="px-2 py-1 text-xs bg-[#21262d] border border-[#30363d] rounded hover:bg-[#30363d] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-2 py-1 text-xs bg-[#238636] text-white rounded hover:bg-[#2ea043] transition-colors"
              >
                Save
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {editMode ? (
          <textarea
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            className="w-full h-full p-3 bg-[#0d1117] text-[#c9d1d9] font-mono text-xs resize-none focus:outline-none"
            spellCheck={false}
          />
        ) : (
          <pre
            className="p-3 text-xs font-mono whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        )}
      </div>
    </div>
  )
}
