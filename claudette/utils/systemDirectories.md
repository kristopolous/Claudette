# systemDirectories

## Purpose
Returns cross-platform system directory paths (HOME, DESKTOP, DOCUMENTS, DOWNLOADS), handling differences between Windows, macOS, Linux, and WSL.

## Imports
- **Stdlib**: os, path
- **Internal**: ./debug.js, ./platform.js

## Logic
1. Accepts optional `SystemDirectoriesOptions` for testability: `env`, `homedir`, `platform` overrides
2. Windows: uses `USERPROFILE` env var (handles localized folder names)
3. Linux/WSL: checks XDG Base Directory spec env vars (`XDG_DESKTOP_DIR`, `XDG_DOCUMENTS_DIR`, `XDG_DOWNLOAD_DIR`) before falling back to `~/Desktop`, `~/Documents`, `~/Downloads`
4. macOS and unknown platforms: use standard `~/Desktop`, `~/Documents`, `~/Downloads` paths; logs a warning for unknown platforms

## Exports
- `SystemDirectories` - type with HOME, DESKTOP, DOCUMENTS, DOWNLOADS fields plus index signature for `Record<string, string>` compatibility
- `getSystemDirectories(options?)` - returns platform-appropriate directory paths; options allow overriding env, homedir, and platform for testing

## Source
`systemDirectories`
