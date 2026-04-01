## Purpose
 Guides users through setting up GitHub Actions for a repository to enable Claude PR assistance.

## Imports
- **External**: `execa`, `react`
- **Internal**: Many: analytics (`logEvent`), `WorkflowMultiselectDialog`, `GITHUB_ACTION_SETUP_DOCS_URL`, `useExitOnCtrlCDWithKeybindings`, `type KeyboardEvent`, `Box`, `LocalJSXCommandOnDone`, auth utils (`getAnthropicApiKey`, `isAnthropicAuthEnabled`), `openBrowser`, `execFileNoThrow`, `getGithubRepo`, `plural`, step components (ApiKeyStep, CheckExistingSecretStep, CheckGitHubStep, ChooseRepoStep, CreatingStep, ErrorStep, ExistingWorkflowStep, InstallAppStep, OAuthFlowStep, SuccessStep, WarningsStep), `setupGitHubActions`, types (`State`, `Warning`, `Workflow`)

## Logic
Main component `InstallGitHubApp` manages a multi-step wizard:
1. `check-gh`: Verify GitHub CLI installed and authenticated with required scopes (repo, workflow).
2. `warnings`: Show any warnings (missing gh, no admin, repo not found) and allow continue.
3. `choose-repo`: Select repository (current or custom URL), perform permission checks.
4. `install-app`: Instruct to install the Claude GitHub App from marketplace.
5. `check-existing-workflow`: Handle existing .github/workflows/claude.yml (update/skip/exit).
6. `select-workflows`: Choose which workflows to install (claude, claude-review).
7. `api-key`: Provide API key (existing, new, or OAuth token).
8. `check-existing-secret`: If ANTHROPIC_API_KEY secret exists, ask to reuse or replace.
9. `creating`: Show progress as workflows are created and secrets set.
10. `success`: Show completion and next steps.
11. `error`: Show failure and instructions.

The flow branches based on auth method (api_key vs oauth_token) and whether skipping workflow. Uses `setupGitHubActions` to interact with GitHub API via `gh` CLI, creates branch, writes workflow files, sets secrets, and opens PR. Analytics logged throughout.

## Exports
- `call` - Command entry returning `<InstallGitHubApp>` React component
