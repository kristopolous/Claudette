## Purpose
Launches an advanced multi-agent planning session on Claudette on the web (CCR) with parallel exploration and plan generation.

## Imports
- **Stdlib**: `fs`
- **Internal**: Many modules: bridge types, Command type, constants, analytics, RemoteAgentTask, AppStateStore, teleport utils, ultraplan utils, and prompt file

## Logic
Provides `launchUltraplan` function that creates a remote CCR (Claudette on the web) session, polls for approval/execution, and handles both teleport (local execution) and remote execution paths. Includes eligibility checks, pre-launch dialog, session creation via `teleportToRemote`, task registration, and detached polling with 30-minute timeout. Handles errors gracefully and provides user-facing notifications. The command shows usage for bare invocation and displays a dialog for non-empty prompts.

## Exports
- `default` - Command object (type: 'local-jsx') with `isEnabled` gated to internal builds
- `buildUltraplanPrompt` - Assembles the initial CCR prompt with seed plan and user blurb
- `startDetachedPoll` - Polls for plan approval/execution outcome
- `stopUltraplan` - Stops a running ultraplan session
- `launchUltraplan` - Entry point for launching
