'use client'

import { useState, useEffect, useCallback } from 'react'

interface TreeNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: TreeNode[]
}

interface FileExplorerProps {
  sessionId: string | null
  onFileSelect: (path: string) => void
  selectedPath?: string
  refreshKey?: number
}

function TreeNodeComponent({
  node,
  depth,
  onFileSelect,
  selectedPath,
}: {
  node: TreeNode
  depth: number
  onFileSelect: (path: string) => void
  selectedPath?: string
}) {
  const [expanded, setExpanded] = useState(depth < 2)

  const handleClick = useCallback(() => {
    if (node.type === 'directory') {
      setExpanded(!expanded)
    } else {
      onFileSelect(node.path)
    }
  }, [node, expanded, onFileSelect])

  const isSelected = selectedPath === node.path

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-1 py-1 px-2 text-xs font-mono hover:bg-[#1c2128] transition-colors text-left ${
          isSelected ? 'bg-[#1c2128] text-[#58a6ff]' : 'text-[#c9d1d9]'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
          {node.type === 'directory' ? (
            <span className="text-[#8b949e]">{expanded ? '▼' : '▶'}</span>
          ) : (
            <span className="text-[#8b949e]">◈</span>
          )}
        </span>
        <span className="truncate">{node.name}</span>
      </button>
      {node.type === 'directory' && expanded && node.children && (
        <div>
          {node.children
            .sort((a, b) => {
              if (a.type === 'directory' && b.type !== 'directory') return -1
              if (a.type !== 'directory' && b.type === 'directory') return 1
              return a.name.localeCompare(b.name)
            })
            .map(child => (
              <TreeNodeComponent
                key={child.path}
                node={child}
                depth={depth + 1}
                onFileSelect={onFileSelect}
                selectedPath={selectedPath}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default function FileExplorer({
  sessionId,
  onFileSelect,
  selectedPath,
  refreshKey,
}: FileExplorerProps) {
  const [tree, setTree] = useState<TreeNode | null>(null)

  useEffect(() => {
    if (!sessionId) return
    fetch(`/api/files?tree=1&sessionId=${sessionId}`)
      .then(r => r.json())
      .then(data => {
        if (data.tree) setTree(data.tree)
      })
      .catch(() => setTree(null))
  }, [sessionId, refreshKey])

  if (!tree) {
    return (
      <div className="h-full flex flex-col bg-[#0d1117] border-r border-[#30363d]">
        <div className="px-3 py-2 border-b border-[#30363d]">
          <h2 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">
            Files
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-xs text-[#8b949e] p-4 text-center">
          {sessionId ? 'No files yet' : 'Start a session'}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#0d1117] border-r border-[#30363d]">
      <div className="px-3 py-2 border-b border-[#30363d]">
        <h2 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">
          Files
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <TreeNodeComponent
          node={tree}
          depth={0}
          onFileSelect={onFileSelect}
          selectedPath={selectedPath}
        />
      </div>
    </div>
  )
}
