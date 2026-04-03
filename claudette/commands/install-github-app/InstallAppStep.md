## Purpose
Step component that instructs the user to install the Claude GitHub App from the marketplace.

## Imports
- **External**: REACT, `figures`
- **Internal**: `Box`, `Text`, `useKeybinding`, `GITHUB_ACTION_SETUP_DOCS_URL`

## Logic
Shows a message indicating the browser should open to the GitHub App installation page. Provides the repository name to install for. Prompts the user to press Enter once installation is complete. Includes a link to manual setup docs.

## Exports
- `InstallAppStep` - UI component (props: repoUrl, onSubmit)
