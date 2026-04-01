## Purpose
Sets up GitHub Actions workflows and secrets for a repository.

## Imports
- **Internal**: `logEvent`, `saveGlobalConfig`, constants (`CODE_REVIEW_PLUGIN_WORKFLOW_CONTENT`, `PR_BODY`, `PR_TITLE`, `WORKFLOW_CONTENT`), `openBrowser`, `execFileNoThrow`, type `Workflow`

## Logic
`createWorkflowFile` creates or updates a workflow file in the repo via GitHub API, substituting the secret name or OAuth token parameter as needed. `setupGitHubActions` orchestrates the full setup: validates repo exists, gets default branch, creates a feature branch, creates selected workflow files (claude.yml and/or claude-code-review.yml), sets the API key (or OAuth token) secret via `gh secret set`, and opens the PR page in the browser. Handles errors and logs analytics events. Supports skipping workflow creation (secret only) and custom secret names.

## Exports
- `setupGitHubActions` - async function (repoName, apiKeyOrOAuthToken, secretName, updateProgress, skipWorkflow?, selectedWorkflows, authType, context?)
