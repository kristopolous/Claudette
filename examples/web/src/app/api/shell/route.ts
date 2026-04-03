import { NextRequest } from 'next/server'
import { spawn } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

const WORKSPACE_ROOT = path.join(process.cwd(), '.claudette-workspaces')
const shells = new Map<string, ReturnType<typeof spawn>>()

function ensureWorkspace(sessionId: string): string {
  const dir = path.join(WORKSPACE_ROOT, sessionId)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  return dir
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { action, sessionId, data } = body

  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'sessionId required' }), { status: 400 })
  }

  if (action === 'create') {
    if (shells.has(sessionId)) {
      return new Response(JSON.stringify({ ok: true }))
    }
    const cwd = ensureWorkspace(sessionId)
    const proc = spawn('bash', [], {
      cwd,
      env: { ...process.env, HOME: cwd, TERM: 'xterm-256color', PS1: '\\u@jsh:\\w\\$ ' },
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: true,
    })
    shells.set(sessionId, proc)
    proc.on('exit', () => shells.delete(sessionId))
    return new Response(JSON.stringify({ ok: true }))
  }

  if (action === 'write') {
    const proc = shells.get(sessionId)
    if (proc?.stdin && data) {
      proc.stdin.write(data)
    }
    return new Response(JSON.stringify({ ok: true }))
  }

  if (action === 'resize') {
    return new Response(JSON.stringify({ ok: true }))
  }

  if (action === 'kill') {
    const proc = shells.get(sessionId)
    proc?.kill()
    shells.delete(sessionId)
    return new Response(JSON.stringify({ ok: true }))
  }

  return new Response(JSON.stringify({ error: 'unknown action' }), { status: 400 })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')

  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'sessionId required' }), { status: 400 })
  }

  const proc = shells.get(sessionId)
  if (!proc) {
    return new Response(JSON.stringify({ error: 'shell not created' }), { status: 404 })
  }

  const encoder = new TextEncoder()
  let closed = false
  const stream = new ReadableStream({
    start(controller) {
      const safeEnqueue = (data: Uint8Array) => {
        if (!closed) controller.enqueue(data)
      }
      const safeClose = () => {
        if (!closed) {
          closed = true
          controller.close()
        }
      }
      const onData = (chunk: Buffer) => {
        safeEnqueue(encoder.encode(`data: ${JSON.stringify({ type: 'output', data: chunk.toString() })}\n\n`))
      }
      proc.stdout?.on('data', onData)
      proc.stderr?.on('data', onData)
      proc.on('exit', () => {
        safeEnqueue(encoder.encode(`data: ${JSON.stringify({ type: 'exit' })}\n\n`))
        safeClose()
      })
    },
    cancel() {
      closed = true
      const p = shells.get(sessionId)
      p?.kill()
      shells.delete(sessionId)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
