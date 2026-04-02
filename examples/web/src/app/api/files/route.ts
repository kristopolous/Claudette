import { NextRequest } from 'next/server'
import { getSession } from '../chat/route'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const sessionId = searchParams.get('sessionId')

  if (!path || !sessionId) {
    return new Response(JSON.stringify({ error: 'Path and sessionId required' }), { status: 400 })
  }

  const session = getSession(sessionId, '', '', '')
  if (!session) {
    return new Response(JSON.stringify({ error: 'Session not found' }), { status: 404 })
  }

  try {
    const content = await session.vfs.read(path)
    return new Response(JSON.stringify({ content }))
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), { status: 404 })
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { path, content, sessionId } = body

  if (!path || content === undefined || !sessionId) {
    return new Response(JSON.stringify({ error: 'Path, content, and sessionId required' }), { status: 400 })
  }

  const session = getSession(sessionId, '', '', '')
  if (!session) {
    return new Response(JSON.stringify({ error: 'Session not found' }), { status: 404 })
  }

  try {
    await session.vfs.write(path, content)
    return new Response(JSON.stringify({ success: true }))
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), { status: 500 })
  }
}
