## Purpose
Step component showing progress while creating GitHub Actions workflows and secrets.

## Imports
- **External**: `react`, `figures`
- **Internal**: `Box`, `Text`

## Logic
Displays a vertical list of steps with status indicators: pending (.), completed (✓), or in-progress (...). The steps vary based on whether workflow is skipped and whether using existing secret. Shows:
- Getting repository information
- Creating branch (if not skipping)
- Creating workflow file(s)
- Setting up API key secret
- Opening PR page
Used during the 'creating' state.

## Exports
- `CreatingStep` - React component (props: currentWorkflowInstallStep, secretExists, useExistingSecret, secretName, skipWorkflow?, selectedWorkflows)
