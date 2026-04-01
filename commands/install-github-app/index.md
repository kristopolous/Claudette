## Purpose
Registers the install-github-app command metadata.

## Imports
- **Internal**: `Command` type, `isEnvTruthy`

## Logic
Defines a 'local-jsx' command named 'install-github-app' with description "Set up Claude GitHub Actions for a repository". Available to 'claude-ai' and 'console' users. Enabled unless `DISABLE_INSTALL_GITHUB_APP_COMMAND` is truthy. Lazy loads './install-github-app.js'.

## Exports
- `default` - The installGitHubApp command object
