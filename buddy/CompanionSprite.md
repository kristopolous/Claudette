# CompanionSprite

## Purpose
Renders the companion (buddy) sprite in the terminal UI with idle animation, speech bubbles, and pet reactions.

## Imports
- **Stdlib**: (none)
- **External**: `react/compiler-runtime`, `bun:bundle`, `figures`, `react`
- **Internal**: terminalSize, stringWidth, ink components, AppState, config, fullscreen, theme, companion, sprites, types

## Logic
1. 500ms tick drives idle animation sequence (mostly rest, occasional fidget, rare blink)
2. Speech bubble shows companion comments with fading effect after ~10s
3. Pet hearts float up-and-out over 2.5s after /buddy pet command
4. Text wrapping at 30 chars with rounded border box
5. Tail positioning (right side with ╲ connector)
6. Rarity-colored border with dimColor fade effect
7. Respects fullscreen mode and terminal size changes

## Exports
- `SpeechBubble` - React component rendering speech bubble with tail and fade
- (Component continues with sprite rendering logic)
