# UI Rendering Layer

> **Technology Map**: See `START-HERE.md` for the authoritative dependency table. Jargon tokens (ALL-CAPS) reference capabilities defined there.

## Purpose

Describes the functional requirements for the UI rendering layer — the component that takes structured UI descriptions and paints them to the user's display (terminal, browser, native GUI, etc.). The reference implementation uses **INK** + **REACT** + **YOGA**, but any rendering toolkit is acceptable: web (HTML/CSS), native (tkinter, WPF, Cocoa), or terminal (curses, ratatui, blessed).

## What You Need

Your UI layer must provide these capabilities. How you implement them depends on your platform:

### 1. Frame-Buffer Rendering with Dirty Diffing

The UI should not redraw the entire screen every update. Instead:
- Maintain a **screen buffer** (2D grid of cells with character, style, and hyperlink data)
- Each render cycle, **diff the new frame against the previous frame**
- Write only the **changed cells** to the display
- This keeps rendering fast even with long conversation histories

**Why this matters**: Without dirty diffing, every token streamed causes a full-screen redraw, which flickers and is slow.

**Jargon**: **RECONCILER** (diff-and-patch rendering), **INK** (frame buffer + diff output)

**Platform equivalents**:
- Terminal: ANSI escape sequences to update specific cells
- Web: DOM diffing (virtual DOM, or manual patching)
- Native: Invalidate/repaint regions only

### 2. Flexbox Layout

UI components must support flexbox-style layout:
- `flexDirection` (row/column)
- `justifyContent` (start/center/end/space-between)
- `alignItems` (stretch/center/start/end)
- `flexGrow`, `flexShrink`, `flexBasis`
- `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`
- `padding`, `margin`, `border`
- `overflow` (visible/hidden/scroll)

**Why this matters**: The UI has nested components (App → Screen → Messages → Message) that need to resize responsively as the terminal/window resizes.

**Jargon**: **YOGA** (flexbox layout engine)

**Platform equivalents**:
- Terminal: Yoga layout engine (used by INK, ratatui has similar)
- Web: CSS flexbox (native)
- Native: StackPanel, BoxSizer, or equivalent layout containers

### 3. Virtual Scrolling

Long message lists must use virtual scrolling:
- Only render the **visible portion** of the list plus a small overscan buffer
- As the user scrolls, mount/unmount items dynamically
- The total list can be thousands of messages without performance degradation

**Why this matters**: A long conversation can have hundreds of messages. Rendering all of them at once causes memory and performance issues.

**Platform equivalents**:
- Terminal: Calculate which rows are visible, render only those message components
- Web: Virtualized list components, or manual scroll calculation
- Native: Virtualized list views (UITableView, ListView, etc.)

### 4. Streaming Text Output

The UI must support **incremental text streaming**:
- New text tokens arrive one at a time (or in small chunks)
- Each token is appended to the current message display **without redrawing the entire screen**
- Cursor positioning must be correct (text wraps at the right column)
- Text styles (bold, italic, color) must be preserved across stream boundaries

**Why this matters**: The LLM streams tokens in real-time. The UI must display them as they arrive with minimal latency.

**Jargon**: **ANSI** (text styling), **ANSI_TOKENS** (parse styled text into cells)

### 5. Input Handling

The UI must capture and process user input:
- **Keyboard events**: individual key presses, modifier keys (Ctrl, Alt, Shift), special keys (Enter, Escape, arrows, backspace, tab)
- **Text input**: character-by-character input with cursor positioning, history navigation (up/down arrows), autocomplete/typeahead
- **Mouse events** (if supported): click, scroll, text selection
- **Resize events**: terminal/window resize triggers layout recalculation

**Why this matters**: The REPL needs responsive text input with history, autocomplete, and keyboard shortcuts.

**Jargon**: See `input-handling.md` for the full behavioral spec.

**Platform equivalents**:
- Terminal: Raw stdin mode, reading escape sequences
- Web: DOM keyboard/mouse events
- Native: Event loop with key handlers

### 6. Dialog/Modal Support

The UI must support overlay dialogs:
- Permission prompts (approve/deny tool execution)
- Confirmation dialogs (exit, clear conversation)
- Settings panels
- Help screens

Dialogs must:
- Block interaction with the underlying UI
- Support keyboard navigation (tab between options, Enter to confirm, Escape to cancel)
- Render on top of the main content with visual distinction (border, background)

**Jargon**: **BOX_CHARS** (border rendering), **FIGURES** (UI symbols)

### 7. ANSI/Text Style Support

The UI must render text with styles:
- **Colors**: foreground and background (standard 16 colors, 256-color palette, or true color)
- **Text attributes**: bold, italic, underline, dim, strikethrough, inverse
- **Hyperlinks**: clickable links with OSC 8 escape sequences (terminal) or `<a>` tags (web)

**Why this matters**: Tool output, code blocks, and UI elements use color and styling for readability.

**Jargon**: **ANSI** (text coloring), **HYPERLINKS** (OSC 8 clickable links), **ANSI_STRIP** (remove codes for plain text)

### 8. Cursor Management

The UI must manage the text cursor:
- Position the cursor at the correct location for text input
- Show/hide the cursor as appropriate (hide during streaming, show during input)
- Support cursor movement (left/right arrows, home/end)

### 9. Scrollback Buffer

The UI must maintain a scrollback buffer:
- Preserve output that has scrolled off-screen
- Allow the user to scroll up to review previous output
- Support search within scrollback

### 10. Graceful Mode Transitions

The UI must handle mode transitions cleanly:
- Enter/exit alternate screen mode (terminal)
- Enable/disable raw input mode
- Restore terminal/display state on exit (no escape sequence leakage)
- Handle SIGCONT/SIGINT gracefully

**Jargon**: **SIGNALS** (process exit handling)

## Architecture

The rendering layer follows this pattern regardless of platform:

```
┌─────────────────────────────────────────┐
│              UI Components               │
│  (App, Messages, PromptInput, Dialogs)   │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│            Layout Engine                 │
│     (flexbox, sizing, positioning)       │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│           Frame Buffer                   │
│  (2D grid of styled cells + diffing)     │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│           Output Driver                  │
│  (ANSI escapes, DOM updates, native paint)│
└─────────────────────────────────────────┘
```

## Reference Implementation

The reference implementation uses **INK** (terminal UI engine) with **RECONCILER** (diff-and-patch rendering) and **YOGA** (flexbox layout). See the `ink/` directory for implementation details. The docs there describe *how* the reference does it — use them as a reference for *what* needs to happen, not as a mandate to use React.

## Key Behavioral Requirements

1. **No full-screen redraws on every update** — use dirty diffing (**RECONCILER**)
2. **Responsive layout on resize** — flexbox or equivalent (**YOGA**)
3. **Virtual scrolling for long lists** — only render visible items
4. **Low-latency streaming** — append tokens without full redraw
5. **Rich input handling** — keyboard, history, autocomplete (see `input-handling.md`)
6. **Clean exit** — restore display state, no artifacts (**SIGNALS**)
7. **Accurate cell width** — handle emoji and CJK characters (**CELL_WIDTH**)
