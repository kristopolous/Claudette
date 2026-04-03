import { NextRequest } from 'next/server'
import { createSession, getSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { message, apiKey, model, baseUrl } = body

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key required' }), { status: 400 })
  }

  if (!message) {
    return new Response(JSON.stringify({ error: 'Message required' }), { status: 400 })
  }

  const sessionId = body.sessionId || crypto.randomUUID()
  const existing = getSession(sessionId)
  const { engine } = existing || createSession(sessionId, apiKey, model || 'gpt-4o', baseUrl || 'https://api.openai.com/v1')

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const userMsg = {
          role: 'user' as const,
          content: message,
        }

        for await (const event of engine.submitMessage(userMsg)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ ...event, sessionId })}\n\n`))
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      } catch (e) {
        console.error('[API/chat] Stream error:', e)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: e instanceof Error ? e.message : String(e), sessionId })}\n\n`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
