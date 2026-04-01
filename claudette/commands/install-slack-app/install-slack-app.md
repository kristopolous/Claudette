## Purpose
Opens the Slack app installation page in the user's browser to install the Claude Slack app.

## Imports
- **Internal**: `LocalCommandResult` type, `logEvent` (analytics), `openBrowser`, `saveGlobalConfig`

## Logic
`call` logs an analytics event, increments `slackAppInstallCount` in global config, and attempts to open the Slack marketplace URL (A08SF47R6P4-claude) using the default browser. Returns a text message indicating success or failure.

## Exports
- `call` - Async function that opens browser to Slack app install page
