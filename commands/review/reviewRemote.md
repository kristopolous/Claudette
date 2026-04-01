## Purpose
Handles the actual remote review launch via teleport to CCR environment.

## Imports
- **External**: ContentBlockParam type
- **Internal**: API services (quota, utilization), RemoteAgentTask, teleport utilities, git helpers

## Logic
After checkOverageGate() approval, creates a CCR session with appropriate environment variables and teleports the review task. Supports two modes:
- PR mode: Uses refs/pull/N/head branch, sets BUGHUNTER_PR_NUMBER
- Branch mode: Bundles working tree, diffs against merge-base, sets BUGHUNTER_BASE_BRANCH

Configures bug hunter parameters via GrowthBook feature flags. Registers RemoteAgentTask to pipe results back via task-notification. Returns success message with tracking URL.

## Exports
- `launchRemoteReview` - Function that creates CCR session and registers task
- `confirmOverage` - Marks session's overage confirmation
- `OverageGate` type - Union type for billing gate outcomes
- `checkOverageGate` - Function that determines if user can launch
