## Purpose
Provides an interactive Button component that handles keyboard, mouse, and focus events with visual state feedback.

## Imports
- **Stdlib**: None specified
- **External**: React, useCallback, useEffect, useRef, useState from 'REACT'; Except from 'type-fest'; React compiler runtime
- **Internal**: 
  - DOMElement from ./dom
  - ClickEvent, FocusEvent, KeyboardEvent from respective event modules
  - Styles from ./styles
  - Box component from /Box

## Logic
1. **ButtonState Type**: Tracks interactive state with three boolean properties:
   - focused: Whether the button has keyboard focus
   - hovered: Whether the mouse is over the button
   - active: Whether the button is currently pressed/activated

2. **Props Type**: Extends Styles (excluding textWrap) and adds:
   - ref?: Ref<DOMElement> - Optional DOM reference
   - onAction: () => void - Called when activated via Enter, Space, or click
   - tabIndex?: number - Tab order (0 = default, -1 = programmatic only)
   - autoFocus?: boolean - Focus button on mount
   - children: Either a render function receiving ButtonState or a ReactNode

3. **State Management**:
   - Uses useState for isFocused, isHovered, isActive
   - Uses useRef for activeTimer (to clear timeouts on unmount)
   - Uses useEffect for cleanup of active timer

4. **Event Handlers**:
   - handleKeyDown: Prevents default and activates on Enter/Space, sets active state with timeout to reset
   - handleClick: Directly calls onAction for mouse clicks
   - handleFocus/handleBlur: Sets focused state
   - handleMouseEnter/handleMouseLeave: Sets hovered state

5. **Rendering**:
   - Renders a Box component with all props spread
   - Passes appropriate event handlers and ref
   - If children is a function, calls it with current ButtonState for state-dependent styling
   - Otherwise renders children as-is (no state-dependent styling)

6. **Compiler Optimization**: Uses REACT_COMPILER runtime (_c) for memoization and optimized rendering

## Exports
- `Button` - Default exported UI component for interactive buttons
- `ButtonState` - Type representing the button's interactive state