## Purpose
Step component showing warnings during GitHub App installation, allowing user to continue anyway.

## Imports
- **External**: REACT, `figures`
- **Internal**: `Box`, `Text`, `useKeybinding`, `GITHUB_ACTION_SETUP_DOCS_URL`, type `Warning`

## Logic
Presents a list of warnings (e.g., missing GitHub CLI, missing permissions, repository not found). User can press Enter to continue despite warnings, or Ctrl+C to exit. Shows a link to manual setup docs.

## Exports
- `WarningsStep` - UI component (props: warnings: Warning[], onContinue: () => void)
