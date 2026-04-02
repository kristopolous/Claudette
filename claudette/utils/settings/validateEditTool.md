# validateEditTool

## Purpose
Validates settings file edits to ensure the result conforms to SettingsSchema. Used by FileEditTool to prevent the model from producing invalid settings JSON.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: `src/Tool` (ValidationResult type), `../permissions/filesystem` (isClaudeSettingsPath), `./validation` (validateSettingsFileContent)

## Logic
Three-step validation:
1. **Path check**: Only validates files identified as Claude settings files via `isClaudeSettingsPath()`
2. **Before validation**: Checks if the original content is valid. If it's already invalid, the edit is allowed through (don't block edits to already-broken files)
3. **After validation**: If the original was valid, validates the post-edit content. If invalid, returns a `ValidationResult` with error code 10, the validation error, the full schema, and a warning not to update env vars unless instructed

## Exports
- `validateInputForSettingsFileEdit(filePath, originalContent, getUpdatedContent)` — validates a settings file edit; returns `ValidationResult` with `result: false` if the edit would produce invalid settings, or `null` if valid or not a settings file
