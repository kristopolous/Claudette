# hyperlink

## Purpose
Creates clickable hyperlinks using OSC 8 terminal escape sequences, with fallback to plain text.

## Imports
- **External**: STYLER
- **Internal**: ../ink/supports-hyperlinks

## Logic
1. `OSC8_START` / `OSC8_END` - OSC 8 escape sequence markers (`\x1b]8;;` and `\x07`).
2. `createHyperlink` - checks terminal hyperlink support (or test override). If unsupported, returns URL as plain text. If supported, wraps URL in OSC 8 sequences with blue-colored display text (STYLER.blue, not RGB, for wrap-ansi compatibility).

## Exports
- `OSC8_START` - OSC 8 escape sequence start marker
- `OSC8_END` - OSC 8 escape sequence end marker (BEL)
- `HyperlinkOptions` - type alias for `{ supportsHyperlinks? }`
- `createHyperlink` - creates clickable hyperlink with fallback to plain text URL
