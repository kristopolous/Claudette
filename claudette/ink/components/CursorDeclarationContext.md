# ink/components/CursorDeclarationContext

## Purpose
Provides CursorDeclarationContext for declaring cursor position.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: ink dom

## Logic
1. `CursorDeclaration` - { relativeX, relativeY, node }
2. `relativeX` - display column (terminal cell width) within declared node
3. `relativeY` - line number within declared node
4. `node` - ink-box DOMElement whose yoga layout provides absolute origin
5. `CursorDeclarationSetter` - setter for declared cursor position
6. Takes declaration (CursorDeclaration | null) and optional clearIfNode
7. Optional second argument makes null a conditional clear
8. Declaration only cleared if currently-declared node matches clearIfNode
9. Makes hook safe for sibling components (e.g. list items) that transfer focus
10. Without node check, newly-unfocused item's clear could clobber newly-focused sibling's set
11. Depends on layout-effect order
12. `CursorDeclarationContext` - UI context for cursor declaration setter
13. Default value: () => {}
14. `createContext` - UI context creator
15. `DOMElement` - DOM element type

## Exports
- `CursorDeclaration` - cursor declaration type
- `CursorDeclarationSetter` - cursor declaration setter type
- `CursorDeclarationContext` - cursor declaration context (default export)
