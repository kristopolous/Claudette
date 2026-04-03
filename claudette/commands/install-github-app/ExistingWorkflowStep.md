## Purpose
Step component shown when an existing Claude workflow file is found in the repository.

## Imports
- **External**: REACT
- **Internal**: `Select`, `Box`, `Text`

## Logic
Presents three actions to the user: update the existing workflow file with the latest version, skip workflow update (only configure secrets), or exit without changes. Uses a Select component for choice. Renders info about the repository and a link to view the latest template.

## Exports
- `ExistingWorkflowStep` - UI component (props: repoName, onSelectAction: (action: 'update' | 'skip' | 'exit') => void)
