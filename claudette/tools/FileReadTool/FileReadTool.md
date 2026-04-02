# FileReadTool/FileReadTool.ts

## Purpose
Tool for reading files with support for text, images, PDFs, and Jupyter notebooks, including token validation, caching, and security checks.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: `@anthropic-ai/sdk`, `zod/v4`
- **Internal**: constants (apiLimits, files), memdir, analytics services, diagnostic tracking, LSP manager, MCP vscodeSdkMcp, team memory sync, skills loader, Tool, utils (cwd, envUtils, errors, file, fileOperationAnalytics, format, fsOperations, imageResizer, log, memoryFileDetection, messages, model, notebook, path, pdf, pdfUtils, permissions, readFileInRange, slowOperations), BashTool toolName, limits, prompt constants, UI components

## Logic
1. Defines blocked device paths to prevent hangs (/dev/zero, /dev/random, etc.)
2. Validates inputs: file existence, permissions, binary files, size limits, UNC paths
3. Handles multiple file types:
   - Text: line-by-line reading with offset/limit, line numbers, encoding/line ending preservation
   - Images: reads buffer, detects format, resizes/downamples to fit token budget, compresses aggressively if needed
   - PDFs: reads entire PDF or extracts page range to images, token limits per page
   - Notebooks: reads JSON and maps cells to tool result
4. Token validation: rough estimation for small content, API count for large, throws MaxFileReadTokenExceededError if exceeded
5. Deduplication: tracks read files by path, offset, limit; returns file_unchanged stub if unchanged
6. Skill discovery: activates skills based on file path
7. File read listeners: allows other services to register callbacks on file reads
8. Security: permission checking, deny rules, binary blocking (except images/PDFs), device file blocking
9. Logs analytics events, includes cyber risk mitigation reminder for certain models
10. Supports PDF page extraction to separate images with count limits

## Exports

- `FileReadTool: Tool<InputSchema, Output>`
- `Input: z.infer<InputSchema>`
- `Output: z.infer<OutputSchema>`
- `registerFileReadListener(listener: (filePath: string, content: string) => void): () => void`
- `MaxFileReadTokenExceededError` class
- `CYBER_RISK_MITIGATION_REMINDER: string`
- `readImageWithTokenBudget(filePath: string, maxTokens?: number, maxBytes?: number): Promise<ImageResult>`
