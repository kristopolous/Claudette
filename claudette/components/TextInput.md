## Purpose
Provides the main text input component with voice recording waveform cursor, clipboard image hints, and accessibility support.

## Imports
- **Stdlib**: bun:bundle (feature)
- **External**: chalk, react (React, useMemo, useRef, ReactNode)
- **Internal**: ../context/voice.js (useVoiceState), ../hooks/useClipboardImageHint.js (useClipboardImageHint), ../hooks/useSettings.js (useSettings), ../hooks/useTextInput.js (useTextInput), ../ink.js (Box, color, useAnimationFrame, useTerminalFocus, useTheme), ../types/textInputTypes.js (BaseTextInputProps), ../utils/envUtils.js (isEnvTruthy), ../utils/textHighlighting.js (TextHighlight), ./BaseTextInput.js (BaseTextInput), ./Spinner/utils.js (hueToRgb)

## Logic
Combines theme, terminal focus, voice state, and settings to configure text input behavior. During voice recording, renders an animated single-bar waveform cursor using exponential moving average smoothing and hue-based coloring. Shows clipboard image paste hints when the terminal regains focus. Delegates core input handling to BaseTextInput with computed cursor inversion, text highlighting, and ghost text support.

## Exports
- `Props` - type extending BaseTextInputProps with optional text highlights
- `TextInput` - default export; main text input component with voice waveform cursor and accessibility features
