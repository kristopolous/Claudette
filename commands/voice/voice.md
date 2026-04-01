## Purpose
Toggles voice mode on/off with pre-flight checks for microphone, dependencies, and authentication.

## Imports
- **Internal**:
  - `../../hooks/useVoice.js` (normalizeLanguageForSTT)
  - `../../keybindings/shortcutFormat.js` (getShortcutDisplay)
  - `../../services/analytics/index.js` (logEvent)
  - `../../types/command.js` (LocalCommandCall)
  - `../../utils/auth.js` (isAnthropicAuthEnabled)
  - `../../utils/config.js` (getGlobalConfig, saveGlobalConfig)
  - `../../utils/settings/changeDetector.js` (settingsChangeDetector)
  - `../../utils/settings/settings.js` (getInitialSettings, updateSettingsForSource)
  - `../../voice/voiceModeEnabled.js` (isVoiceModeEnabled)
  - Dynamic: `../../services/voiceStreamSTT.js`, `../../services/voice.js`

## Logic
1. If global voice mode is disabled:
   - If not authenticated, prompt to login; otherwise say not available
2. Read current settings; determine if voice is currently enabled
3. If currently enabled: turn off, notify change, log analytics, return "disabled" message
4. If currently disabled (enabling):
   - Check voice stream availability (requires Claude.ai account)
   - Check microphone recording availability
   - Check voice dependencies (e.g., SoX); suggest install if missing
   - Request microphone permission (triggers OS prompt)
   - If any check fails, return error message with guidance
5. On success: enable voice setting, notify change, log analytics
6. Determine push-to-talk shortcut key; normalize language for STT
7. Update language hint counters and show hint if under limit
8. Return enabled message with shortcut and language note

## Exports
- `call` - Command function that toggles voice mode and returns result message
