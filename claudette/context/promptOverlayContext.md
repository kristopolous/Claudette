# promptOverlayContext

## Purpose
Provides UI context for floating overlay content that escapes FullscreenLayout's bottom-slot clip.

## Imports
- **Stdlib**: (none)
- **External**: REACT_COMPILER, REACT
- **Internal**: SuggestionItem type

## Logic
1. Solves clip issue (CC-668) - tall pastes squash ScrollBox without overflow:hidden
2. Floating overlays use `position:absolute bottom="100%"` but Ink's clip intersects ALL descendants
3. Two channels: suggestion data (structured) and dialog node (arbitrary)
4. Split into data/setter context pairs so writers never re-render on own writes
5. `usePromptOverlay` - returns suggestion data (suggestions, selectedSuggestion, maxColumnWidth)
6. `usePromptOverlayDialog` - returns dialog ReactNode
7. `useSetPromptOverlay` - registers suggestion data, clears on unmount
8. FullscreenLayout reads both and renders outside clipped slot

## Exports
- `PromptOverlayData` - type for suggestion overlay data
- `PromptOverlayProvider` - provider component
- `usePromptOverlay` - hook to get suggestion data
- `usePromptOverlayDialog` - hook to get dialog node
- `useSetPromptOverlay` - hook to set suggestion data
