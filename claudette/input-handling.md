# Input Handling Layer

> **Technology Map**: See `START-HERE.md` for the authoritative dependency table — every library mapped to its abstract capability with porting guidance for any language.

## Purpose

Describes the functional requirements for the input handling layer — the component that captures, processes, and responds to user input (keyboard events, text entry, command history, autocomplete, cancel/interrupt signals, terminal resize). The reference implementation uses REACT hooks with INK's key event system, but any input handling approach is acceptable: readline (Python, C), ncurses raw mode (C, OCaml), Windows Console API (C#), Emacs command loop, Smalltalk event loop, etc.

**Jargon**: REACT, INK, ANSI, ANSI_STRIP, FUZZY, GLOB, UTILS, SIGNALS, FEATUREFLAGS

## What You Need

Your input layer must provide these capabilities. How you implement them depends on your platform:

### 1. Text Input with Cursor Management

A text input buffer with full cursor control:

- **Character-by-character input** — each keystroke updates the buffer at the cursor position
- **Cursor positioning** — track cursor column within the input buffer
- **Left/Right movement** — arrow keys move cursor one character; do not move past buffer boundaries
- **Home/End** — jump cursor to start/end of buffer
- **Word movement** — Meta+Left/Right (or Alt+Left/Right) moves cursor by word boundaries
- **Backspace** — deletes character before cursor; does nothing at position 0
- **Delete** — deletes character at cursor; does nothing at end of buffer
- **Ctrl+A** — move cursor to start (home)
- **Ctrl+E** — move cursor to end (end)
- **Ctrl+B / Ctrl+F** — move cursor left/right (readline convention)
- **Ctrl+K** — kill (cut) from cursor to end of line
- **Ctrl+U** — kill from start of line to cursor
- **Ctrl+W** — kill word before cursor
- **Ctrl+Y** — yank (paste) from kill ring
- **Escape double-press** — clear the entire input buffer
- **Multiline input** — backslash+Enter inserts a literal newline instead of submitting
- **ANSI filtering** — strip ANSI escape sequences from pasted input

**Why this matters**: Users expect readline-style text editing. Without cursor management, long inputs are unusable.

**Jargon**: ANSI_STRIP, INK

**Platform equivalents**:
- Terminal: Raw stdin mode, reading escape sequences for special keys
- Web: `<input>` or `<textarea>` with keydown event handling
- Python: `readline` module or `prompt_toolkit`
- OCaml: `readline` bindings or custom with `Unix.tcgetattr`
- C#: `Console.ReadKey` in raw mode, or `Terminal.Gui`
- Emacs Lisp: `read-from-minibuffer` with completion

### 2. Command History Navigation

Previous commands must be accessible via keyboard:

- **Up arrow** — cycle backward through command history (most recent first)
- **Down arrow** — cycle forward through command history
- **History persistence** — history survives across sessions (stored in file)
- **History filtering** — history navigation respects current input prefix (optional enhancement)
- **Boundary handling** — up at oldest history entry does nothing; down at newest entry clears to empty buffer

**Why this matters**: Users frequently re-run or modify previous commands. Without history, every command must be retyped.

**Jargon**: XDG, UTILS

### 3. Autocomplete / Typeahead System

Context-aware suggestions as the user types:

**Suggestion types**:
- **Commands** — slash commands (`/help`, `/clear`, `/model`, etc.) triggered by `/` prefix
- **File paths** — file and directory completions triggered by `@` prefix or path-like tokens (`./`, `../`, `/`)
- **Shell completions** — command and argument completions within bash code blocks
- **Agent mentions** — `@agentname` completions for available agents
- **Slack channels** — `#channel` completions when Slack MCP is connected
- **Session resumes** — `/resume` with custom title search
- **Shell history** — bash history completions for command tokens

**Behavior**:
- **Debounced async fetching** — file/resource suggestions are fetched asynchronously with debounce to avoid blocking
- **Inline ghost text** — show suggested completion as faded text inline with user input
- **Keyboard navigation** — Tab/Enter accepts suggestion, arrows navigate suggestion list, Ctrl+N/P for vim-style navigation
- **Common prefix auto-insert** — when all suggestions share a prefix, auto-insert the common portion
- **Overlay display** — suggestions render in an overlay positioned near the cursor
- **ESC deferral** — if a task is running, ESC defers to the running task rather than closing autocomplete
- **Cache prewarming** — file index is preloaded on mount for faster first `@` mention

**Why this matters**: Autocomplete dramatically reduces typing effort and prevents errors in file paths and command names.

**Jargon**: FUZZY, GLOB, FILEWATCH, MCP, SUBPROCESS, LRUCACHE, UTILS

**Platform equivalents**:
- Terminal: Overlay rendered as ANSI-painted region below input line
- Web: Dropdown positioned absolutely near input element
- Python: `prompt_toolkit` completers or custom overlay
- OCaml: Custom overlay with `lambda-term`
- Emacs Lisp: `completion-at-point` or `company-mode`

### 4. Cancel / Interrupt Handling

Users must be able to cancel operations and exit the application:

**Single Escape / Cancel**:
- **Priority order**: cancel in-flight task → pop from command queue → fallback (no-op or context-dependent)
- **Context guards**: inactive when other screens/overlays own the escape key
- **Teammate view**: Ctrl+C kills all agents and exits the teammate view

