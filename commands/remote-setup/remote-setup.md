## Purpose
Interactive UI for /web-setup - connects GitHub account to Claude on the web.

## Imports
- **External**: React, execa (gh CLI), Select, Dialog, LoadingState
- **Internal**: OAuth analytics, GitHub auth status, browser opener, remote-setup API

## Logic
Orchestrates multi-step setup:
1. 'checking': Verifies Claude sign-in status and GitHub CLI authentication
2. 'confirm': If GitHub token found, asks user to confirm upload
3. 'uploading': Imports token via importGithubToken(), creates default environment, opens browser to claude.ai/code

Handles various states: not signed in, gh not installed, gh not authenticated, token present. Shows appropriate error messages and guidance. Logs telemetry throughout.

## Exports
- `call` - LocalJSXCommandCall rendering the setup dialog
