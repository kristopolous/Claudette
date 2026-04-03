# ConfigTool/prompt

## Purpose

Generates prompt documentation for the configuration tool that allows getting and setting Claudette configuration settings.

## Imports

- **Stdlib**: None
- **External**: BUILDFLAGS
- **Internal**: `utils/model/modelOptions`, `voice/voiceModeEnabled`, `ConfigTool/supportedSettings`

## Logic

Iterates through all supported settings from the registry, categorizing them as global or project settings. Skips model settings (handled separately) and voice settings when disabled via feature flag. Builds a formatted prompt string listing each setting with its allowed values, type, and description. Generates a dynamic model section using model options utility with fallback on error.

## Exports

- `DESCRIPTION: string`
- `generatePrompt(): string`
