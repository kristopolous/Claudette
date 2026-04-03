import { QueryEngine } from '../queryEngine'
import { createVirtualFS } from '../virtualfs'
import { getTools } from '../tools'
import * as fs from 'fs'
import * as path from 'path'

const SESSIONS_DIR = path.join(process.cwd(), '.claudette-sessions')

function ensureSessionsDir() {
  if (!fs.existsSync(SESSIONS_DIR)) {
    fs.mkdirSync(SESSIONS_DIR, { recursive: true })
  }
}

function sessionFile(sessionId: string) {
  return path.join(SESSIONS_DIR, `${sessionId}.json`)
}

function workspaceDir(sessionId: string) {
  return path.join(process.cwd(), '.claudette-workspaces', sessionId)
}

interface SessionMeta {
  baseUrl: string
  model: string
  createdAt: string
}

const sessions = new Map<string, { engine: QueryEngine; vfs: ReturnType<typeof createVirtualFS>; baseUrl: string }>()

export function createSession(sessionId: string, apiKey: string, model: string, baseUrl: string) {
  ensureSessionsDir()
  const wsDir = workspaceDir(sessionId)
  const vfs = createVirtualFS(wsDir)
  const engine = new QueryEngine({
    apiKey,
    model,
    baseUrl,
    maxTurns: 20,
    tools: getTools(),
    vfs,
    cwd: '/',
  })
  sessions.set(sessionId, { engine, vfs, baseUrl })

  fs.writeFileSync(sessionFile(sessionId), JSON.stringify({
    baseUrl,
    model,
    createdAt: new Date().toISOString(),
  } as SessionMeta))

  return sessions.get(sessionId)!
}

export function getSession(sessionId: string) {
  const existing = sessions.get(sessionId)
  if (existing) return existing

  const metaFile = sessionFile(sessionId)
  if (!fs.existsSync(metaFile)) return null

  try {
    const meta: SessionMeta = JSON.parse(fs.readFileSync(metaFile, 'utf-8'))
    const wsDir = workspaceDir(sessionId)
    const vfs = createVirtualFS(wsDir)
    const engine = new QueryEngine({
      apiKey: '',
      model: meta.model || '',
      baseUrl: meta.baseUrl,
      maxTurns: 20,
      tools: getTools(),
      vfs,
      cwd: '/',
    })
    sessions.set(sessionId, { engine, vfs, baseUrl: meta.baseUrl })
    return sessions.get(sessionId)!
  } catch {
    return null
  }
}
