## Purpose
Defines constants and workflow templates for integrating the AI coding agent with GitHub Actions and GitHub App installations.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Exports a PR title and body for installing the GitHub Actions workflow, the workflow YAML content for issue/PR comment triggers, a separate code review workflow YAML, and a link to setup documentation. The workflows configure permissions, checkout steps, and API key usage for the inference provider.

## Exports
- `PR_TITLE` - title for the PR that adds the GitHub Actions workflow
- `GITHUB_ACTION_SETUP_DOCS_URL` - URL to the setup documentation
- `WORKFLOW_CONTENT` - YAML string for the main workflow triggered by @mentions in issues and PRs
- `PR_BODY` - markdown body explaining the integration for the installation PR
- `CODE_REVIEW_PLUGIN_WORKFLOW_CONTENT` - YAML string for the automated code review workflow on pull requests
