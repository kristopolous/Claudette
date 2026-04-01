# Stickers Command (`stickers`)

## Purpose
Opens the browser to the sticker ordering page for Claude Code. Reports whether the browser was successfully launched or provides a fallback URL.

## Imports
### Internal
- `LocalCommandResult` type from `../../types/command.js`
- `openBrowser` from `../../utils/browser.js`

## Logic
The `call` async function:
1. Defines the URL: `'https://www.stickermule.com/claudecode'`.
2. Calls `openBrowser(url)` to attempt to open the default browser.
3. If successful, returns `{ type: 'text', value: 'Opening sticker page in browser…' }`.
4. If failed, returns a text with the URL: `{ type: 'text', value: 'Failed to open browser. Visit: https://www.stickermule.com/claudecode' }`.

## Exports
- `call` (async function) - Opens sticker page