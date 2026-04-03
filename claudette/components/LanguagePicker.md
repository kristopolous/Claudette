## Purpose
Provides a text input dialog for users to set their preferred response and voice language.

## Imports
- **Stdlib**: None
- **External**: REACT, `figures`
- **Internal**: `ink`, `useKeybinding`, `TextInput`

## Logic
1. Initializes language and cursor offset state from the provided initial value
2. Binds the cancel keybinding with Settings context to prevent accidental triggers
3. Renders a prompt, text input with placeholder examples, and a hint about the default language
4. On submit, trims the input and passes it to the completion callback, defaulting to undefined if empty

## Exports
- `LanguagePicker` - renders a language preference input with cancel/confirm keybindings and placeholder suggestions
