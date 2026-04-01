# tools/WebFetchTool/WebFetchTool

## Purpose
Tool for fetching content from URLs, converting HTML to markdown, and using an AI model to extract information based on a prompt.

## Imports
- **External**: `zod/v4`
- **Internal**: Tool buildTool, types permissions, format utils, lazySchema, PermissionDecision, permission rules, preapproved hosts, prompt constants, UI components, utils (applyPromptToMarkdown, FetchedContent, getURLMarkdownContent, isPreapprovedUrl, MAX_MARKDOWN_LENGTH)

## Logic
1. Validates URL format; HTTP automatically upgrades to HTTPS
2. Checks domain against blocklist; respects preapproved hosts
3. Permission check: uses allow/deny rules and preapproval
4. Fetching: 60s timeout, 10MB max content, handles redirects (same-host only)
5. Caching: 15-minute TTL, 50MB limit
6. Content handling: binary content (PDFs) saved to disk; HTML converted to markdown; truncation at 100k chars
7. Processing: applies user prompt via AI model to extract relevant info
8. Response includes bytes, HTTP code, codeText, result, durationMs, url
9. Redirect cases return special message with instructions to use new URL
10. Supports skipWebFetchPreflight setting to bypass preflight check

## Exports
- `WebFetchTool` - main tool definition
- `Output` - output type (bytes, code, codeText, result, durationMs, url)
