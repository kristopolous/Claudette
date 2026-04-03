# State Management

> **Technology Map**: See `START-HERE.md` for the authoritative dependency table — every library mapped to its abstract capability with porting guidance for any language.

## Purpose

Describes the behavioral requirements for the application state layer — the single source of truth that tracks conversation state, tool permissions, agent tasks, settings, and all derived computations. The reference implementation uses a generic pub/sub store pattern with REACT context providers, but any state management approach is acceptable: atoms (Clojure), signals (Solid.js, Preact), observables (RxJS), mutable state with change notification (C#, OCaml refs), or any reactive pattern.

**Jargon**: REACT, SCHEMA, UTILS, MCP, JSONC, FILEWATCH, FEATUREFLAGS, BUILDFLAGS

## What You Need

Your state layer must provide these capabilities. How you implement them depends on your platform:

### 1. Generic Store (Pub/Sub Pattern)

A minimal, framework-agnostic store that manages state of any type:

- **`getState()`** — returns the current state snapshot
- **`setState(updater)`** — applies a state update function, detects changes, notifies listeners
- **`subscribe(listener)`** — registers a callback for state changes, returns an unsubscribe function
- **Change detection** — uses equality comparison (e.g., `Object.is` or equivalent) to skip notifications when state is unchanged
- **Immutable updates** — state is replaced, not mutated; listeners receive both `newState` and `oldState`

**Why this matters**: The store must be decoupled from any UI framework so that state logic is testable, portable, and reusable across REPL, web, and native implementations.

**Jargon**: REACT, UTILS

**Platform equivalents**:
- JavaScript/TypeScript: Plain object with `Set<Listener>`, `Object.is` for comparison
- Python: Class with `__call__` subscribers, `==` for comparison
- OCaml: Reference cell with observer list, physical equality (`==`)
- C#: `event EventHandler<StateChangedEventArgs>` with `Equals` comparison
- Emacs Lisp: Variable with `add-hook` observers, `equal` for comparison
- Smalltalk: `Announcer` pattern with `=` comparison

### 2. Application State Shape

The store manages a single `AppState` object containing:

**Conversation state**:
- `messages` — ordered list of conversation messages (user, assistant, tool, system)
- Each message has: role, content blocks (text, tool_use, tool_result), id, timestamp

**Processing status**:
- `tasks` — active agent tasks (leader, teammates, swarm workers)
- Task states: idle, running, paused, completed, failed
- `speculationState` — speculative execution state (idle or active with abort controller, messages ref, written paths ref)

**Tool use state**:
- `tools` — available tools and their configurations
- `toolPermissionContext` — current permission mode and rule set
- `toolDecisions` — map of tool-use-id → permission decision (for audit/retry)
- `pendingWorkerRequest` — active swarm worker permission request

**Permission state**:
- Permission modes: Default, Plan Mode, Accept Edits, Bypass Permissions, Don't Ask, Auto, Bubble
- Permission rules: allow/deny patterns per tool with optional wildcards
- Denial tracking: `consecutiveDenials`, `totalDenials` with fallback thresholds

**Cost and usage**:
- Session cost tracking (total cost, token usage)
- Session duration
- Subscription status and overage tracking

**Model and settings**:
- Current model (with session override support)
- Effort level (low/medium/high)
- Thinking enabled/disabled
- Fast mode status

**UI state**:
- `expandedView` — none, tasks, teammates
- `screen` — prompt, transcript
- `showAllInTranscript` — transcript display mode
- `isBriefOnly` — brief mode toggle
- Terminal panel visibility
- Teammate message preview visibility

**Agent and swarm state**:
- Agent definitions with colors
- Swarm worker/leader roles
- Mailbox communication state

**Session state**:
- Session ID (regenerated on clear)
- Working directory
- File history
- MCP connection state
- Plugin state
- Notification and todo list state
- Commit attribution state
- Elicitation request events

**Jargon**: MCP, SCHEMA, UTILS

### 3. Derived State (Selectors)

Pure functions that compute derived values from the raw state. Selectors must have no side effects:

- **`lastUserMessage`** — most recent message with role=user
- **`lastAssistantMessage`** — most recent message with role=assistant
- **`messageCount`** — total number of messages
- **`toolUseCount`** — number of tool_use blocks in conversation
- **`permissionWaitStatus`** — whether currently waiting for user permission on a tool
- **`turnNumber`** — number of user/assistant exchange pairs
- **`getViewedTeammateTask`** — currently viewed teammate task (or undefined)
- **`getActiveAgentForInput`** — determines where user input routes: `leader`, `viewed` (teammate), or `named_agent`

**Why this matters**: Selectors prevent components from duplicating computation logic and ensure consistent derived values across the application.

**Jargon**: UTILS

**Platform equivalents**:
- JavaScript/TypeScript: Pure functions taking `AppState` as argument
- Python: Functions or `@property` methods on a state class
- OCaml: Functions taking the state record
- C#: Computed properties or extension methods
- Emacs Lisp: Functions taking the state alist/plist

### 4. State Provider / Context

A mechanism to make the store available to consuming code:

- **Single store instance** — one store per application session, prevents nested providers
- **Initialization** — store is created with initial state or defaults
- **Settings change subscription** — external settings changes (remote config, MDM) are applied to the store
- **Bypass permission handling** — permission mode checks on mount, disabled if remote settings loaded

**Jargon**: REACT, UTILS, FILEWATCH

**Platform equivalents**:
- REACT: Context Provider + custom hooks (`useAppStateStore`, `useAppState`)
- Python: Module-level singleton or dependency injection container
- OCaml: Global reference or functor parameter
- C#: Singleton service or DI container registration
- Emacs Lisp: Global variable with accessor functions

### 5. Reactive Update Triggers

State updates are triggered by specific events in the application lifecycle:

- **API responses** — new assistant messages, tool results streamed from the API
- **Tool execution** — tool use blocks added, permission decisions recorded
- **Permission changes** — user approves/denies, rules added/removed, mode switched
- **Cost updates** — token usage tracked, cost calculated from API responses
- **User commands** — `/clear`, `/model`, `/compact`, `/theme`, etc. mutate state
- **Settings changes** — model change, effort level, thinking toggle
- **Task lifecycle** — agent tasks started, completed, failed, killed
- **Terminal resize** — dimensions updated, triggering layout recalculation
- **Session events** — session start hooks, session end hooks, session ID regeneration

**Why this matters**: Every state change must flow through the store so that all subscribers (UI, analytics, persistence) see consistent updates.

**Jargon**: INFERENCE, SUBPROCESS, SIGNALS

### 6. Completion Boundaries

The state tracks boundaries for compaction and context management:

- **`CompletionBoundary`** — marks where conversation can be compacted from
- Boundary types: `complete`, `bash`, `edit`, `denied_tool` — each with a timestamp
- Messages before the boundary can be summarized/removed during compaction
- Messages after the boundary must be preserved for REPL scrollback

**Jargon**: UTILS

### 7. Speculative Execution State

The state tracks speculative (background) task execution:

- **States**: `idle` or `active`
- **Active state includes**: abort controller, messages reference, written paths reference, completion boundary
- **`SpeculationResult`**: messages produced, boundary reached, time saved in milliseconds
- Allows background agents to work while the user interacts with the foreground

**Jargon**: UTILS

## Architecture

The state layer follows this pattern regardless of platform:

```
┌─────────────────────────────────────────┐
│            AppState Store                │
│  (single source of truth, pub/sub)       │
└─────────────────────────────────────────┘
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
┌─────────────┐ ┌──────────┐ ┌─────────────┐
│  Selectors   │ │ Settings │ │  External   │
│ (pure fns)   │ │  Sync    │ │  Changes    │
└─────────────┘ └──────────┘ └─────────────┘
          │          │          │
          ▼          ▼          ▼
┌─────────────────────────────────────────┐
│            Subscribers                   │
│  (UI components, analytics, persistence) │
└─────────────────────────────────────────┘
```

## Reference Implementation

The reference implementation uses a minimal `createStore<T>` factory with `getState`, `setState`, and `subscribe` methods, wrapped in a REACT context provider. The store is framework-agnostic — the REACT wrapper is just one consumer. See the `state/` directory for implementation details. Use them as a reference for *what* needs to happen, not as a mandate to use REACT.

**Jargon**: REACT, UTILS

## Key Behavioral Requirements

1. **Single source of truth** — one store per session, all state flows through it
2. **Immutable updates** — state is replaced, never mutated in place
3. **Change detection** — no listener notification if state is unchanged (equality check)
4. **Pure selectors** — derived state computations have no side effects
5. **Pub/sub decoupling** — store knows nothing about its subscribers
6. **Reactive propagation** — state changes trigger UI updates, analytics, and persistence automatically
7. **Complete state shape** — tracks messages, tasks, tools, permissions, cost, model, settings, agents, session data
8. **Completion boundaries** — marks where context can be safely compacted
9. **Denial tracking** — tracks consecutive and total permission denials with fallback thresholds
10. **Speculative execution** — supports background task state separate from foreground
