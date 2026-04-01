## Purpose
Declares where the terminal cursor should be parked after each frame for IME and accessibility support.

## Imports
- **Stdlib**: none
- **External**: `react` (useCallback, useContext, useLayoutEffect, useRef)
- **Internal**: `components/CursorDeclarationContext`, `dom`

## Logic
Returns a callback ref to attach to the input container Box. Uses useLayoutEffect without a dependency array to re-declare cursor position every commit, ensuring the active instance re-claims the declaration after sibling handoffs or unmounts. Includes a separate cleanup effect with empty deps to clear on unmount. Uses node-identity checks to prevent clobbering when multiple instances exist or focus moves between siblings.

## Exports
- `useDeclaredCursor` - returns a ref callback to attach to the input element, parks the cursor at the given line and column relative to that element
