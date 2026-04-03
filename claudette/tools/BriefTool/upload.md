# BriefTool/upload

## Purpose

Provides `uploadBriefAttachment`, an async function that uploads attachment files (from BriefTool) to the private API (`/api/oauth/file_upload`) so web viewers can preview them. Enables cross-device rendering where file paths on Claude's machine are meaningless to a web client. Implements best-effort upload with graceful degradation on any failure.

## Imports

- **Stdlib**:
  - `crypto/randomUUID`
  - `fs/promises/readFile`
  - `path/basename`, `path/extname`
- **External**:
  - `axios` (HTTP client)
  - `zod/v4` (`z`, `lazySchema`)
  - `BUILDFLAGS/feature` (compile-time feature flag)
- **Internal**:
  - Bridge: `getBridgeAccessToken`, `getBridgeBaseUrlOverride`
  - OAuth: `getOauthConfig`
  - Debug: `logForDebugging`
  - Utils: `lazySchema`, `jsonStringify`

## Logic

**Constants**:
- `MAX_UPLOAD_BYTES = 30 * 1024 * 1024` (30 MB, matches backend limit)
- `UPLOAD_TIMEOUT_MS = 30000`
- `MIME_BY_EXT`: Maps image extensions to MIME types (png, jpg, jpeg, gif, webp)
- `uploadResponseSchema`: Zod schema expecting `{ file_uuid: string }`

**Functions**:
- `guessMimeType(filename)`: Returns image/* for whitelisted extensions, else `application/octet-stream`
- `debug(msg)`: Prefixes log with `[brief:upload]`
- `getBridgeBaseUrl()`: Resolves base URL from env `ANTHROPIC_BASE_URL`, override, or OAuth config
- `uploadBriefAttachment(fullPath, size, ctx): Promise<string | undefined>`:
  - Only executes if `feature('BRIDGE_MODE')` is true (compiled-in)
  - Early returns (graceful degradation):
    - If `replBridgeEnabled` false
    - If size exceeds 30 MB
    - If OAuth token missing
    - If file read fails
  - Builds multipart/form-data body with file part, boundary, and content
  - POSTs to `${baseUrl}/api/oauth/file_upload` with `Authorization: Bearer <token>`
  - Accepts any HTTP status (`validateStatus: () => true`) and checks explicitly for 201
  - Parses response with Zod; returns `file_uuid` on success
  - Logs debug on any failure (non-201 status, parse error, network error) and returns `undefined`

The upload is best-effort; attachments without `file_uuid` still render in local/desktop via the original path.

## Exports

- `BriefUploadContext` interface: `{ replBridgeEnabled: boolean; signal?: AbortSignal }`
- `uploadBriefAttachment(fullPath: string, size: number, ctx: BriefUploadContext): Promise<string | undefined>`
