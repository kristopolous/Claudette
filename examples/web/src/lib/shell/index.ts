import { spawn, ChildProcess } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

const WORKSPACE_ROOT = path.join(process.cwd(), '.claudette-workspaces')

if (!fs.existsSync(WORKSPACE_ROOT)) {
  fs.mkdirSync(WORKSPACE_ROOT, { recursive: true })
}

const shells = new Map<string, { proc: ChildProcess; cwd: string }>()

export function getWorkspaceDir(sessionId: string): string {
  const dir = path.join(WORKSPACE_ROOT, sessionId)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function createShell(sessionId: string) {
  const cwd = getWorkspaceDir(sessionId)
  const proc = spawn('bash', ['-i'], {
    cwd,
    env: {
      ...process.env,
      HOME: cwd,
      TERM: 'xterm-256color',
      PS1: '\\u@jsh:\\w\\$ ',
    },
    stdio: ['pipe', 'pipe', 'pipe'],
  })

  shells.set(sessionId, { proc, cwd })

  proc.on('exit', () => {
    shells.delete(sessionId)
  })

  return { proc, cwd }
}

export function getShell(sessionId: string) {
  return shells.get(sessionId) || null
}

export function writeShell(sessionId: string, data: string) {
  const shell = shells.get(sessionId)
  if (shell?.proc.stdin) {
    shell.proc.stdin.write(data)
    return true
  }
  return false
}

export function resizeShell(sessionId: string, cols: number, rows: number) {
  const shell = shells.get(sessionId)
  if (shell?.proc) {
    // bash doesn't support resize via stdin, but we track it
  }
}
