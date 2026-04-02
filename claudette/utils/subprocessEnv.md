# subprocessEnv

## Purpose
Returns a sanitized copy of `process.env` for subprocesses (Bash tool, shell snapshots, MCP stdio servers, LSP servers, shell hooks), stripping sensitive secrets to prevent prompt-injection attacks from exfiltrating credentials via shell expansion.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `./envUtils`

## Logic
1. **Scrub list**: `GHA_SUBPROCESS_SCRUB` is a const array of ~25 env var names to strip, including Anthropic auth keys, cloud provider credentials (AWS, GCP, Azure), GitHub Actions OIDC/runtime tokens, OTEL exporter headers, and claude-code-action-specific vars. Also strips `INPUT_<NAME>` duplicates that GitHub Actions auto-creates for `with:` inputs.
2. **Gating**: Stripping is gated on `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` env var. The claude-code-action sets this automatically when `allowed_non_write_users` is configured.
3. **Proxy injection**: If an upstream proxy env function has been registered (via `registerUpstreamProxyEnvFn`), its returned vars (HTTPS_PROXY, CA bundle) are merged into the environment regardless of scrub setting.
4. **Preserved vars**: `GITHUB_TOKEN` and `GH_TOKEN` are intentionally NOT scrubbed — wrapper scripts need them to call the GitHub API. These are job-scoped and expire with the workflow.

## Exports
- `registerUpstreamProxyEnvFn` - wires up a function that returns proxy env vars (called from init.ts after lazy-loading the upstreamproxy module)
- `subprocessEnv` - returns a copy of process.env with secrets stripped (when gated) and proxy vars injected

## Source
`subprocessEnv`
