# Command Registry System

> **Technology Map**: See `START-HERE.md` for the authoritative dependency table — every library mapped to its abstract capability with porting guidance for any language.

## Purpose

Describes the functional requirements for the slash command system — the component that registers, discovers, parses, validates, and executes user-invoked commands (e.g., `/help`, `/clear`, `/model`). Supports built-in commands, skill commands, plugin commands, and dynamic command loading with feature-gated availability. The reference implementation uses a TypeScript registry with REACT-based command rendering, but any command approach is acceptable: argparse subcommands (Python), command pattern (OCaml, C#), CLOS methods (Common Lisp), message-passing commands (Smalltalk), interactive commands (Emacs Lisp), etc.

**Jargon**: REACT, SCHEMA, INFERENCE, SUBPROCESS, DIFF, QR_CODE, MARKDOWN, FILEWATCH, GLOB, FUZZY, UTILS, FEATUREFLAGS, BUILDFLAGS

## What You Need

Your command layer must provide these capabilities. How you implement them depends on your platform:

### 1. Command Registry Pattern

Each command is a structured record with these fields:

- **`name`** — the command identifier (e.g., `"help"`, `"clear"`, `"model"`)
- **`aliases`** — alternative names (e.g., `clear` has aliases `["reset", "new"]`)
- **`description`** — human-readable description for help display
- **`argumentHint`** — hint shown in autocomplete (e.g., `"[model-name]"`, `"[report]"`)
- **`type`** — command execution type:
  - `local` — executes synchronously, returns text result
  - `local-jsx` — renders an interactive UI component, calls `onDone` when finished
  - `prompt` — constructs a prompt for the AI to execute
- **`call`** — the command handler function
- **`featureGate`** — optional feature flag; command is only available if the feature is enabled
- **`availability`** — optional auth/provider requirement; command only available to qualifying users
- **`hidden`** — if true, command does not appear in help/autocomplete but can still be invoked

**Command handler signature**:
- `call(args, context)` — receives argument string and execution context
- `context` provides: `onDone` (completion callback), `setMessages` (state access), `cwd` (working directory), etc.
- Return value depends on command type:
  - `local`: `{ type: 'text', content: string }`
  - `local-jsx`: renders UI component, calls `onDone(result)` when done
  - `prompt`: `{ type: 'prompt', instructions: string }`

**Why this matters**: A uniform command interface enables discovery, autocomplete, help display, and consistent execution regardless of what the command does.

**Jargon**: REACT, SCHEMA, FEATUREFLAGS, UTILS

### 2. Built-In Commands

Each built-in command's behavior:

**`/help`** — Show available commands
- **Arguments**: none, or a command name for specific help
- **Output**: Interactive UI listing all commands with names, descriptions, aliases, and usage hints
- **Type**: `local-jsx`

**`/clear`** (aliases: `/reset`, `/new`) — Clear conversation history
- **Arguments**: none
- **Behavior**:
  - Execute SessionEnd hooks (with timeout)
  - Clear all messages
  - Regenerate session ID (preserve parent for analytics)
  - Clear all caches (context, commands, skills, git, LSP, etc.)
  - Reset AppState (tasks, attribution, file history, MCP state)
  - Clear session metadata and worktree state
  - Execute SessionStart hooks
  - Re-initialize working directory
- **Output**: Empty text response (conversation is cleared)
- **Type**: `local`

**`/exit`** — Exit the application
- **Arguments**: none
- **Behavior**:
  - If in background session: detach instead of killing
  - If worktree session active: show cleanup dialog
  - Otherwise: display goodbye message and perform graceful shutdown
- **Type**: `local-jsx`

**`/model`** — Select or display the AI model
- **Arguments**: optional model name or alias
- **Behavior**:
  - No args: show interactive model picker
  - Model name provided: validate and set the model
  - `?` or info arg: display current model and effort level
  - `help` arg: show usage help
  - Validates model against allowlist
  - Checks 1M context access availability
  - Shows fast mode implications if applicable
  - Supports session overrides (from plan mode)
  - Resolves model aliases to full identifiers
- **Output**: Confirmation message or interactive picker
- **Type**: `local-jsx`

**`/cost`** — Display session cost and duration
- **Arguments**: none
- **Output**:
  - If subscriber: show subscription usage message, overage status, detailed breakdown (internal users)
  - If not subscriber: show standard cost and duration
- **Type**: `local`

**`/compact`** — Compact conversation history
- **Arguments**: optional custom instructions for summarization
- **Behavior**:
  - Filter messages after compact boundary (for REPL scrollback)
  - Validate messages exist
  - Compaction strategy (in order):
    1. Session memory compaction (if no custom instructions)
    2. Reactive compaction (if reactive-only mode active)
    3. Traditional compaction (microcompact + full compact)
  - Error handling: distinguish aborted, insufficient messages, incomplete response
  - Run post-compact cleanup
  - Build display text with status and tips
- **Output**: Compaction result with summary
- **Type**: `local`

**`/commit`** — Create a git commit or pull request
- **Arguments**: PR-related argument (title, body, or action)
- **Behavior**:
  - If no argument: show usage
  - If on main with no changes: no-op
  - If on feature branch: create new PR
  - If PR exists: update PR title/body
  - Constructs prompt with git context (status, diff, branch, recent commits)
  - Follows Git Safety Protocol (no --amend, no hook skipping, no config changes)
  - Includes Slack integration and undercover mode variations
- **Type**: `prompt`

**`/review`** — Code review of current changes
- **Arguments**: optional PR number
- **Behavior**:
  - Constructs detailed review prompt including git diff and changed files
  - Review checklist: functionality, performance, security, testing, documentation, backwards compatibility
  - If no PR number: list available PRs
  - If PR number: fetch PR view and diff
  - Requests structured feedback with specific sections
- **Type**: `prompt`

**`/export`** — Export conversation to file or clipboard
- **Arguments**: optional filename
- **Behavior**:
  - Render conversation to plain text
  - If filename provided: write directly to file (add `.txt` if missing)
  - If no filename: show export dialog with default filename from first user prompt
  - Default filename sanitized from first prompt text or timestamp
- **Output**: Confirmation message with file path
- **Type**: `local-jsx`

**`/feedback`** (aliases: `/bug`) — Submit feedback
- **Arguments**: optional initial description (prefills the feedback form)
- **Behavior**:
  - Render feedback form with description field
  - Option to include conversation context
  - Option to attach background task information
  - Submit feedback to feedback service
- **Availability**: Disabled for Bedrock/Vertex/Foundry deployments, when DISABLE_FEEDBACK_COMMAND env is set, in essential traffic mode, or when policy disallows product feedback
- **Type**: `local-jsx`

**`/permissions`** — Manage tool permission rules
- **Arguments**: none
- **Behavior**:
  - Show permission rule management UI
  - View existing allow/deny/ask rules
  - Add, edit, or remove rules
  - Retry previously denied commands (creates a retry message in conversation)
- **Type**: `local-jsx`

**`/session`** — Display remote session info
- **Arguments**: none
- **Behavior**:
  - Show remote session URL
  - Generate and display QR code for mobile access
  - If not in remote mode: show warning with `--remote` suggestion
  - Escape key closes the dialog
- **Visibility**: Hidden when not in remote mode
- **Type**: `local-jsx`

**`/status`** — Show application status
- **Arguments**: none
- **Behavior**: Open settings UI with Status tab active, displaying version, model, account, API connectivity, and tool statuses
- **Type**: `local-jsx`

**`/theme`** — Change UI theme
- **Arguments**: none
- **Behavior**:
  - Show theme picker (light, dark, system)
  - On selection: apply theme and confirm
  - On cancel: dismiss with no change
- **Type**: `local-jsx`

**`/version`** — Display application version
- **Arguments**: none
- **Output**: Version string (git SHA for internal builds, changelog link for external builds)
- **Type**: `local`

**`/doctor`** — Run diagnostic checks
- **Arguments**: none
- **Behavior**: Show diagnostic screen that checks installation, settings, API connectivity, tool availability
- **Type**: `local-jsx`

**Jargon**: REACT, SCHEMA, INFERENCE, SUBPROCESS, DIFF, QR_CODE, MARKDOWN, HTTP, UTILS, FEATUREFLAGS, SEMVER

### 3. Command Discovery

Users must be able to find available commands:

- **Help display** — `/help` lists all commands with names, descriptions, aliases
- **Autocomplete** — typing `/` triggers command autocomplete with fuzzy matching
- **Command filtering** — only show commands the user has access to (feature gates, availability requirements)
- **Remote-safe filtering** — in remote/bridge mode, only show commands safe for remote execution
- **Bridge-safe filtering** — for bridge execution, only show local-type commands
- **Hidden commands** — commands marked `hidden` do not appear in discovery but can be invoked by name

**Why this matters**: Discoverability is critical for a command-driven interface. Users should not need to read documentation to find commands.

**Jargon**: FUZZY, FEATUREFLAGS, REACT

### 4. Command Execution Flow

Commands follow a consistent execution pipeline:

1. **Parse** — extract command name and argument string from user input (e.g., `/model sonnet` → name=`model`, args=`sonnet`)
2. **Lookup** — find command by name or alias in the registry
3. **Validate** — check feature gates, availability requirements, policy restrictions
4. **Execute** — call the command's `call` handler with arguments and context
5. **Display** — render the result (text, UI component, or prompt for AI execution)
6. **Complete** — call `onDone` with the result, returning control to the input loop

**Error handling**:
- Unknown command: show error message with suggestion to use `/help`
- Feature-gated command: show message explaining the feature requirement
- Unavailable command: show message explaining the auth/provider requirement
- Command execution error: show error message, do not crash the application

**Jargon**: SCHEMA, FEATUREFLAGS, REACT, INFERENCE

### 5. Dynamic Command Loading

Commands can be loaded from multiple sources:

- **Built-in commands** — registered at module load time
- **Feature-gated commands** — conditionally registered based on feature flags
- **Skill commands** — loaded from `skills/` directory, plugins, and bundled skills
- **Dynamic skills** — async-loaded commands from external sources
- **Deduplication** — dynamic skills do not duplicate built-in command names
- **Memoization** — expensive command loading operations are cached
- **Cache invalidation** — explicit functions to clear command and skill caches

**Why this matters**: The command system must be extensible. Skills and plugins add commands without modifying core code.

**Jargon**: FILEWATCH, GLOB, UTILS, LRUCACHE, FEATUREFLAGS, BUILDFLAGS

### 6. Command Types

Commands differ in how they produce output:

**`local` commands**:
- Execute synchronously
- Return a text result
- No UI rendering
- Examples: `/clear`, `/cost`, `/version`

**`local-jsx` commands**:
- Render an interactive UI component
- Asynchronous — call `onDone` when finished
- Can show dialogs, pickers, forms
- Examples: `/help`, `/model`, `/export`, `/theme`

**`prompt` commands**:
- Construct instructions for the AI to execute
- Return a prompt string
- The AI performs the actual work
- Examples: `/commit`, `/review`

**Why this matters**: The command type determines how the result is handled and displayed.

**Jargon**: REACT, INFERENCE

## Architecture

The command system follows this pattern regardless of platform:

```
┌─────────────────────────────────────────┐
│          User Input: /cmd args           │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Command Parser                   │
│  (extract name, args from input)         │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Command Registry                 │
│  (lookup by name/alias, filter by access)│
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Validation                       │
│  (feature gates, availability, policy)   │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Command Handler                  │
│  (execute: local, local-jsx, or prompt)  │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Result Display                   │
│  (text, UI component, or AI prompt)      │
└─────────────────────────────────────────┘
```

## Reference Implementation

The reference implementation uses a central registry in `commands.md` that imports and registers all built-in commands, with memoized async loading for skills and dynamic commands. Each command is a module exporting a default command object with `name`, `description`, `type`, and `call` handler. See the `commands/` directory for individual command implementations. Use them as a reference for *what* needs to happen, not as a mandate to use REACT or TypeScript.

**Jargon**: REACT, SCHEMA, FILEWATCH, GLOB, UTILS, LRUCACHE, FEATUREFLAGS

## Key Behavioral Requirements

1. **Uniform command interface** — every command has name, description, type, and handler
2. **Alias support** — commands can have multiple names (e.g., `/clear`, `/reset`, `/new`)
3. **Three command types** — local (sync text), local-jsx (async UI), prompt (AI instructions)
4. **Feature-gated availability** — commands can be hidden behind feature flags
5. **Auth-based availability** — commands can require specific auth/provider access
6. **Discovery** — `/help` and autocomplete make commands findable
7. **Parse → validate → execute → display** — consistent execution pipeline
8. **Dynamic loading** — skills and plugins add commands at runtime
9. **Deduplication** — dynamic commands do not shadow built-in commands
10. **Graceful errors** — unknown commands, feature gates, and execution errors show helpful messages
11. **Remote safety** — commands can be filtered for remote/bridge execution contexts
12. **Cache management** — command loading is memoized with explicit cache invalidation
