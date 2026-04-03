import { NextRequest } from 'next/server'
import { createSession, getSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { message, apiKey, model, baseUrl } = body

  console.log('[API/chat] POST received:', { message: message?.slice(0, 50), model, baseUrl, hasSessionId: !!body.sessionId })

  if (!apiKey) {
    console.error('[API/chat] No API key')
    return new Response(JSON.stringify({ error: 'API key required' }), { status: 400 })
  }

  if (!message) {
    console.error('[API/chat] No message')
    return new Response(JSON.stringify({ error: 'Message required' }), { status: 400 })
  }

  const sessionId = body.sessionId || crypto.randomUUID()
  console.log('[API/chat] Session:', sessionId)
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

        console.log('[API/chat] Starting QueryEngine.submitMessage')
        let eventCount = 0
        for await (const event of engine.submitMessage(userMsg)) {
          eventCount++
          console.log(`[API/chat] Event #${eventCount}:`, event.type)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ ...event, sessionId })}\n\n`))
        }

        console.log('[API/chat] Done streaming,', eventCount, 'events')
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
