# FileReadTool

A tool for reading files, images, PDFs, and Jupyter notebooks.

## Overview

FileReadTool (`FILE_READ_TOOL_NAME`) provides comprehensive file reading capabilities with support for multiple file types, token-based content validation, and intelligent caching. It is concurrency-safe and read-only.

## Usage

```typescript
import { FileReadTool } from './FileReadTool'

const result = await FileReadTool.call({
  file_path: '/path/to/file.txt',
  offset: 1,        // optional: starting line number
  limit: 100,       // optional: number of lines to read
  pages: '1-5'      // optional: PDF page range
}, context)
```

## Input Schema

```typescript
{
  file_path: string       // Required: absolute path to the file to read
  offset?: number         // Optional: line number to start reading from (1-indexed)
  limit?: number          // Optional: number of lines to read
  pages?: string          // Optional: PDF page range (e.g., "1-5", "3", "10-20")
}
```

## Output Schema

The tool returns one of several result types:

### Text File
```typescript
{
  type: 'text',
  file: {
    filePath: string,
    content: string,       // File content with line numbers
    numLines: number,      // Number of lines in returned content
    startLine: number,     // Starting line number
    totalLines: number     // Total lines in the file
  }
}
```

### Image
```typescript
{
  type: 'image',
  file: {
    base64: string,        // Base64-encoded image data
    type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
    originalSize: number,   // Original file size in bytes
    dimensions?: {
      originalWidth?: number,
      originalHeight?: number,
      displayWidth?: number,
      displayHeight?: number
    }
  }
}
```

### Notebook
```typescript
{
  type: 'notebook',
  file: {
    filePath: string,
    cells: any[]            // Array of notebook cells
  }
}
```

### PDF
```typescript
{
  type: 'pdf',
  file: {
    filePath: string,
    base64: string,         // Base64-encoded PDF data
    originalSize: number
  }
}
```

### PDF Page Extraction
```typescript
{
  type: 'parts',
  file: {
    filePath: string,
    originalSize: number,
    count: number,           // Number of pages extracted
    outputDir: string        // Directory containing extracted page images
  }
}
```

### File Unchanged (Deduplication)
```typescript
{
  type: 'file_unchanged',
  file: {
    filePath: string
  }
}
```

## Features

### Supported File Types

| Type | Extensions | Notes |
|------|------------|-------|
| Text | Any | Line-by-line reading with offset/limit |
| Image | png, jpg, jpeg, gif, webp | Automatic resizing and compression |
| PDF | pdf | Full reading or page extraction |
| Notebook | ipynb | JSON cell structure |

### Token-Based Content Validation

The tool validates content against token limits:
- Uses rough estimation for small content
- Falls back to API token counting for large content
- Throws `MaxFileReadTokenExceededError` if limit exceeded

### Intelligent Deduplication

Tracks previously read files by path, offset, and limit. If a file hasn't changed since the last read, returns `file_unchanged` stub instead of re-sending content.

### macOS Screenshot Path Handling

Automatically handles the thin space (U+202F) vs regular space difference in macOS screenshot filenames before AM/PM.

### Cyber Risk Mitigation

For most models, appends a security reminder after file reads:
```
<system-reminder>
Whenever you read a file, you should consider whether it would be malware...
</system-reminder>
```

Exempt models: `claude-opus-4-6`

### Security Features

- **Permission Checking**: Validates read permissions before accessing files
- **Deny Rule Support**: Respects permission deny patterns
- **Binary File Blocking**: Prevents reading binary files (except images/PDFs)
- **Device File Blocking**: Prevents reading device files that could hang (`/dev/zero`, `/dev/random`, `/dev/stdin`, etc.)
- **UNC Path Warnings**: Defers UNC path handling until after permission grant

### Skill Discovery

Automatically discovers and activates skills based on the file path being read.

### File Read Listeners

Other services can register listeners to be notified when files are read:

```typescript
const unregister = registerFileReadListener((filePath, content) => {
  console.log(`File read: ${filePath}`)
})
// Call unregister() to remove the listener
```

## Error Handling

| Error Code | Condition |
|------------|-----------|
| 1 | File in denied directory |
| 4 | Binary file attempted |
| 7 | Invalid pages parameter |
| 8 | Pages exceed maximum per request |
| 9 | Blocked device file |

## Internal Architecture

### Blocked Device Paths

The following device paths are blocked:
- `/dev/zero`, `/dev/random`, `/dev/urandom`, `/dev/full`
- `/dev/stdin`, `/dev/tty`, `/dev/console`
- `/dev/stdout`, `/dev/stderr`
- `/dev/fd/0`, `/dev/fd/1`, `/dev/fd/2`
- `/proc/self/fd/0-2`, `/proc/<pid>/fd/0-2`

### Image Processing Pipeline

1. Read file once (capped to maxBytes to avoid OOM)
2. Detect image format from buffer
3. Try standard resize/downsample
4. If exceeds token budget, apply aggressive compression
5. Final fallback: 400x400 JPEG at quality 20

### Session File Detection

Detects and marks session-related files for analytics:
- `session_memory`: `~/.claude/session-memory/*.md`
- `session_transcript`: `~/.claude/projects/*/*.jsonl`
