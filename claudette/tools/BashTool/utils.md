# BashTool/utils.ts

## Purpose

Provides utility functions for BashTool output handling, image processing, output formatting, and working directory management. Used by BashTool and potentially other tools that interact with shell execution.

## Imports

- **Stdlib**:
  - `fs/promises` (`readFile`, `stat`)
  - `Buffer` (via others)
- **External**: Types from `@anthropic-ai/sdk` (`Base64ImageSource`, `ContentBlockParam`, `ToolResultBlockParam`)
- **Internal**:
  - Bootstrap: `getOriginalCwd`
  - Analytics: `logEvent`
  - Tool: `ToolPermissionContext`
  - CWD: `getCwd`, `setCwd`
  - Permissions: `pathInAllowedWorkingPath`
  - Env: `shouldMaintainProjectWorkingDir`
  - Image: `maybeResizeAndDownsampleImageBuffer`
  - Shell output: `getMaxOutputLength`
  - Strings: `countCharInString`, `plural`

## Logic

**Functions**:
- `stripEmptyLines(content)`: Removes leading/trailing lines that are only whitespace; preserves internal whitespace. Splits by `\n`, finds first/last non-empty, returns slice.
- `isImageOutput(content)`: Tests if content matches `^data:image/[a-z0-9.+_-]+;base64,` (case-insensitive)
- `parseDataUri(s)`: Matches `^data:([^;]+);base64,(.+)$`; returns `{mediaType, data}` or null
- `buildImageToolResult(stdout, toolUseID)`: Parses data URI; returns `ToolResultBlockParam` with image/base64 content, or null
- `resizeShellImageOutput(stdout, outputFilePath?, outputFileSize?)`: 
  - If file provided and >20MB, returns null
  - Reads full file if truncated in stdout; parses data URI; converts base64 to buffer
  - Calls `maybeResizeAndDownsampleImageBuffer` with buffer and extension
  - Returns new data URI string
- `formatOutput(content)`:
  - If image data URI: `{totalLines: 1, truncatedContent: content, isImage: true}`
  - Else truncates to `getMaxOutputLength()`; adds truncation notice with remaining line count; returns `{totalLines, truncatedContent}`
- `stdErrAppendShellResetMessage(stderr)`: Appends "Shell cwd was reset to <original>" (trimmed)
- `resetCwdIfOutsideProject(toolPermissionContext)`: 
  - Gets current and original cwd; checks `shouldMaintainProjectWorkingDir()`
  - If maintaining OR (cwd changed AND not in allowed working path): resets cwd to original; logs `tengu_bash_tool_reset_to_original_dir` if not maintaining; returns true
  - Else false
- `createContentSummary(content: ContentBlockParam[])`: 
  - Counts images and text blocks; collects first 200 chars of each text block
  - Returns summary like `"MCP Result: [2 images], [3 text blocks]\n\npreview..."`

**Constants**:
- `MAX_IMAGE_FILE_SIZE = 20 * 1024 * 1024` (20 MB)

## Exports

- `stripEmptyLines(content: string): string`
- `isImageOutput(content: string): boolean`
- `parseDataUri(s: string): {mediaType: string; data: string} | null`
- `buildImageToolResult(stdout: string, toolUseID: string): ToolResultBlockParam | null`
- `resizeShellImageOutput(stdout: string, outputFilePath?: string, outputFileSize?: number): Promise<string | null>`
- `formatOutput(content: string): {totalLines: number; truncatedContent: string; isImage?: boolean}`
- `stdErrAppendShellResetMessage(stderr: string): string`
- `resetCwdIfOutsideProject(toolPermissionContext: ToolPermissionContext): boolean`
- `createContentSummary(content: ContentBlockParam[]): string`
