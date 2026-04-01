## Purpose
Install the Claude Slack app from the Slack marketplace.

## Imports
- **Internal**: Analytics logging, openBrowser utility, saveGlobalConfig

## Logic
1. Simple local command that:
   - Logs analytics event 'tengu_install_slack_app_clicked'
   - Increments slackAppInstallCount in global config
   - Opens browser to Slack marketplace URL for Claude app
2. Returns text: "Opening Slack app installation page in browser…" on success
3. On failure to open browser, returns URL for manual visit
4. Command type: 'local'
5. Availability: ['claude-ai'] (for Claude AI subscribers)
6. Not supported in non-interactive mode

## Exports
- `call` - async function returning LocalCommandResult (text)
- `SLACK_APP_URL` constant
