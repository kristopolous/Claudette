# WebFetchTool/utils.ts

## Purpose

Provides core utilities for the WebFetchTool: URL validation, domain blocklist checking, safe redirect handling, content fetching with caching, HTML-to-markdown conversion, and optional prompt application via a secondary model. Implements security boundaries (domain preapproval, egress blocking) and resource limits.

## Imports

- **Stdlib**: `Buffer`
- **External**:
  - `axios` (HTTP client)
  - `lru-cache` (caching)
  - `turndown` (HTML → markdown)
- **Internal**:
  - Analytics: `logEvent`
  - API: `queryHaiku`
  - Errors: `AbortError`
  - HTTP: `getWebFetchUserAgent`
  - Logging: `logError`
  - MCP: `isBinaryContentType`, `persistBinaryContent`
  - Settings: `getSettings_DEPRECATED`
  - System prompt: `asSystemPrompt`
  - WebFetchTool: `isPreapprovedHost`, `makeSecondaryModelPrompt`

## Logic

**Error Classes**:
- `DomainBlockedError`: Domain explicitly blocked by allowlist
- `DomainCheckFailedError`: Unable to contact blocklist service (network/enterprise policy)
- `EgressBlockedError`: Egress proxy blocked the domain (403 with `x-proxy-error: blocked-by-allowlist`)

**Caches** (LRU):
- `URL_CACHE`: 15-minute TTL, 50MB max size; stores `{bytes, code, codeText, content, contentType, persistedPath?, persistedSize?}`
- `DOMAIN_CHECK_CACHE`: 5-minute TTL, max 128 entries; stores `true` for allowed domains only

**Lazy Service**:
- `getTurndownService()`: Dynamically imports and instantiates Turndown HTML-to-markdown converter; reused across calls

**Constants**:
- `MAX_URL_LENGTH = 2000` (no strict limit due to JWT-signed URLs)
- `MAX_HTTP_CONTENT_LENGTH = 10MB`
- `FETCH_TIMEOUT_MS = 60s`
- `DOMAIN_CHECK_TIMEOUT_MS = 10s`
- `MAX_REDIRECTS = 10`
- `MAX_MARKDOWN_LENGTH = 100,000` for prompt application

**Functions**:
- `isPreapprovedUrl(url)`: Returns true if hostname+path in preapproved list
- `validateURL(url)`: Checks length, parses URL, rejects credentials, ensures hostname has ≥2 parts
- `checkDomainBlocklist(domain)`: Queries Anthropic domain_info API; caches `allowed` only; returns `allowed`/`blocked`/`check_failed`
- `isPermittedRedirect(original, redirect)`: Allows same-origin redirects and `www.` prefix changes; disallows port/username/password/protocol changes
- `getWithPermittedRedirects(url, signal, redirectChecker, depth=0)`: Fetches with `maxRedirects: 0`; manually follows permitted redirects recursively; detects egress blocks; returns `AxiosResponse<ArrayBuffer>` or `RedirectInfo`
- `getURLMarkdownContent(url, abortController)`: Main fetch entry
  - Validates URL, checks cache, upgrades http→https, performs blocklist check (unless skipWebFetchPreflight setting), logs hostname for `ant` users
  - Calls `getWithPermittedRedirects` with `isPermittedRedirect`
  - If binary content type: persists raw buffer to disk via `persistBinaryContent`
  - Converts HTML to markdown via Turndown; non-HTML used raw
  - Caches entry under original URL with size weight
  - Returns `FetchedContent` (or `RedirectInfo`)
- `applyPromptToMarkdown(prompt, markdownContent, signal, isNonInteractiveSession, isPreapprovedDomain)`: Sends truncated content + prompt to secondary model (Haiku) via `queryHaiku`; returns transformed text; throws on abort

## Exports

- `clearWebFetchCache(): void`
- `isPreapprovedUrl(url: string): boolean`
- `validateURL(url: string): boolean`
- `checkDomainBlocklist(domain: string): Promise<DomainCheckResult>`
- `isPermittedRedirect(originalUrl: string, redirectUrl: string): boolean`
- `getWithPermittedRedirects(url: string, signal: AbortSignal, redirectChecker: (original, redirect) => boolean, depth?: number): Promise<AxiosResponse<ArrayBuffer> | RedirectInfo>`
- `FetchedContent` type
- `getURLMarkdownContent(url: string, abortController: AbortController): Promise<FetchedContent | RedirectInfo>`
- `applyPromptToMarkdown(prompt: string, markdownContent: string, signal: AbortSignal, isNonInteractiveSession: boolean, isPreapprovedDomain: boolean): Promise<string>`
- `MAX_MARKDOWN_LENGTH: number`
