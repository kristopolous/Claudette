# useVoiceIntegration

## Purpose
Handles hold-to-talk voice activation with configurable keybindings, flow-through typing, and interim transcript display.

## Imports
- **Stdlib**: None
- **External**: `feature` from 'BUILDFLAGS', `React`
- **Internal**: `useNotifications`, `useIsModalOverlayActive`, `useGetVoiceState`, `useSetVoiceState`, `useVoiceState`, `KeyboardEvent`, `useInput`, `useOptionalKeybindingContext`, `keystrokesEqual`, `ParsedKeystroke`, `normalizeFullWidthSpace`, `useVoiceEnabled`

## Logic
1. **Hold-to-talk activation**:
   - Modifier combos (ctrl+x, meta+k): activate on first press, no hold threshold
   - Bare chars (space, v): require 5 rapid presses to activate (HOLD_THRESHOLD)
   - First 2 presses (WARMUP_THRESHOLD) flow through to text input
2. **Flow-through handling**: Terminal auto-repeat batches chars, strips on activation
3. **Voice prefix/suffix anchoring**: Captures text before/after cursor for transcript insertion
4. **Interim transcript**: Live-updates input with in-progress transcription
5. **Focus mode**: Recording starts on terminal focus, not key hold
6. **Backward-compat bridge**: Uses useInput for REPL until migrated to onKeyDown

## Exports
- `useVoiceIntegration` - Hook returning stripTrailing, resetAnchor, handleKeyEvent, interimRange
- `useVoiceKeybindingHandler` - Component handling keydown events for voice activation
- `VoiceKeybindingHandler` - Legacy wrapper component (TODO: remove after REPL migration)
