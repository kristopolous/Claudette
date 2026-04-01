# HybridTransport

## Purpose
Implements hybrid transport with WebSocket for reads and HTTP POST for writes, using serial batching for reliable delivery.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: SDK types, debug/diag/sessionIngressAuth utils, SerialBatchEventUploader, WebSocketTransport

## Logic
1. Write flow: messages batched via SerialBatchEventUploader with 100ms timer
2. stream_event messages accumulate in buffer before enqueue (reduces POST count)
3. Non-stream write flushes buffered stream_events first to preserve order
4. Serialization, retry, backpressure delegated to SerialBatchEventUploader
5. At most one POST in-flight; concurrent writes batch into next one
6. Exponential backoff + jitter on failure (500ms base, 8s max, 1s jitter)
7. maxQueueSize (100k) bounds memory, backpressure for awaiting callers
8. POST timeout (15s) prevents hung connections from blocking queue
9. Close grace period (3s) for queued writes on teardown
10. Converts WebSocket URL to POST URL for writes

## Exports
- `HybridTransport` - class extending WebSocketTransport with POST write path
- Constants: BATCH_FLUSH_INTERVAL_MS, POST_TIMEOUT_MS, CLOSE_GRACE_MS
