# Theme Command (`theme`)

## Purpose
Opens a theme picker to change the user interface theme (e.g., light, dark, system). Allows interactive selection and confirms on change.

## Imports
### Stdlib
- REACT

### Internal
- `CommandResultDisplay` type from `.././commands`
- `Pane` from `../../components/designsystem/Pane`
- `ThemePicker` component from `.././components/ThemePicker`
- `useTheme` from `.././ink`
- `LocalJSXCommandCall` type from `.././types/command`

## Logic
The `call` async function renders the `ThemePickerCommand` component with `onDone`.

`ThemePickerCommand` component:
- Uses `useTheme()` to get the current theme setter.
- `setting` callback: calls `setTheme(setting)` and `onDone(\`Theme set to ${setting}\`)`.
- `handleCancel`: calls `onDone("Theme picker dismissed", { display: 'system' })`.
- Renders a `<Pane color="permission">` containing `<ThemePicker>` with `onThemeSelect={setting}`, `onCancel={handleCancel}`, and `skipExitHandling={true}`.

## Exports
- `call` (async function) - Renders the theme picker dialog