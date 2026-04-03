# useVoice

## Purpose
UI hook for hold-to-talk and focus-mode voice input using Anthropic voice_stream STT (Speech-to-Text).

## Imports
- **Stdlib**: `useCallback`, `useEffect`, `useRef`, `useState` from 'REACT'
- **External**: None
- **Internal**: `useSetVoiceState`, `useTerminalFocus`, `logEvent`, `getVoiceKeyterms`, `connectVoiceStream`, `isVoiceStreamAvailable`, `logForDebugging`, `toError`, `getSystemLocaleLanguage`, `logError`, `getInitialSettings`, `sleep`

## Logic
1. **Hold-to-talk mode**: Hold configurable key (default space) to record, release to stop
2. **Focus mode**: Start recording on terminal focus, stop on blur
3. Uses OS key auto-repeat to detect key release (200ms gap = release)
4. Lazy-loads native audio module to avoid TCC permission prompt until voice enabled
5. Buffers audio while WebSocket connects, then flushes
6. Supports STT language normalization with fallback
7. Implements silent-drop replay for stuck backend pods
8. Arms focus silence timer (5s) to free WebSocket on prolonged silence

## Exports
- `useVoice` - Hook returning state and handleKeyEvent
- `normalizeLanguageForSTT` - Normalize language string to BCP-47 code
- `computeLevel` - Compute RMS amplitude from PCM buffer
- `FIRST_PRESS_FALLBACK_MS` - Fallback timeout for modifier combo first-press
