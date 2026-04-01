# tasks/pillLabel

## Purpose
Provides compact footer-pill label generation for background task sets.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: constants figures, array utils, task types

## Logic
1. `getPillLabel` - generates compact label for background task set
2. Used by footer pill and turn-duration transcript line (consistent terminology)
3. Single type tasks:
   - local_bash: counts shells vs monitors, formats "N shells, M monitors"
   - in_process_teammate: counts unique teams, formats "N team(s)"
   - local_agent: formats "N local agent(s)"
   - remote_agent: uses diamond icons (◇ running, ◆ plan_ready)
   - ultraplan phases: plan_ready (◆), needs_input (◇), default (◇)
   - local_workflow, monitor_mcp, dream: specific labels
4. Mixed types: formats "N background task(s)"
5. `pillNeedsCta` - checks if pill should show "· ↓ to view" CTA
6. Only shows for single remote_agent in attention states (needs_input, plan_ready)
7. Plain running shows just diamond + label (no CTA)

## Exports
- `getPillLabel` - generates pill label for task set
- `pillNeedsCta` - checks if CTA should be shown
