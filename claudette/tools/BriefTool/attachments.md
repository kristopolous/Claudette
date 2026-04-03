# BriefTool/attachments

## Purpose

Provides attachment handling utilities for BriefTool: validation of attachment paths and resolution of attachment metadata (path, size, image flag, optional file_uuid). Uploads attachments to the private API in BRIDGE_MODE to enable web preview.

## Imports

- **Stdlib**:
  - `fs/promises/stat`
  - `BUILDFLAGS/feature` (compile-time feature flag)
- **External**: None
- **Internal**:
  - Types: `ValidationResult` (from Tool)
  - CWD: `getCwd`
  - Env: `isEnvTruthy`
  - Errors: `getErrnoCode`
  - Images: `IMAGE_EXTENSION_REGEX`
  - Paths: `expandPath`

## Logic

**Types**:
- `ResolvedAttachment`: `{ path: string; size: number; isImage: boolean; file_uuid?: string }`

**Functions**:
- `validateAttachmentPaths(rawPaths): Promise<ValidationResult>`:
  - Expands each path with `expandPath`
  - Uses `stat` to check file exists and is a regular file
  - Returns `{result: false, message, errorCode: 1}` for:
    - Not a regular file (`!stats.isFile()`)
    - `ENOENT` (file does not exist) — includes current working directory in message
    - `EACCES`/`EPERM` (permission denied)
  - Throws other errors (e.g., TOCTOU race where file disappears after existence check)
  - Returns `{result: true}` if all paths valid
- `resolveAttachments(rawPaths, uploadCtx): Promise<ResolvedAttachment[]>`:
  - First phase (serial, fast): `stat` each file to get size and determine `isImage` via `IMAGE_EXTENSION_REGEX`
  - Builds `stated` array with `{path, size, isImage}`
  - Second phase (conditional, slow network):
    - Only if `feature('BRIDGE_MODE')` is true
    - Determines `shouldUpload` = `uploadCtx.replBridgeEnabled` OR `CLAUDE_CODE_BRIEF_UPLOAD` env truthy
    - Dynamically imports `/upload` (to keep upload module tree-shaken from non-bridge builds)
    - Parallel upload via `Promise.all(uploadBriefAttachment(...))`
    - Merges results: if `file_uuid` returned, adds it; otherwise keeps original stated object
  - Returns array of resolved attachments (with `file_uuid` if upload succeeded)

## Exports

- `ResolvedAttachment` type
- `validateAttachmentPaths(rawPaths: string[]): Promise<ValidationResult>`
- `resolveAttachments(rawPaths: string[], uploadCtx: {replBridgeEnabled: boolean; signal?: AbortSignal}): Promise<ResolvedAttachment[]>`
