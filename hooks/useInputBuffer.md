# useInputBuffer

## Purpose
Manages an input buffer with undo support, debouncing, and size limits for text input history.

## Imports
- **Stdlib**: `useCallback`, `useRef`, `useState` from 'react'
- **External**: None
- **Internal**: `PastedContent`

## Logic
1. Maintains a buffer array with maxBufferSize entries
2. Debounces rapid changes within debounceMs window
3. Supports undo functionality tracking cursor position and pasted contents
4. Truncates buffer when currentIndex is not at the end
5. Prevents duplicate consecutive entries

## Exports
- `useInputBuffer` - Hook returning buffer management functions
- `BufferEntry` - Type for buffer entry with text, cursorOffset, pastedContents, timestamp
- `UseInputBufferProps` - Props type with maxBufferSize and debounceMs
- `UseInputBufferResult` - Result type with pushToBuffer, undo, canUndo, clearBuffer
