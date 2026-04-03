## Purpose
Step component displaying an error during GitHub App installation.

## Imports
- **External**: REACT
- **Internal**: `Box`, `Text`, `GITHUB_ACTION_SETUP_DOCS_URL`

## Logic
Shows an error message, optional reason, and a list of instructions to resolve. Also provides a link to manual setup documentation. Used when the installation process fails.

## Exports
- `ErrorStep` - UI component (props: error, errorReason?, errorInstructions?)
