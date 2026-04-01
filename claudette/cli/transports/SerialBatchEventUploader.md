# SerialBatchEventUploader

## Purpose
Implements serial ordered event uploader with batching, retry, and backpressure for reliable event delivery.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: JSON utils

## Logic
1. `RetryableError` - thrown from send() to request server-supplied retry delay
2. enqueue() adds events to pending buffer
3. At most 1 POST in-flight at a time
4. Drains up to maxBatchSize items per POST
5. maxBatchBytes limits cumulative JSON size (first item always included)
6. On failure: exponential backoff with jitter, retries indefinitely
7. maxConsecutiveFailures drops failing batch and moves on
8. Backpressure: enqueue() blocks when maxQueueSize reached
9. flush() blocks until pending empty
10. droppedBatchCount tracks silent drops for diagnostics

## Exports
- `RetryableError` - error class with optional retryAfterMs override
- `SerialBatchEventUploaderConfig` - configuration interface
- `SerialBatchEventUploader<T>` - generic class for batched event upload
