## Purpose
Interactive UI for /extra-usage - manages extra usage额度 settings.

## Imports
- **External**: React
- **Internal**: runExtraUsage core logic, Login component

## Logic
Calls runExtraUsage() which determines appropriate action:
- For team/enterprise without billing access: Submits admin request or shows guidance
- For pro/max users: Opens browser to https://claude.ai/settings/usage
- For team/enterprise with billing access: Opens https://claude.ai/admin-settings/usage

If telemetry indicates user hasn't visited extra usage before, sets hasVisitedExtraUsage flag. May redirect to /login if not signed in.

## Exports
- `call` - LocalJSXCommandCall that either shows message or Login component
