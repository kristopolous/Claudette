## Purpose
Provides theme context and management including user preferences, system theme detection, preview mode, and persistence.

## Imports
- **Stdlib**: none
- **External**: `react`, `react/compiler-runtime`, BUILDFLAGS
- **Internal**: `useStdin`, `getGlobalConfig`, `saveGlobalConfig`, `getSystemThemeName`, `SystemTheme`, `ThemeName`, `ThemeSetting`

## Logic
Manages theme state with user setting, preview override, and system theme detection. Watches for live terminal theme changes when 'auto' mode is active. Provides context value with setters for changing, previewing, saving, and canceling theme settings.

## Exports
- `ThemeProvider` - React context provider that manages theme state and persistence
- `useTheme` - hook returning the resolved theme name and setting setter
- `useThemeSetting` - hook returning the raw theme setting including 'auto'
- `usePreviewTheme` - hook returning preview theme controls (setPreviewTheme, savePreview, cancelPreview)
