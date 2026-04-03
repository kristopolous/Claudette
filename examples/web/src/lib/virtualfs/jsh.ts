import { VirtualFS } from '../../types'

interface JshContext {
  vfs: VirtualFS
  cwd: string
  env: Map<string, string>
}

export interface JshResult {
  stdout: string
  stderr: string
  exitCode: number
  cwd: string
}

function parseCommand(cmd: string): { command: string; args: string[] } {
  const parts = cmd.match(/(?:[^\s"]+|"[^"]*")+/g) || []
  const cleaned = parts.map(p => p.replace(/^"|"$/g, ''))
  return { command: cleaned[0] || '', args: cleaned.slice(1) }
}

function resolvePath(cwd: string, target: string): string {
  if (target.startsWith('/')) return target
  const parts = [...cwd.split('/').filter(Boolean), ...target.split('/')]
  const resolved: string[] = []
  for (const part of parts) {
    if (part === '..') resolved.pop()
    else if (part !== '.') resolved.push(part)
  }
  return '/' + resolved.join('/')
}

async function handleCd(ctx: JshContext, args: string[]): Promise<JshResult> {
  const target = args[0] || '/'
  const resolved = resolvePath(ctx.cwd, target)
  if (!ctx.vfs.isDir(resolved)) {
    return { stdout: '', stderr: `jsh: cd: ${target}: No such directory`, exitCode: 1, cwd: ctx.cwd }
  }
  ctx.cwd = resolved
  return { stdout: '', stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handleLs(ctx: JshContext, args: string[]): Promise<JshResult> {
  const target = args.find(a => !a.startsWith('-')) || ctx.cwd
  const resolved = resolvePath(ctx.cwd, target)
  const entries = ctx.vfs.list(resolved)
  if (entries.length === 0) return { stdout: '', stderr: '', exitCode: 0, cwd: ctx.cwd }
  const showLong = args.includes('-l') || args.includes('-la')
  if (showLong) {
    const lines = entries.map(name => {
      const isDir = ctx.vfs.isDir(resolvePath(resolved, name))
      return `${isDir ? 'd' : '-'}rwxr-xr-x  1 user  group  0  Jan 01 00:00  ${name}`
    })
    return { stdout: lines.join('\n') + '\n', stderr: '', exitCode: 0, cwd: ctx.cwd }
  }
  return { stdout: entries.join('  ') + '\n', stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handleCat(ctx: JshContext, args: string[]): Promise<JshResult> {
  if (args.length === 0) return { stdout: '', stderr: 'jsh: cat: missing operand', exitCode: 1, cwd: ctx.cwd }
  const outputs: string[] = []
  for (const file of args) {
    if (file.startsWith('-')) continue
    const resolved = resolvePath(ctx.cwd, file)
    try {
      outputs.push(await ctx.vfs.read(resolved))
    } catch {
      return { stdout: '', stderr: `jsh: cat: ${file}: No such file`, exitCode: 1, cwd: ctx.cwd }
    }
  }
  return { stdout: outputs.join(''), stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handleMkdir(ctx: JshContext, args: string[]): Promise<JshResult> {
  const dirs = args.filter(a => !a.startsWith('-'))
  for (const dir of dirs) {
    const resolved = resolvePath(ctx.cwd, dir)
    ctx.vfs.mkdir(resolved)
  }
  return { stdout: '', stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handleTouch(ctx: JshContext, args: string[]): Promise<JshResult> {
  const files = args.filter(a => !a.startsWith('-'))
  for (const file of files) {
    const resolved = resolvePath(ctx.cwd, file)
    if (!ctx.vfs.exists(resolved)) {
      await ctx.vfs.write(resolved, '')
    }
  }
  return { stdout: '', stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handleEcho(ctx: JshContext, args: string[]): Promise<JshResult> {
  let output = args.join(' ')
  if (args[0] === '-n') {
    output = args.slice(1).join(' ')
    return { stdout: output, stderr: '', exitCode: 0, cwd: ctx.cwd }
  }
  return { stdout: output + '\n', stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handlePwd(ctx: JshContext): Promise<JshResult> {
  return { stdout: ctx.cwd + '\n', stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handleTree(ctx: JshContext, args: string[]): Promise<JshResult> {
  const target = args.find(a => !a.startsWith('-')) || ctx.cwd
  const resolved = resolvePath(ctx.cwd, target)

  const buildTree = async (path: string, prefix: string, isLast: boolean): Promise<string> => {
    const name = path.split('/').pop() || '/'
    let result = prefix + (isLast ? '└── ' : '├── ') + name + '\n'
    if (ctx.vfs.isDir(path)) {
      const entries = ctx.vfs.list(path)
      for (let i = 0; i < entries.length; i++) {
        const childPath = resolvePath(path, entries[i])
        const childIsLast = i === entries.length - 1
        const newPrefix = prefix + (isLast ? '    ' : '│   ')
        result += await buildTree(childPath, newPrefix, childIsLast)
      }
    }
    return result
  }

  const entries = ctx.vfs.list(resolved)
  let output = resolved + '\n'
  for (let i = 0; i < entries.length; i++) {
    const childPath = resolvePath(resolved, entries[i])
    output += await buildTree(childPath, '', i === entries.length - 1)
  }
  return { stdout: output, stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handleFind(ctx: JshContext, args: string[]): Promise<JshResult> {
  const target = args.find(a => !a.startsWith('-')) || '.'
  const resolved = resolvePath(ctx.cwd, target === '.' ? ctx.cwd : target)
  const results: string[] = []

  const walk = async (path: string) => {
    results.push(path)
    if (ctx.vfs.isDir(path)) {
      for (const entry of ctx.vfs.list(path)) {
        await walk(resolvePath(path, entry))
      }
    }
  }

  await walk(resolved)
  return { stdout: results.join('\n') + '\n', stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handleWc(ctx: JshContext, args: string[]): Promise<JshResult> {
  const files = args.filter(a => !a.startsWith('-'))
  if (files.length === 0) return { stdout: '      0       0       0\n', stderr: '', exitCode: 0, cwd: ctx.cwd }
  const outputs: string[] = []
  for (const file of files) {
    const resolved = resolvePath(ctx.cwd, file)
    try {
      const content = await ctx.vfs.read(resolved)
      const lines = content.split('\n').length
      const words = content.split(/\s+/).filter(Boolean).length
      const chars = content.length
      outputs.push(`${String(lines).padStart(7)} ${String(words).padStart(7)} ${String(chars).padStart(7)} ${file}`)
    } catch {
      return { stdout: '', stderr: `jsh: wc: ${file}: No such file`, exitCode: 1, cwd: ctx.cwd }
    }
  }
  return { stdout: outputs.join('\n') + '\n', stderr: '', exitCode: 0, cwd: ctx.cwd }
}

async function handleHead(ctx: JshContext, args: string[]): Promise<JshResult> {
  let n = 10
  const files: string[] = []
  for (const arg of args) {
    if (arg.startsWith('-n')) n = parseInt(arg.slice(2), 10) || 10
    else if (arg !== '-n') files.push(arg)
  }
  if (files.length === 0) return { stdout: '', stderr: 'jsh: head: missing operand', exitCode: 1, cwd: ctx.cwd }
  const resolved = resolvePath(ctx.cwd, files[0])
  try {
    const content = await ctx.vfs.read(resolved)
    return { stdout: content.split('\n').slice(0, n).join('\n') + '\n', stderr: '', exitCode: 0, cwd: ctx.cwd }
  } catch {
    return { stdout: '', stderr: `jsh: head: ${files[0]}: No such file`, exitCode: 1, cwd: ctx.cwd }
  }
}

async function handleTail(ctx: JshContext, args: string[]): Promise<JshResult> {
  let n = 10
  const files: string[] = []
  for (const arg of args) {
    if (arg.startsWith('-n')) n = parseInt(arg.slice(2), 10) || 10
    else if (arg !== '-n') files.push(arg)
  }
  if (files.length === 0) return { stdout: '', stderr: 'jsh: tail: missing operand', exitCode: 1, cwd: ctx.cwd }
  const resolved = resolvePath(ctx.cwd, files[0])
  try {
    const content = await ctx.vfs.read(resolved)
    return { stdout: content.split('\n').slice(-n).join('\n') + '\n', stderr: '', exitCode: 0, cwd: ctx.cwd }
  } catch {
    return { stdout: '', stderr: `jsh: tail: ${files[0]}: No such file`, exitCode: 1, cwd: ctx.cwd }
  }
}

const BUILTINS: Record<string, (ctx: JshContext, args: string[]) => Promise<JshResult>> = {
  cd: handleCd,
  ls: handleLs,
  cat: handleCat,
  mkdir: handleMkdir,
  touch: handleTouch,
  echo: handleEcho,
  pwd: handlePwd,
  tree: handleTree,
  find: handleFind,
  wc: handleWc,
  head: handleHead,
  tail: handleTail,
}

export async function jsh(command: string, vfs: VirtualFS, cwd: string): Promise<JshResult> {
  const ctx: JshContext = { vfs, cwd, env: new Map() }
  const trimmed = command.trim()
  if (!trimmed) return { stdout: '', stderr: '', exitCode: 0, cwd: ctx.cwd }

  const { command: cmd, args } = parseCommand(trimmed)

  if (BUILTINS[cmd]) {
    return BUILTINS[cmd](ctx, args)
  }

  if (cmd === 'python' || cmd === 'python3' || cmd === 'node' || cmd === 'deno' || cmd === 'bun') {
    return {
      stdout: '',
      stderr: `jsh: ${cmd}: runtime execution is simulated. Use Read/Write tools to create files instead.`,
      exitCode: 1,
      cwd: ctx.cwd,
    }
  }

  if (cmd === 'rm' || cmd === 'rmdir' || cmd === 'mv' || cmd === 'cp') {
    return {
      stdout: '',
      stderr: `jsh: ${cmd}: destructive operations are not allowed in virtualized environment`,
      exitCode: 1,
      cwd: ctx.cwd,
    }
  }

  return {
    stdout: '',
    stderr: `jsh: command not found: ${cmd}\n\nAvailable commands: cd, ls, cat, mkdir, touch, echo, pwd, tree, find, wc, head, tail`,
    exitCode: 127,
    cwd: ctx.cwd,
  }
}
