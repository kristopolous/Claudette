import picomatch from 'picomatch'
import * as fs from 'fs'
import * as path from 'path'
import { VirtualFSNode, VirtualFS } from '../../types'

function resolvePath(input: string): string[] {
  const parts = input.split('/').filter(Boolean)
  const resolved: string[] = []
  for (const part of parts) {
    if (part === '..') resolved.pop()
    else if (part !== '.') resolved.push(part)
  }
  return resolved
}

export class VirtualFSImpl implements VirtualFS {
  root: VirtualFSNode
  readonly baseDir: string

  constructor(baseDir?: string) {
    this.baseDir = baseDir || path.join(process.cwd(), '.claudette-workspace')
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true })
    }
    this.root = this._buildTree('/')
  }

  private _realPath(vfsPath: string): string {
    const parts = resolvePath(vfsPath)
    return path.join(this.baseDir, ...parts)
  }

  private _buildTree(dirPath: string): VirtualFSNode {
    const realPath = this._realPath(dirPath)
    const name = path.basename(dirPath) || '/'
    if (!fs.existsSync(realPath)) {
      return { type: 'directory', name, children: new Map(), modifiedAt: new Date() }
    }
    const stat = fs.statSync(realPath)
    if (!stat.isDirectory()) {
      return {
        type: 'file',
        name,
        content: fs.readFileSync(realPath, 'utf-8'),
        modifiedAt: stat.mtime,
      }
    }
    const children = new Map<string, VirtualFSNode>()
    const entries = fs.readdirSync(realPath)
    for (const entry of entries) {
      const childPath = dirPath === '/' ? `/${entry}` : `${dirPath}/${entry}`
      children.set(entry, this._buildTree(childPath))
    }
    return { type: 'directory', name, children, modifiedAt: stat.mtime }
  }

  private _refreshTree(dirPath: string) {
    this.root = this._buildTree('/')
  }

  private _getPathParts(vfsPath: string): string[] {
    return resolvePath(vfsPath)
  }

  exists(vfsPath: string): boolean {
    return fs.existsSync(this._realPath(vfsPath))
  }

  isDir(vfsPath: string): boolean {
    try {
      return fs.statSync(this._realPath(vfsPath)).isDirectory()
    } catch {
      return false
    }
  }

  mkdir(vfsPath: string): void {
    fs.mkdirSync(this._realPath(vfsPath), { recursive: true })
    this._refreshTree(vfsPath)
  }

  list(vfsPath: string): string[] {
    const realPath = this._realPath(vfsPath)
    if (!fs.existsSync(realPath) || !fs.statSync(realPath).isDirectory()) return []
    return fs.readdirSync(realPath)
  }

  async read(vfsPath: string): Promise<string> {
    const realPath = this._realPath(vfsPath)
    if (!fs.existsSync(realPath)) throw new Error(`File not found: ${vfsPath}`)
    const stat = fs.statSync(realPath)
    if (stat.isDirectory()) throw new Error(`Is a directory: ${vfsPath}`)
    return fs.readFileSync(realPath, 'utf-8')
  }

  async write(vfsPath: string, content: string): Promise<void> {
    const realPath = this._realPath(vfsPath)
    const dir = path.dirname(realPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(realPath, content)
    this._refreshTree(vfsPath)
  }

  async edit(vfsPath: string, oldString: string, newString: string): Promise<string> {
    const content = await this.read(vfsPath)
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
        fs.writeFileSync(this._realPath(vfsPath), newContent)
        this._refreshTree(vfsPath)
        return newContent
      }
      throw new Error(`Could not find text to replace in ${vfsPath}`)
    }
    const newContent = content.replace(oldString, newString)
    fs.writeFileSync(this._realPath(vfsPath), newContent)
    this._refreshTree(vfsPath)
    return newContent
  }

  async glob(pattern: string): Promise<string[]> {
    const results: string[] = []
    const isMatch = picomatch(pattern)

    const walk = (dir: string) => {
      if (!fs.existsSync(dir)) return
      const entries = fs.readdirSync(dir)
      for (const entry of entries) {
        const fullPath = path.join(dir, entry)
        const relativePath = path.relative(this.baseDir, fullPath)
        if (isMatch(relativePath)) {
          results.push('/' + relativePath)
        }
        if (fs.statSync(fullPath).isDirectory()) {
          walk(fullPath)
        }
      }
    }

    walk(this.baseDir)
    return results
  }

  async grep(pattern: string, searchPath?: string): Promise<{ file: string; line: number; match: string }[]> {
    const results: Array<{ file: string; line: number; match: string }> = []
    const regex = new RegExp(pattern, 'i')
    const searchRealPath = searchPath ? this._realPath(searchPath) : this.baseDir

    const walk = (dir: string) => {
      if (!fs.existsSync(dir)) return
      const entries = fs.readdirSync(dir)
      for (const entry of entries) {
        const fullPath = path.join(dir, entry)
        if (fs.statSync(fullPath).isDirectory()) {
          walk(fullPath)
        } else {
          const relativePath = '/' + path.relative(this.baseDir, fullPath)
          if (searchPath && !relativePath.startsWith(searchPath)) continue
          const content = fs.readFileSync(fullPath, 'utf-8')
          content.split('\n').forEach((line, idx) => {
            if (regex.test(line)) {
              results.push({ file: relativePath, line: idx + 1, match: line.trim() })
            }
          })
        }
      }
    }

    if (fs.statSync(searchRealPath).isDirectory()) {
      walk(searchRealPath)
    } else {
      const content = fs.readFileSync(searchRealPath, 'utf-8')
      const relativePath = '/' + path.relative(this.baseDir, searchRealPath)
      content.split('\n').forEach((line, idx) => {
        if (regex.test(line)) {
          results.push({ file: relativePath, line: idx + 1, match: line.trim() })
        }
      })
    }

    return results
  }

  exportAll(): Array<{ path: string; content: string }> {
    const results: Array<{ path: string; content: string }> = []

    const walk = (dir: string) => {
      if (!fs.existsSync(dir)) return
      const entries = fs.readdirSync(dir)
      for (const entry of entries) {
        const fullPath = path.join(dir, entry)
        if (fs.statSync(fullPath).isDirectory()) {
          walk(fullPath)
        } else {
          const relativePath = '/' + path.relative(this.baseDir, fullPath)
          results.push({ path: relativePath, content: fs.readFileSync(fullPath, 'utf-8') })
        }
      }
    }

    walk(this.baseDir)
    return results
  }
}

export function createVirtualFS(baseDir?: string): VirtualFS {
  return new VirtualFSImpl(baseDir)
}
