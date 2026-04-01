# Vim Command (`vim`)

## Purpose
Toggles the editor mode between Vim (with INSERT/NORMAL modes) and Normal (standard readline) keyboard bindings. Saves the preference to global config.

## Imports
### Internal
- `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` type and `logEvent` from `../../services/analytics/index.js`
- `LocalCommandCall` type from `../../types/command.js`
- `getGlobalConfig`, `saveGlobalConfig` from `../../utils/config.js`

## Logic
The `call` async function (no arguments):
1. Reads `editorMode` from global config, defaulting to `'normal'`.
2. Handles backward compatibility: if `'emacs'`, treat as `'normal'`.
3. Toggles: if current is `'normal'`, new mode is `'vim'`; otherwise `'normal'`.
4. Saves `editorMode: newMode` to global config via `saveGlobalConfig`.
5. Logs analytics event `tengu_editor_mode_changed` with `{ mode: newMode, source: 'command' }`.
6. Returns a text message:
   - If `newMode === 'vim'`: `"Editor mode set to vim. Use Escape key to toggle between INSERT and NORMAL modes."`
   - Else: `"Editor mode set to normal. Using standard (readline) keyboard bindings."`

## Exports
- `call` (async function) - Toggles editor mode and reports result