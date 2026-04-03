# Tool Permission Flow

> **Technology Map**: See `START-HERE.md` for the authoritative dependency table — every library mapped to its abstract capability with porting guidance for any language.

## Purpose

Describes the functional requirements for the tool permission system — the component that determines whether a tool execution is allowed, denied, or requires user confirmation. Supports permission modes (Always Allow, Ask Each Time, Never Allow), auto-approval classifiers, speculative permission checking, interactive permission dialogs, path-based rules, command risk classification, and denial tracking. The reference implementation uses REACT-based permission contexts with async racing of multiple approval sources, but any permission approach is acceptable: capability-based security (OCaml), ACL systems (Python), role-based access (C#), etc.

**Jargon**: REACT, SCHEMA, INFERENCE, GLOB, PATHSPEC, SUBPROCESS, SHELL_QUOTE, UTILS, FEATUREFLAGS, BUILDFLAGS

## What You Need

Your permission layer must provide these capabilities. How you implement them depends on your platform:

### 1. Permission Modes

The system operates in one of several permission modes that control the default behavior:

- **Default** — use configured rules; prompt for tools without rules
- **Plan Mode** — pause before executing, allows user to review the plan
- **Accept Edits** — auto-accept file editing tools, prompt for others
- **Bypass Permissions** — allow all tools without prompting
- **Don't Ask** — allow all tools without prompting (alias for bypass)
- **Auto** — use AI classifier to auto-approve safe operations (feature-gated)
- **Bubble** — external permission service decides (feature-gated)

Each mode has a display configuration:
- `title` — human-readable name
- `shortTitle` — abbreviated name for tight UI
- `symbol` — icon/indicator symbol
- `color` — UI color for the mode indicator

**Mode cycling** — users can cycle through available modes with a keyboard shortcut. The cycle order respects feature availability (auto modes only shown if classifier is enabled).

**Why this matters**: Permission modes let users trade off between safety and speed. Power users want less friction; cautious users want more control.

**Jargon**: FEATUREFLAGS, FIGURES, ANSI

### 2. Permission Rules

Individual tool permissions are controlled by rules:

- **Rule structure** — `{ toolName, behavior, ruleContent? }`
- **Behaviors**:
  - `allow` — tool runs without prompting
  - `deny` — tool is blocked with an explanation
  - `ask` — tool triggers a user confirmation prompt
- **Rule content** — optional additional constraint (e.g., file path pattern, shell command pattern)
- **Wildcard support** — rules can use glob patterns for file paths and prefix matching for shell commands
- **Rule source** — tracks where a rule came from (config file, user setting, runtime addition)

**Rule matching**:
- Exact match: rule content equals tool input
- Prefix match: rule content is a prefix of tool input (for shell commands)
- Wildcard match: rule content contains glob patterns matched against file paths
- Each tool may implement custom matching logic in its `checkPermissions()` handler

**Why this matters**: Granular rules let users allow safe operations (read files) while blocking dangerous ones (delete files).

**Jargon**: GLOB, PATHSPEC, SHELL_QUOTE, UTILS

### 3. Auto-Mode Classifier

An AI-based classifier that automatically approves or denies tool operations:

- **Input** — current conversation context, tool name, tool input, available tools
- **Output** — `{ behavior: 'allow' | 'deny' | 'ask', reason: string }`
- **Tool allowlist** — certain tools are always auto-approved (Read, Glob, Grep, etc.) without classifier invocation
- **Bash command classification** — shell commands are classified as safe or dangerous based on:
  - Command prefix matching against known dangerous patterns
  - Dangerous patterns include: interpreters (python, node, deno), package runners (npx, npm run), shells (bash, sh, zsh, fish), shell builtins (eval, exec, env, xargs, sudo), deployment tools (kubectl, aws, gcloud), network tools (curl, wget, ssh)
  - Internal tools may have additional dangerous patterns (feature-gated)
- **Classifier state** — maintains approval cache per tool+input combination
- **Async checking** — classifier runs asynchronously; if it returns before user interaction, auto-approve
- **Checkmark display** — when classifier auto-approves during an active permission dialog, show a checkmark briefly then dismiss

**Why this matters**: The classifier reduces friction for safe operations while catching dangerous ones.

**Jargon**: INFERENCE, SUBPROCESS, SHELL_QUOTE, LRUCACHE, FEATUREFLAGS, FIGURES

### 4. Speculative Permission Checking

Permission checks run before tool execution begins:

- **Pre-flight check** — `hasPermissionsToUseTool(tool, input)` checks if the tool would be allowed
- **Classifier pre-check** — for bash commands, run the classifier before showing the permission dialog
- **Hook pre-check** — run permission hooks before the dialog
- **Recheck during dialog** — if rules change while the permission dialog is open, re-check and auto-resolve if now allowed
- **Abort handling** — if the operation is aborted (SIGINT, user cancel), return a `cancelAndAbort` decision

**Why this matters**: Speculative checking avoids showing permission dialogs for operations that would be auto-approved anyway.

**Jargon**: INFERENCE, SUBPROCESS, SIGNALS

### 5. Interactive Permission Flow

When a tool requires user confirmation:

- **Queue-based** — permission requests are queued; multiple concurrent requests are handled in order
- **Dialog display** — shows tool name, input, and context to the user
- **User actions**:
  - **Allow** — approve this execution, optionally persist the decision as a rule
  - **Allow with modification** — approve with modified input
  - **Deny** — reject this execution with an explanation
  - **Always allow** — create a persistent allow rule
  - **Always deny** — create a persistent deny rule
- **Decision persistence** — user choices can be saved as rules for future automatic handling
- **Feedback collection** — optional feedback text when denying
- **Bridge/remote approval** — permission requests can be relayed to remote clients (bridge, Telegram, iMessage) for approval
- **Multiple approval sources race** — hooks, classifier, bridge, and user input all race; first to resolve wins

**Resolve-once guarantee** — only one resolution is accepted; late arrivals are ignored.

**Why this matters**: The permission dialog is the user's control point. It must be clear, responsive, and support multiple approval channels.

**Jargon**: REACT, HTTP, WEBSOCKET, UTILS

### 6. Permission Denial Handling

When a tool is denied:

- **Denial message** — the agent receives a structured denial with explanation
- **Guidance** — denial messages include guidance on what the agent should do instead
- **Memory correction** — for subagents, denial messages may include correction hints
- **Denial recording** — each denial is recorded in `toolDecisions` map (keyed by toolUseID)
- **Retry support** — users can retry previously denied commands from the permissions UI
- **Content blocks** — denial responses may include content blocks visible to the agent

**Why this matters**: Denials must be communicated clearly to the agent so it can adapt its behavior.

**Jargon**: SCHEMA, UTILS

### 7. Path-Based Permissions

File operations are controlled by path rules:

- **Path validation** — validate file paths for safety (no dangerous removal patterns, sandbox allowlist checks)
- **Glob pattern support** — rules can use glob patterns (`*.log`, `**/*.tmp`)
- **Tilde expansion** — `~` expands to home directory
- **Sandbox write allowlist** — in sandboxed mode, only paths in the write allowlist can be modified
- **Dangerous removal detection** — patterns like `rm -rf /`, `rm -rf ~` are always blocked
- **Path resolution** — relative paths are resolved before checking against rules

**Why this matters**: File operations are the most common tool use. Path-based rules provide fine-grained control.

**Jargon**: GLOB, PATHSPEC, XDG, UTILS

### 8. Command Risk Classification

Bash commands are classified by risk level:

- **Safe commands** — read-only operations (ls, cat, grep, find, head, tail, wc, stat, file)
- **Dangerous commands** — operations that modify state or execute code:
  - Code execution: python, node, ruby, perl, deno, npx
  - Package runners: npm run, pip install, cargo run
  - Shells: bash, sh, zsh, fish
  - Shell builtins: eval, exec, env, xargs, sudo
  - Destructive: rm, mv, dd, mkfs
  - Network: curl, wget, ssh, scp
  - Deployment: kubectl, aws, gcloud, terraform
  - Git operations (internal-only classification)
- **Prefix matching** — dangerous patterns are matched as command prefixes (e.g., `python` matches `python script.py`)
- **Cross-platform** — dangerous pattern lists are shared between bash and PowerShell

**Why this matters**: Risk classification enables the auto-mode classifier to make informed decisions about shell commands.

**Jargon**: SUBPROCESS, SHELL_QUOTE, UTILS

### 9. Denial Tracking and Limits

The system tracks permission denials to prevent infinite retry loops:

- **Tracking state** — `{ consecutiveDenials: number, totalDenials: number }`
- **Limits** — `maxConsecutive: 3`, `maxTotal: 20`
- **Recording denials** — each denial increments both counters
- **Recording success** — each successful approval resets `consecutiveDenials` to 0 (no change if already 0)
- **Fallback trigger** — when `consecutiveDenials >= maxConsecutive` OR `totalDenials >= maxTotal`, the classifier falls back to always prompting
- **Circuit breaker** — auto-mode is circuit-broken when denial limits are exceeded

**Why this matters**: Without denial limits, a misconfigured classifier could endlessly deny operations, creating a bad user experience.

**Jargon**: UTILS

### 10. Permission Hooks

Extensible hooks that run before permission decisions:

- **Hook execution** — async hooks run in sequence before the interactive dialog
- **Hook allow** — if a hook returns allow, the tool is approved without user interaction
- **Hook deny** — if a hook returns deny, the tool is blocked
- **Hook interrupt** — hooks can request interruption of the current operation
- **Hook persistence** — hook decisions can be persisted as rules

**Why this matters**: Hooks enable custom permission logic (e.g., MCP server policies, enterprise compliance rules).

**Jargon**: MCP, UTILS

## Architecture

The permission system follows this pattern regardless of platform:

```
┌─────────────────────────────────────────┐
│          Tool Use Request                │
│  (tool name, input, context)             │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│     Speculative Check                    │
│  (rules, classifier, hooks - async race) │
└─────────────────────────────────────────┘
              │              │
         allowed?        needs prompt?
              │              │
              ▼              ▼
┌──────────────────┐ ┌──────────────────┐
│   Execute Tool    │ │  Permission      │
│   (no prompt)     │ │  Dialog Queue    │
└──────────────────┘ └──────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────┐
│     User Decision                        │
│  (allow/deny/always-allow/always-deny)   │
└─────────────────────────────────────────┘
              │              │
              ▼              ▼
┌──────────────────┐ ┌──────────────────┐
│   Execute Tool    │ │  Deny + Guidance │
│   (with logging)  │ │  (with tracking) │
└──────────────────┘ └──────────────────┘
```

## Reference Implementation

The reference implementation uses a `PermissionContext` object that orchestrates the permission lifecycle: speculative checks (hooks, classifier) race against the interactive dialog, with a `resolveOnce` guard ensuring single resolution. Permission decisions are logged, persisted, and tracked. See the `hooks/toolPermission/` and `utils/permissions/` directories for implementation details. Use them as a reference for *what* needs to happen, not as a mandate to use REACT or TypeScript.

**Jargon**: REACT, SCHEMA, INFERENCE, SUBPROCESS, SHELL_QUOTE, GLOB, PATHSPEC, UTILS

## Key Behavioral Requirements

1. **Three behaviors** — allow, deny, ask for every tool operation
2. **Permission modes** — Default, Plan, Accept Edits, Bypass, Don't Ask, Auto, Bubble
3. **Rule-based matching** — exact, prefix, and wildcard matching for tool-specific rules
4. **Auto-approval classifier** — AI-based classification for safe operations with tool allowlist
5. **Speculative checking** — check permissions before showing dialogs
6. **Resolve-once guarantee** — only one resolution accepted, late arrivals ignored
7. **Multi-source racing** — hooks, classifier, bridge, and user input race for resolution
8. **Path-based rules** — glob patterns, sandbox allowlists, dangerous removal detection
9. **Command risk classification** — safe vs dangerous bash command categorization
10. **Denial tracking** — consecutive and total denial counts with fallback thresholds (3 consecutive, 20 total)
11. **Decision persistence** — user choices saved as rules for future automation
12. **Denial guidance** — structured denial messages with actionable guidance for the agent
