# screenshotClipboard

## Purpose
Copies ANSI text screenshots to the system clipboard by converting ANSI to PNG then using platform-specific clipboard commands.

## Imports
- **Stdlib**: `fs/promises` (mkdir, unlink, writeFile), `os` (tmpdir), `path` (join)
- **External**: (none)
- **Internal**: `./ansiToPng` (ansiToPng, AnsiToPngOptions), `./execFileNoThrow` (execFileNoThrowWithCwd), `./log` (logError), `./platform` (getPlatform)

## Logic
1. `copyAnsiToClipboard(ansiText, options?)` - main entry point; creates temp directory (claude-code-screenshots), converts ANSI to PNG via ansiToPng(), writes PNG to temp file, calls copyPngToClipboard(), then cleans up temp file (ignores cleanup errors); returns { success, message }
2. `copyPngToClipboard(pngPath)` - platform-specific clipboard copy:
   - macOS: uses osascript with `set the clipboard to (read (POSIX file "...") as «class PNGf»)`
   - Linux: tries xclip first, then xsel as fallback; suggests `sudo apt install xclip` if neither works
   - Windows: uses PowerShell with System.Windows.Forms.Clipboard::SetImage
   - Other platforms: returns unsupported message
3. Pure-TS pipeline: ANSI text → bitmap-font render → PNG encode (no WASM, no system fonts)

## Exports
- `copyAnsiToClipboard(ansiText: string, options?: AnsiToPngOptions)` - copies ANSI screenshot to clipboard; returns { success: boolean, message: string }
