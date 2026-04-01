# WorkerStateUploader

## Purpose
Implements coalescing uploader for PUT /worker (session state + metadata) with exponential backoff and retry.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: sleep utils

## Logic
1. Maintains 1 in-flight PUT + 1 pending patch (bounded at 2 slots)
2. New calls coalesce into pending (never grows beyond 1 slot)
3. On success: sends pending if exists
4. On failure: exponential backoff with jitter, retries indefinitely
5. Coalescing rules: top-level keys last-value-wins, nested keys use RFC 7396 merge
6. Null values preserved for server-side deletion
7. Absorbs any pending patches before each retry

## Exports
- `WorkerStateUploaderConfig` - configuration interface
- `WorkerStateUploader` - class implementing coalescing state uploader
