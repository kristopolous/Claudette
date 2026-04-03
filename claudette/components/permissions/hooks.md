## Purpose
Provides hooks and utilities for logging permission request events to analytics and unary logging systems.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, `react`
- **Internal**: `services/analytics`, `services/analytics/metadata`, `tools/BashTool`, `utils/bash/commands`, `utils/permissions/PermissionResult`, `utils/permissions/PermissionUpdate`, `utils/permissions/permissionRuleParser`, `utils/sandbox/sandbox-adapter`, `state/AppState`, `utils/env`, `utils/slowOperations`, `utils/unaryLogging`, `PermissionRequest`

## Logic
Converts permission decision reasons and results into loggable strings, handling all reason types including classifier, rule, hook, mode, subcommand results, and safety checks. The logging hook deduplicates by tool use ID to prevent infinite re-render loops, increments permission prompt counts for attribution tracking, and logs both public and internal-only analytics events for bash tools.

## Exports
- `usePermissionRequestLogging` - hook that logs permission request show events, increments attribution counters, and logs internal bash tool details
- `UnaryEvent` - type defining completion type and language name for unary logging
