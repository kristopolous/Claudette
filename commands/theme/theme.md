# Theme Command (`theme`)

## Purpose
Opens a theme picker to change the user interface theme (e.g., light, dark, system). Allows interactive selection and confirms on change.

## Imports
### Stdlib
- `react`

### Internal
- `CommandResultDisplay` type from `../../commands.js`
- `Pane` from `../../components/design-system/Pane.js`
- `ThemePicker` component from `../../components/ThemePicker.js`
- `useTheme` from `../../ink.js`
- `LocalJSXCommandCall` type from `../../types/command.js`

## Logic
The `call` async function renders the `ThemePickerCommand` component with `onDone`.

`ThemePickerCommand` component:
- Uses `useTheme()` to get the current theme setter.
- `setting` callback: calls `setTheme(setting)` and `onDone(\`Theme set to ${setting}\`)`.
- `handleCancel`: calls `onDone("Theme picker dismissed", { display: 'system' })`.
- Renders a `<Pane color="permission">` containing `<ThemePicker>` with `onThemeSelect={setting}`, `onCancel={handleCancel}`, and `skipExitHandling={true}`.

## Exports
- `call` (async function) - Renders the theme picker dialog