**Double-press exit pattern**:
- **Ctrl+C first press** — sets exit state to pending, shows "Press Ctrl+C again to exit" hint
- **Ctrl+C second press** (within timeout) — triggers application exit
- **Ctrl+D** — same double-press pattern as Ctrl+C
- **Exit state** — `{ pending: boolean, keyName: 'Ctrl-C' | 'Ctrl-D' | null }` exposed for UI display
- **Interrupt callback** — if an interrupt handler returns true (interrupt was handled), exit is prevented

**Why this matters**: Users need reliable ways to cancel long-running operations and exit. The double-press pattern prevents accidental exits.

**Jargon**: SIGNALS, UTILS

### 5. Terminal Resize Handling

The input layer must detect and respond to terminal dimension changes:

- **Detect resize** — receive SIGWINCH signal or equivalent platform event
- **Expose dimensions** — make `{ columns, rows }` available to layout components
- **Trigger layout recalculation** — resize causes all layout-dependent components to reflow
- **Handle edge cases** — terminal shrinking below minimum dimensions, rapid resize events

**Why this matters**: Terminal resize breaks layout if not handled. Text wrapping, component sizing, and virtual scroll ranges all depend on dimensions.

**Jargon**: SIGNALS, YOGA, INK

**Platform equivalents**:
- Terminal: SIGWINCH signal handler, `ioctl(TIOCGWINSZ)`
- Web: `window.addEventListener('resize')`
- Python: `signal.signal(signal.SIGWINCH, handler)`
- C#: `Console.WindowWidth` / `Console.WindowHeight` polling or `Console.CancelKeyPress`
- Emacs Lisp: `window-size-change-functions`

### 6. Global Keybindings

Keyboard shortcuts that work across the application regardless of current focus:

- **Ctrl+T** — toggle expanded view (none ↔ tasks ↔ teammates ↔ none, considers teammate presence)
- **Ctrl+O** — toggle between prompt and transcript screens
- **Ctrl+E** — toggle "show all" in transcript mode (only active in transcript mode)
- **Ctrl+C / Escape** — exit transcript mode back to prompt
- **Ctrl+Shift+B** — toggle brief mode (feature-gated)
- **Meta+J** — toggle terminal panel (feature-gated)
- **Ctrl+L** — force UI redraw (recovery after external terminal clear)
- **Teammate preview toggle** — show/hide teammate message preview

**Context awareness**:
- Keybindings are only active in appropriate contexts (e.g., transcript shortcuts only work in transcript mode)
- `isActive` flag controls whether a binding responds to key presses
- Bindings are registered with a context name for priority resolution

**Why this matters**: Global shortcuts provide power-user efficiency. Without them, every action requires navigation through menus or typing full commands.

**Jargon**: FEATUREFLAGS, INK

**Platform equivalents**:
- Terminal: Raw key event matching against binding table
- Web: Global `keydown` listener with modifier key detection
- Python: `curses` key codes or `keyboard` library
- Emacs Lisp: `global-set-key`
- Smalltalk: World-level event handler

## Architecture

The input layer follows this pattern regardless of platform:

```
┌─────────────────────────────────────────┐
│          Raw Input Events                │
│  (keystrokes, mouse, resize, paste)      │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Input Processor                  │
│  (text buffer, cursor, history, chords)  │
└─────────────────────────────────────────┘
              │              │
              ▼              ▼
┌──────────────────┐ ┌──────────────────┐
│   Typeahead       │ │  Keybindings     │
│  (autocomplete)   │ │  (dispatch)      │
└──────────────────┘ └──────────────────┘
              │              │
              ▼              ▼
┌─────────────────────────────────────────┐
│          Action Handlers                 │
│  (submit, cancel, navigate, toggle)      │
└─────────────────────────────────────────┘
```

## Reference Implementation

The reference implementation uses REACT hooks (`useTextInput`, `useTypeahead`, `useExitOnCtrlCD`, `useCancelRequest`, `useTerminalSize`, `useGlobalKeybindings`) that compose together to handle all input concerns. The hooks are framework-agnostic in their logic — the REACT wrapper is just one consumer. See the `hooks/` directory for implementation details. Use them as a reference for *what* needs to happen, not as a mandate to use REACT.

**Jargon**: REACT, INK, FUZZY, GLOB, FILEWATCH, SIGNALS, UTILS

## Key Behavioral Requirements

1. **Full cursor control** — left/right/home/end/word movement, kill/yank, no boundary violations
2. **History cycling** — up/down arrows navigate previous commands with boundary handling
3. **Context-aware autocomplete** — commands, files, shell, agents, channels with debounced async fetching
4. **Double-press exit** — Ctrl+C/Ctrl+D require two presses to prevent accidental exits
5. **Cancel priority** — Escape cancels task first, then pops queue, then falls back
6. **Resize reflow** — terminal resize triggers full layout recalculation
7. **Context-aware keybindings** — global shortcuts only active in appropriate contexts
8. **ANSI-safe input** — strip escape sequences from pasted content
9. **Kill ring** — Ctrl+K/U/W cut text, Ctrl+Y pastes it back
10. **Inline ghost text** — show typeahead suggestions without disrupting user input
