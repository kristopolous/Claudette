## Purpose
Visual indicator shown on workers while waiting for the team lead to approve a pending permission request.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `ink`, `utils/teammate`, `Spinner`, `WorkerBadge`

## Logic
Retrieves the team name, agent name, and agent color from teammate utilities. Renders a spinner with a "Waiting for team lead approval" message, the worker badge if available, the pending tool name and description, and a note indicating which team leader the request was sent to.

## Exports
- `WorkerPendingPermission` - component displaying pending permission state with spinner and request details
