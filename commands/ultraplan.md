## Purpose
Launch advanced multi-agent planning session in Claude Code on the web (CCR).

## Imports
- **Internal**: Remote control/teleport utilities, remote agent task management, ultraplan prompt template, session polling

## Logic
1. Checks for existing active or launching session (prevents duplicates)
2. Validates arguments (requires prompt/blurb, otherwise shows usage)
3. Checks eligibility for remote agent tasks (requires login, etc.)
4. Teleports to remote CCR session with ultraplan prompt
5. Registers RemoteAgentTask with task system
6. Starts detached polling for plan approval:
   - Waits for user to approve/reject plan in browser
   - If approved for remote execution: completes task, notifies user
   - If approved for teleport: shows UltraplanChoiceDialog in REPL
7. Handles errors, timeouts (30min), and cancellation
8. Shows live status via pill and notifications
9. Command type: 'local-jsx' with interactive pre-launch dialog

## Exports
- `default` - local-jsx Command with launchUltraplan and stopUltraplan
- `buildUltraplanPrompt`, `startDetachedPoll`, `stopUltraplan` - exported utilities
