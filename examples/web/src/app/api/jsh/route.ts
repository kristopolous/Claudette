import { NextRequest } from 'next/server'
import { getSession } from '@/lib/session'
import { jsh } from '@/lib/virtualfs/jsh'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { command, sessionId, cwd } = body

  if (!command || !sessionId) {
    return new Response(JSON.stringify({ error: 'command and sessionId required' }), { status: 400 })
  }

  const session = getSession(sessionId)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Session not found' }), { status: 404 })
  }

  try {
    const result = await jsh(command, session.vfs, cwd || '/')
    return new Response(JSON.stringify({
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      cwd: result.cwd || cwd || '/',
    }))
  } catch (e) {
    return new Response(JSON.stringify({
      stdout: '',
      stderr: e instanceof Error ? e.message : String(e),
      exitCode: 1,
      cwd: cwd || '/',
    }), { status: 500 })
  }
}
