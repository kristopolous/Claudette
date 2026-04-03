## Purpose
Provides the main text input component with voice recording waveform cursor, clipboard image hints, and accessibility support.

## Imports
- **Stdlib**: BUILDFLAGS (feature)
- **External**: STYLER, REACT (React, useMemo, useRef)
- **Internal**: ../context/voice (useVoiceState), ./hooks/useClipboardImageHint (useClipboardImageHint), ./hooks/useSettings (useSettings), ./hooks/useTextInput (useTextInput), ./ink (Box, color, useAnimationFrame, useTerminalFocus, useTheme), ./types/textInputTypes (BaseTextInputProps), ./utils/envUtils (isEnvTruthy), ../utils/textHighlighting (TextHighlight), ./BaseTextInput (BaseTextInput), ./Spinner/utils (hueToRgb)

## Logic
Combines theme, terminal focus, voice state, and settings to configure text input behavior. During voice recording, renders an animated single-bar waveform cursor using exponential moving average smoothing and hue-based coloring. Shows clipboard image paste hints when the terminal regains focus. Delegates core input handling to BaseTextInput with computed cursor inversion, text highlighting, and ghost text support.

## Exports
- `Props` - type extending BaseTextInputProps with optional text highlights
- `TextInput` - default export; main text input component with voice waveform cursor and accessibility features
