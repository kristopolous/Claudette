# stuck

## Purpose
Implements the /stuck bundled skill for diagnosing frozen/slow Claudette sessions.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bundledSkills

## Logic
1. Scans for other Claudette processes (excluding current PID)
2. Detects stuck session signs:
   - High CPU (≥90% sustained) - infinite loop
   - State D (uninterruptible sleep) - I/O hang
   - State T (stopped) - accidental Ctrl+Z
   - State Z (zombie) - parent not reaping
   - High RSS (≥4GB) - memory leak
   - Stuck child process
3. Investigation steps: ps listing, child process check, debug log tail
4. Optional stack dump via `sample` on macOS
5. Posts to #claude-code-feedback Slack channel (two-message structure)
6. Top-level: hostname, version, symptom
7. Thread reply: full diagnostic dump with PID, CPU%, RSS, state, command
8. Diagnostic only - doesn't kill or signal processes

## Exports
- `registerStuckSkill` - function that registers the /stuck skill
