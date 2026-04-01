## Purpose
Resolves incoming key events to actions by matching against parsed bindings with support for multi-keystroke chord sequences.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `ink` (Key type), `match` (getKeyName, matchesBinding), `parser` (chordToString), `types` (KeybindingContextName, ParsedBinding, ParsedKeystroke)

## Logic
Iterates through bindings filtered by active contexts, matching input against single keystrokes or full chord sequences. For chords, tracks pending keystroke state and determines whether the input starts a new chord, completes one, or cancels it. Last matching binding wins to allow user overrides. Provides a helper to retrieve the display text for a given action.

## Exports
- `ResolveResult` - type for single-key resolution results ('match' | 'none' | 'unbound')
- `ChordResolveResult` - type for chord-aware resolution results ('match' | 'none' | 'unbound' | 'chord_started' | 'chord_cancelled')
- `resolveKey` - resolves a key input to an action for single-keystroke bindings only
- `getBindingDisplayText` - retrieves the display text for an action from bindings
- `keystrokesEqual` - compares two ParsedKeystrokes for equality, collapsing alt/meta
- `resolveKeyWithChordState` - resolves a key input with full multi-keystroke chord support
