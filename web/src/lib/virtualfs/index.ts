import picomatch from 'picomatch'
import { VirtualFSNode, VirtualFS } from '../../types'

function resolvePath(path: string): string[] {
  const parts = path.split('/').filter(Boolean)
  const resolved: string[] = []
  for (const part of parts) {
    if (part === '..') {
      resolved.pop()
    } else if (part !== '.') {
      resolved.push(part)
    }
  }
  return resolved
}

function getNode(root: VirtualFSNode, pathParts: string[]): VirtualFSNode | null {
  let current: VirtualFSNode = root
  for (const part of pathParts) {
    if (current.type !== 'directory' || !current.children) return null
    const child = current.children.get(part)
    if (!child) return null
    current = child
  }
  return current
}

function ensureDir(root: VirtualFSNode, pathParts: string[]): VirtualFSNode {
  let current: VirtualFSNode = root
  for (const part of pathParts) {
    if (current.type !== 'directory') throw new Error(`Not a directory: ${part}`)
    if (!current.children) current.children = new Map()
    let child = current.children.get(part)
    if (!child) {
      child = { type: 'directory', name: part, children: new Map(), modifiedAt: new Date() }
      current.children.set(part, child)
    }
    current = child
  }
  return current
}

function createDefaultRoot(): VirtualFSNode {
  return {
    type: 'directory',
    name: '/',
    children: new Map([
      ['README.md', {
        type: 'file',
        name: 'README.md',
        content: '# Welcome to Claudette Web\n\nThis is a virtualized environment. You can create, edit, and run files here.\n\nTry asking me to create a file or run a command!',
        modifiedAt: new Date(),
      }],
      ['src', {
        type: 'directory',
        name: 'src',
        children: new Map([
          ['index.ts', {
            type: 'file',
            name: 'index.ts',
            content: 'console.log("Hello from Claudette Web!")\n',
            modifiedAt: new Date(),
          }],
        ]),
        modifiedAt: new Date(),
      }],
    ]),
    modifiedAt: new Date(),
  }
}

export class VirtualFSImpl implements VirtualFS {
  root: VirtualFSNode

  constructor() {
    this.root = createDefaultRoot()
  }

  private getPathParts(path: string): string[] {
    return resolvePath(path)
  }

  private findNode(path: string): VirtualFSNode | null {
    const parts = this.getPathParts(path)
    return getNode(this.root, parts)
  }

  exists(path: string): boolean {
    return this.findNode(path) !== null
  }

  isDir(path: string): boolean {
    const node = this.findNode(path)
    return node?.type === 'directory' || false
  }

  mkdir(path: string): void {
    const parts = this.getPathParts(path)
    ensureDir(this.root, parts)
  }

  list(path: string): string[] {
    const node = this.findNode(path)
    if (!node || node.type !== 'directory' || !node.children) return []
    return Array.from(node.children.keys())
  }

  async read(path: string): Promise<string> {
    const node = this.findNode(path)
    if (!node) throw new Error(`File not found: ${path}`)
    if (node.type === 'directory') throw new Error(`Is a directory: ${path}`)
    return node.content ?? ''
  }

  async write(path: string, content: string): Promise<void> {
    const parts = this.getPathParts(path)
    const fileName = parts.pop()
    if (!fileName) throw new Error('Invalid path')
    const parent = ensureDir(this.root, parts)
    if (parent.type !== 'directory' || !parent.children) throw new Error('Not a directory')
    parent.children.set(fileName, {
      type: 'file',
      name: fileName,
      content,
      modifiedAt: new Date(),
    })
  }

  async edit(path: string, oldString: string, newString: string): Promise<string> {
    const content = await this.read(path)
    if (!content.includes(oldString)) {
      const lines = content.split('\n')
      const oldLines = oldString.split('\n')
      let bestMatch = -1
      let bestScore = 0
      for (let i = 0; i <= lines.length - oldLines.length; i++) {
        let score = 0
        for (let j = 0; j < oldLines.length; j++) {
          if (lines[i + j]?.trim() === oldLines[j]?.trim()) score++
        }
        if (score > bestScore) {
          bestScore = score
          bestMatch = i
        }
      }
      if (bestMatch >= 0 && bestScore > oldLines.length * 0.5) {
        const before = lines.slice(0, bestMatch).join('\n')
        const after = lines.slice(bestMatch + oldLines.length).join('\n')
        const newContent = [before, newString, after].filter(Boolean).join('\n')
        const parts = this.getPathParts(path)
        const fileName = parts.pop()!
        const parent = ensureDir(this.root, parts)
        if (parent.children) {
          parent.children.set(fileName, {
            type: 'file',
            name: fileName,
            content: newContent,
            modifiedAt: new Date(),
          })
        }
        return newContent
      }
      throw new Error(`Could not find text to replace in ${path}`)
    }
    const newContent = content.replace(oldString, newString)
    const parts = this.getPathParts(path)
    const fileName = parts.pop()!
    const parent = ensureDir(this.root, parts)
    if (parent.children) {
      parent.children.set(fileName, {
        type: 'file',
        name: fileName,
        content: newContent,
        modifiedAt: new Date(),
      })
    }
    return newContent
  }

  async glob(pattern: string): Promise<string[]> {
    const results: string[] = []
    const isMatch = picomatch(pattern)

    const walk = (node: VirtualFSNode, currentPath: string) => {
      const fullPath = currentPath ? `${currentPath}/${node.name}` : node.name
      if (node.name !== '/' && isMatch(fullPath)) {
        results.push(fullPath)
      }
      if (node.type === 'directory' && node.children) {
        for (const child of node.children.values()) {
          walk(child, fullPath === '/' ? '' : fullPath)
        }
      }
    }

    walk(this.root, '')
    return results
  }

  async grep(pattern: string, searchPath?: string): Promise<{ file: string; line: number; match: string }[]> {
    const results: Array<{ file: string; line: number; match: string }> = []
    const regex = new RegExp(pattern, 'i')

    const walk = (node: VirtualFSNode, currentPath: string) => {
      const fullPath = currentPath ? `${currentPath}/${node.name}` : node.name
      if (node.type === 'file' && node.content) {
        const effectivePath = fullPath === '/' ? '.' : fullPath
        if (searchPath && !effectivePath.startsWith(searchPath)) return
        const lines = node.content.split('\n')
        lines.forEach((line, idx) => {
          if (regex.test(line)) {
            results.push({ file: effectivePath, line: idx + 1, match: line.trim() })
          }
        })
      }
      if (node.type === 'directory' && node.children) {
        for (const child of node.children.values()) {
          walk(child, fullPath === '/' ? '' : fullPath)
        }
      }
    }

    walk(this.root, '')
    return results
  }
}

export function createVirtualFS(): VirtualFS {
  return new VirtualFSImpl()
}
