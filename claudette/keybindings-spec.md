# Keybinding System

> **Technology Map**: See `START-HERE.md` for the authoritative dependency table — every library mapped to its abstract capability with porting guidance for any language.

## Purpose

Describes the functional requirements for the keybinding system — the component that parses, validates, matches, and dispatches keyboard shortcuts to action handlers. Supports single keystrokes, multi-key chord sequences, context-aware binding resolution, user customization, and conflict detection. The reference implementation uses a TypeScript parser/match/resolver pipeline, but any keybinding approach is acceptable: readline bindings (Python, C), X11/Wayland keymaps (OCaml), WPF InputBindings (C#), Emacs keymaps, Smalltalk event dispatchers, etc.

**Jargon**: SCHEMA, FILEWATCH, JSONC, XDG, UTILS

## What You Need

Your keybinding layer must provide these capabilities. How you implement them depends on your platform:

### 1. Keybinding Schema

Each keybinding is a structured record with these fields:

- **`keys`** — the key sequence string (e.g., `"ctrl+k"`, `"ctrl+x ctrl+s"`)
- **`action`** — the action identifier to dispatch (e.g., `"chat:cancel"`, `"app:toggleTodos"`)
- **`description`** — human-readable description for help/discovery
- **`context`** — the UI context where this binding is active (e.g., `"Global"`, `"Chat"`, `"Autocomplete"`, `"Confirmation"`)

**Valid contexts** (the set of UI contexts where bindings can apply):
- `Global` — always active, lowest priority
- `Chat` — active during normal conversation input
- `Autocomplete` — active when autocomplete overlay is visible
- `Confirmation` — active during permission/confirmation dialogs
- `Transcript` — active in transcript view
- `Settings` — active in settings panel
- `Help` — active in help screen

**Valid actions** — a predefined set of action identifiers, each mapped to a handler. Actions are namespaced by context (e.g., `chat:cancel`, `app:toggleTodos`, `autocomplete:select`).

**Why this matters**: A structured schema enables validation, serialization, user customization, and conflict detection.

**Jargon**: SCHEMA

**Platform equivalents**:
- JavaScript/TypeScript: SCHEMA-validated objects with inferred types
- Python: `dataclass` with validation, or `pydantic` models
- OCaml: Variant types with record fields
- C#: Classes with data annotations
- Emacs Lisp: Alists with known keys
- Smalltalk: Objects with instance variables

### 2. Chord Sequences (Multi-Key Shortcuts)

The system must support chord sequences — multi-step key combinations:

- **Chord syntax** — keystrokes separated by spaces (e.g., `"ctrl+x ctrl+s"` means press Ctrl+X, then Ctrl+S)
- **Modifier normalization** — accept aliases: `ctrl`/`control`, `alt`/`opt`/`option`/`meta`, `cmd`/`command`/`super`/`win`
- **Special key names** — `escape`, `enter`, `tab`, `backspace`, `delete`, `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `f1`-`f12`
- **Chord state tracking** — when the first keystroke of a chord is pressed, enter "pending chord" state
- **Chord completion** — if the next keystroke completes the chord, dispatch the action
- **Chord cancellation** — if the next keystroke does not continue any pending chord, cancel the chord state and treat the keystroke as a new input
- **Chord started feedback** — optionally display "waiting for next key" indicator

**Why this matters**: Chords enable powerful shortcuts (like Emacs' Ctrl+X prefix) without consuming all single-key combinations.

**Jargon**: UTILS

### 3. Context Priority

Keybindings are resolved based on which UI contexts are currently active:

- **Context filtering** — only bindings whose context matches an active context are considered
- **Last-match-wins** — when multiple bindings match, the last registered one wins (enables user overrides of defaults)
- **Context stack** — multiple contexts can be active simultaneously (e.g., Global + Chat); more specific contexts take priority
- **isActive guards** — individual bindings can have an `isActive` predicate that dynamically enables/disables them

**Resolution order**:
1. Filter bindings by active contexts
2. Match input against filtered bindings (single keystroke or full chord)
3. If multiple match, last registered wins
4. Return action identifier, or `none`/`unbound` if no match

**Why this matters**: Without context priority, a binding active in one screen would steal keystrokes from another screen.

**Jargon**: UTILS

### 4. Handler Dispatch

Once a keybinding is matched, the action must be routed to the correct handler:

- **Action registry** — map of action identifiers to handler functions
- **Handler parameters** — handlers receive context about the key event (modifiers, key name, original event)
- **Handler return** — handlers may return a value indicating whether the event was consumed
- **Unbound keys** — keys with no binding pass through to default handling (text input, etc.)
- **Display text resolution** — given an action identifier and context, retrieve the human-readable shortcut string for display in UI

**Why this matters**: Decoupling key matching from handler execution allows bindings to be remapped without changing handler logic.

**Jargon**: UTILS

### 5. User Customization

Users must be able to override default keybindings:

- **Config file location** — user keybindings loaded from a config directory (platform-appropriate: `~/.config/claudette/keybindings.json` or equivalent)
- **Merge strategy** — user bindings are merged with defaults; user bindings override defaults for the same action+context
- **Hot reload** — file watcher detects config changes and reloads bindings without restart
- **Sync and async loading** — both async (with validation) and sync (for initial render) loading paths
- **Caching** — loaded bindings are cached for synchronous access
- **Telemetry** — log when custom bindings are loaded (once per day, not on every load)

**Why this matters**: Power users have muscle memory from other tools and need to remap keys.

**Jargon**: JSONC, XDG, FILEWATCH, LRUCACHE, UTILS

### 6. Validation

User keybinding configurations must be validated:

- **Parse errors** — invalid keystroke syntax (unknown modifiers, malformed chords)
- **Duplicate detection** — same key sequence bound to multiple actions within the same context
- **Reserved shortcuts** — detect shortcuts reserved by the OS or terminal emulator (e.g., Ctrl+C for SIGINT, Ctrl+Z for SIGTSTP)
- **Invalid contexts** — context name not in the valid set
- **Invalid actions** — action identifier not in the valid set
- **Warning format** — warnings are grouped by severity (error vs warning), deduplicated by type+key+context, and formatted for display

**Validation types**:
- `parse_error` — keystroke string could not be parsed
- `duplicate` — same key bound to multiple actions in same context
- `reserved` — shortcut is reserved by OS/terminal
- `invalid_context` — context name not recognized
- `invalid_action` — action identifier not recognized

**Why this matters**: Invalid bindings silently fail, leaving users confused about why their shortcuts don't work.

**Jargon**: SCHEMA, UTILS

### 7. Default Bindings

The system ships with a comprehensive set of default keybindings organized by context:

**Global context**:
- `app:toggleTodos` (Ctrl+T) — toggle task/teammate view
- `app:toggleTranscript` (Ctrl+O) — toggle transcript view
- `app:redraw` (Ctrl+L) — force UI redraw
- `app:exit` (Ctrl+D) — exit application (double-press)
- `app:interrupt` (Ctrl+C) — interrupt/cancel (double-press)

**Chat context**:
- `chat:cancel` (Escape) — cancel current operation
- `chat:submit` (Enter) — submit input
- `chat:multiline` (Backslash+Enter) — insert newline

**Autocomplete context**:
- `autocomplete:select` (Tab/Enter) — accept suggestion
- `autocomplete:navigate` (Arrow keys, Ctrl+N/P) — navigate suggestions
- `autocomplete:dismiss` (Escape) — close autocomplete

**Confirmation context**:
- `confirm:yes` (Enter/Y) — confirm action
- `confirm:no` (Escape/N) — cancel action

**Platform-specific bindings**:
- Image paste (platform-dependent key)
- Mode cycling (depends on terminal VT mode support)
- Feature-gated bindings included only when features are enabled

**Why this matters**: Default bindings provide a usable out-of-the-box experience. Users should not need to configure anything to start.

**Jargon**: FEATUREFLAGS, BUILDFLAGS, IMAGEPROC

### 8. Keystroke Parsing and Display

The system must parse keystroke strings and convert them back to display strings:

- **`parseKeystroke(str)`** — splits `"ctrl+shift+k"` into `{ modifiers: {ctrl, shift, meta}, key: "k" }`
- **`parseChord(str)`** — splits `"ctrl+k ctrl+s"` into array of parsed keystrokes
- **`keystrokeToString(parsed)`** — converts back to canonical string `"ctrl+shift+k"`
- **`keystrokeToDisplayString(parsed)`** — converts to platform-appropriate display string (e.g., `"⌘K"` on macOS, `"Ctrl+K"` on Linux)
- **`chordToDisplayString(chord)`** — converts chord to display string (e.g., `"Ctrl+X then Ctrl+S"`)

**Terminal quirks**:
- Terminals set `meta=true` on Escape key presses
- Alt and Meta are indistinguishable in most terminals
- Some key combinations are intercepted by the terminal before reaching the application

**Why this matters**: Display strings must match platform conventions (macOS uses ⌘, Linux uses Ctrl). Parsing must handle terminal idiosyncrasies.

**Jargon**: ANSI

## Architecture

The keybinding system follows this pattern regardless of platform:

```
┌─────────────────────────────────────────┐
│         Raw Key Event                    │
│  (key code, modifiers, context)          │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Key Parser                       │
│  (normalize modifiers, handle quirks)    │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Binding Matcher                  │
│  (filter by context, match chord state)  │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Action Resolver                  │
│  (last-match-wins, return action ID)     │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Handler Dispatch                 │
│  (lookup action, call handler)           │
└─────────────────────────────────────────┘
```

## Reference Implementation

The reference implementation uses a pipeline of pure functions: `parseKeystroke` → `matchesBinding` → `resolveKeyWithChordState` → handler dispatch. Bindings are loaded from `DEFAULT_BINDINGS` merged with user config, validated by `validateBindings`, and hot-reloaded via file watcher. See the `keybindings/` directory for implementation details. Use them as a reference for *what* needs to happen, not as a mandate to use TypeScript or REACT.

**Jargon**: SCHEMA, FILEWATCH, JSONC, UTILS

## Key Behavioral Requirements

1. **Structured schema** — every binding has keys, action, description, context
2. **Chord support** — multi-key sequences with pending state and cancellation
3. **Context filtering** — bindings only active in matching UI contexts
4. **Last-match-wins** — user overrides take priority over defaults
5. **Hot reload** — config file changes reload bindings without restart
6. **Validation** — detect parse errors, duplicates, reserved shortcuts, invalid contexts/actions
7. **Platform display** — shortcut display strings match platform conventions
8. **Terminal quirk handling** — alt/meta equivalence, escape key meta flag
9. **Comprehensive defaults** — usable out-of-the-box with bindings for all contexts
10. **Unbound passthrough** — keys with no binding fall through to default handling
