import { NextRequest } from 'next/server'
import { getSession } from '../chat/route'

function buildTree(vfs: any, path: string): any {
  const isDir = vfs.isDir(path)
  const node: any = { name: path.split('/').pop() || '/', path, type: isDir ? 'directory' : 'file' }
  if (isDir) {
    const entries = vfs.list(path)
    node.children = entries.map((entry: string) => buildTree(vfs, `${path}/${entry}`))
  }
  return node
}

function collectFiles(vfs: any, path: string): Array<{ path: string; content: string }> {
  const results: Array<{ path: string; content: string }> = []
  if (vfs.isDir(path)) {
    const entries = vfs.list(path)
    for (const entry of entries) {
      const childPath = `${path}/${entry}`
      results.push(...collectFiles(vfs, childPath))
    }
  } else {
    try {
      results.push({ path, content: vfs.readSync ? vfs.readSync(path) : '' })
    } catch {
      // skip unreadable files
    }
  }
  return results
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const sessionId = searchParams.get('sessionId')
  const tree = searchParams.get('tree')
  const export_ = searchParams.get('export')

  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'sessionId required' }), { status: 400 })
  }

  const session = getSession(sessionId, '', '', '')
  if (!session) {
    return new Response(JSON.stringify({ error: 'Session not found' }), { status: 404 })
  }

  if (export_) {
    const files = collectFiles(session.vfs, '/')
    return new Response(JSON.stringify({ files }))
  }

  if (tree) {
    return new Response(JSON.stringify({ tree: buildTree(session.vfs, '/') }))
  }

  if (!path) {
    return new Response(JSON.stringify({ error: 'Path required' }), { status: 400 })
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
