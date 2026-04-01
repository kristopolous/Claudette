# voiceStreamSTT

## Purpose
Implements Anthropic voice_stream WebSocket client for push-to-talk speech-to-text.

## Imports
- **Stdlib**: `http`
- **External**: `ws` (WebSocket)
- **Internal**: oauth config, auth utils, debug, http, log, mtls, proxy, JSON utils, GrowthBook

## Logic
1. Ant-only feature (gated by feature('VOICE_MODE'))
2. Connects to /api/ws/speech_to_text/voice_stream with OAuth credentials
3. Uses conversation_engine backed models for STT
4. Wire protocol: JSON control messages (KeepAlive, CloseStream) + binary audio frames
5. Server responds with TranscriptText and TranscriptEndpoint messages
6. `KEEPALIVE_INTERVAL_MS` (8s) - heartbeat interval
7. `FINALIZE_TIMEOUTS_MS` - safety (5s) and noData (1.5s) timers
8. `VoiceStreamCallbacks` - onTranscript, onError, onClose, onReady
9. `FinalizeSource` - how finalize resolved (post_closestream_endpoint, no_data_timeout, safety_timeout, ws_close, ws_already_closed)
10. `VoiceStreamConnection` - send, finalize, close, isConnected methods
11. Handles proxy configuration and mTLS options

## Exports
- `VoiceStreamCallbacks` - callback interface for voice stream events
- `FinalizeSource` - type for finalize resolution source
- `VoiceStreamConnection` - connection interface
- `FINALIZE_TIMEOUTS_MS` - timeout constants
- (Voice stream client implementation)
