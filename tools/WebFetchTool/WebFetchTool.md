# WebFetchTool.ts

## Purpose
Fetches content from specified URLs, converts HTML to markdown, and processes the content using an AI model to extract relevant information based on a user-provided prompt.

## Items

### WebFetchTool
**Purpose**: Main tool definition that satisfies `ToolDef<InputSchema, Output>`.
**Logic**: Built with `buildTool()`. Key properties and methods:
- `name`: `WEB_FETCH_TOOL_NAME` ("WebFetch")
- `searchHint`: "fetch and extract content from a URL"
- `maxResultSizeChars`: 100,000 (tool result persistence threshold)
- `shouldDefer`: true
- `isConcurrencySafe`: true
- `isReadOnly`: true

**Key Methods**:
- `description(input)`: Returns description about what hostname Claude wants to fetch from
- `userFacingName()`: Returns "Fetch"
- `checkPermissions(input, context)`: Handles permission checks including preapproved hosts and permission rules (allow/ask/deny)
- `prompt()`: Returns auth warning and tool description
- `validateInput(input)`: Validates URL format
- `call({ url, prompt }, { abortController, options })`: Main execution - fetches URL, converts to markdown, applies prompt via AI model
- `mapToolResultToToolResultBlockParam(result, toolUseID)`: Formats output for model

### Input Schema
```typescript
{
  url: string;      // The URL to fetch content from (must be valid URL)
  prompt: string;   // The prompt to run on the fetched content
}
```

### Output Schema
```typescript
{
  bytes: number;       // Size of fetched content in bytes
  code: number;        // HTTP response code
  codeText: string;    // HTTP response code text
  result: string;      // Processed result from applying prompt to content
  durationMs: number;  // Time taken to fetch and process
  url: string;         // The URL that was fetched
}
```

### Redirect Handling
When a URL redirects to a different host, the tool returns a special message with:
- Original URL and redirect URL
- HTTP status code and text
- Instructions to make a new WebFetch request with the redirect URL

## Imports
- **Stdlib**: None directly
- **External**: `zod/v4`
- **Internal**: `src/Tool.js`, `src/types/permissions.js`, `src/utils/format.js`, `src/utils/lazySchema.js`, `src/utils/permissions/*`, `src/services/api/claude.js`

## Insights
- **Caching**: 15-minute TTL cache (50MB limit) for fetched URL content
- **Domain Blocking**: Checks against Anthropic's domain blocklist before fetching
- **HTTP Upgrades**: Automatically upgrades HTTP to HTTPS
- **Preapproved Hosts**: Certain hosts are pre-approved for fetching
- **Binary Content**: PDFs and other binary content are saved to disk with proper extensions
- **Content Truncation**: Markdown content truncated at 100,000 characters
- **Redirect Security**: Only permits redirects that stay on the same host (with www. variations allowed)
- **Max URL Length**: 2000 characters (removed earlier 250-char restriction)
- **Max HTTP Content**: 10MB limit on fetched content
- **Fetch Timeout**: 60 second timeout for HTTP requests
- **Preflight Check**: Optional domain blocklist check (skipped if `skipWebFetchPreflight` setting is enabled)

## Exports
- `WebFetchTool` - main tool definition
- `Output` - output schema type (z.infer<OutputSchema>)
