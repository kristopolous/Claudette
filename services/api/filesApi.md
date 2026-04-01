# services/api/filesApi

## Purpose
Files API client for downloading and uploading files to Anthropic Public Files API.

## Imports
- **Stdlib**: `crypto`, `fs/promises`, `path`
- **External**: `axios`
- **Internal**: array utils, cwd, debug, errors, log, sleep, analytics

## Logic
1. `FILES_API_BETA_HEADER` - 'files-api-2025-04-14,oauth-2025-04-20'
2. `ANTHROPIC_VERSION` - '2023-06-01'
3. `getDefaultApiBaseUrl` - ANTHROPIC_BASE_URL or CLAUDE_CODE_API_BASE_URL or public API
4. `File` - fileId, relativePath from CLI args (--file=<file_id>:<relative_path>)
5. `FilesApiConfig` - oauthToken, baseUrl, sessionId
6. `DownloadResult` - fileId, path, success, error, bytesWritten
7. `MAX_RETRIES` (3) - retry limit for file operations
8. Downloads files to session-specific directories
9. Creates directories recursively as needed
10. Logs debug info and errors
11. Uses sleep for retry backoff
12. Logs events for analytics
13. Used by Claude Code agent for file attachments at session startup

## Exports
- `FILES_API_BETA_HEADER` - beta header constant
- `ANTHROPIC_VERSION` - API version constant
- `File` - file specification type
- `FilesApiConfig` - API config type
- `DownloadResult` - download result type
- `getDefaultApiBaseUrl` - gets default API base URL
- (File download/upload functions)
