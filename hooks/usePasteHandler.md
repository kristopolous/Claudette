# usePasteHandler

## Purpose
Handles paste events including image detection, clipboard reading, and multi-chunk paste assembly.

## Imports
- **Stdlib**: `basename` from 'path'
- **External**: `useDebounceCallback` from 'usehooks-ts'
- **Internal**: `logError`, `InputEvent`, `Key`, `getImageFromClipboard`, `isImageFilePath`, `tryReadImageFromPath`, `getPlatform`, `ImageDimensions`

## Logic
1. Detects paste via bracketed paste mode (keypress.isPasted flag)
2. Handles large pastes exceeding PASTE_THRESHOLD
3. Processes image file paths from pasted content
4. Debounces clipboard checks for images
5. Resets paste state after timeout
6. Handles macOS temp screenshot files specially
7. Manages paste chunks and orphaned focus sequences

## Exports
- `usePasteHandler` - Hook returning wrappedOnInput, pasteState, isPasting
