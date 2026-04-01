## Purpose
API utilities for /web-setup (remote-setup) - GitHub token import and environment creation.

## Imports
- **External**: axios
- **Internal**: OAuth config, teleport API utils, environment fetch

## Logic
Provides functions for remote setup flow:
- `importGithubToken()`: POSTs raw GitHub token to CCR backend for storage; returns GitHub username on success
- `createDefaultEnvironment()`: Best-effort creation of default cloud environment if none exist
- `isSignedIn()`: Checks if user has valid Claude OAuth credentials
- `getCodeWebUrl()`: Returns claude.ai/code URL
- `RedactedGithubToken`: Wrapper class that redacts token in logs/stringification

Handles various error kinds: not_signed_in, invalid_token, server error, network error.

## Exports
- `importGithubToken`
- `createDefaultEnvironment`
- `isSignedIn`
- `getCodeWebUrl`
- `RedactedGithubToken`
- `ImportTokenResult` type
- `ImportTokenError` type
