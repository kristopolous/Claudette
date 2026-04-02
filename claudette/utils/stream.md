# stream

## Purpose
Generic async stream primitive that implements `AsyncIterator<T>`, allowing producers to enqueue values and consumers to await them via `for await...of`. Supports completion signaling (`done()`) and error propagation (`error()`).

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
1. **Queue-based buffering**: Values enqueued via `enqueue()` are either resolved immediately if a consumer is waiting (Promise pending in `readResolve`), or pushed to an internal array queue.
2. **Single iteration**: The stream can only be iterated once — `[Symbol.asyncIterator]()` throws if called a second time.
3. **Backpressure**: `next()` returns a pending Promise when the queue is empty, resolving when `enqueue()` is called or rejecting when `error()` is called.
4. **Completion**: `done()` marks the stream as finished, resolving any pending `next()` with `{done: true}`.
5. **Error**: `error()` stores the error and rejects any pending `next()`. Subsequent `next()` calls also reject.
6. **Cleanup callback**: Optional `returned` callback passed to the constructor is invoked when `return()` is called (e.g., when a `for await` loop breaks early).

## Exports
- `Stream<T>` - async iterator class with `enqueue()`, `done()`, `error()`, and `return()` methods

## Source
`stream`
