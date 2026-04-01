## Purpose
Step component showing success message after GitHub App installation completes.

## Imports
- **External**: `react`
- **Internal**: `Box`, `Text`

## Logic
Displays a success summary: workflow creation confirmation, whether using existing API key secret or newly created secret (with name), and next steps depending on whether workflow was skipped. For successful installation, pressing any key dismisses.

## Exports
- `SuccessStep` - React component (props: secretExists, useExistingSecret, secretName, skipWorkflow?)
