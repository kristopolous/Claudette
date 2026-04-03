# ConfigTool/supportedSettings

## Purpose

Defines all supported configuration settings with their types, descriptions, options, and validation rules.

## Imports

- **Stdlib**: none
- **External**: BUILDFLAGS
- **Internal**: `utils/config`, `utils/configConstants`, `utils/model/modelOptions`, `utils/model/validateModel`, `utils/theme`

## Logic

1. Defines SettingConfig type with source, type, description, options, validation, and formatting properties
2. Maps each supported setting to its configuration including theme, editor mode, verbosity, notification channel, model override, thinking mode, permissions, language, and teammate mode
3. Conditionally includes feature-flagged settings for voice, bridge mode, notifications, and classifier permissions
4. Provides helper functions to check support, retrieve config, list keys, get options, and resolve config paths

## Exports

- `SUPPORTED_SETTINGS: Record<string, SettingConfig>`
- `isSupported(key: string): boolean`
- `getConfig(key: string): SettingConfig | undefined`
- `getAllKeys(): string[]`
- `getOptionsForSetting(key: string): string[] | undefined`
- `getPath(key: string): string[]`
