# protocolHandler

## Purpose
Entry point for `claude --handle-uri <url>`. When the OS invokes claude with a `claude-cli://` URL, this module parses the URI, resolves the working directory, and launches Claude in the user's terminal emulator. Runs headless (no TTY attached).

## Imports
- **Stdlib**: `os` (homedir)
- **Internal**: `../debug` (logForDebugging), `../githubRepoPathMapping` (filterExistingPaths, getKnownPathsForRepo), `../slowOperations` (jsonStringify), `./banner` (readLastFetchTime), `./parseDeepLink` (parseDeepLink), `./registerProtocol` (MACOS_BUNDLE_ID), `./terminalLauncher` (launchInTerminal)

## Logic
1. `handleDeepLinkUri` is called from the CLI entry point with `--handle-uri`. Parses the URI via `parseDeepLink`, resolves cwd via `resolveCwd`, precomputes `lastFetch` timestamp, then calls `launchInTerminal` with `process.execPath` (same binary the OS launched). Returns exit code 0 or 1.
2. `handleUrlSchemeLaunch` handles macOS URL scheme launches via the `.app` bundle. Checks `__CFBundleIdentifier` env var against `MACOS_BUNDLE_ID` to detect LaunchServices invocation, then uses the `url-handler-napi` NAPI module to receive the URL Apple Event. Returns `null` if not a URL launch.
3. `resolveCwd` determines the working directory with precedence: explicit `cwd` > repo lookup via `getKnownPathsForRepo` (MRU clone) > home directory. A repo not cloned locally is not an error — falls through to home. Returns `{ cwd, resolvedRepo? }`.

## Exports
- `handleDeepLinkUri` - async function taking a raw URI string, returns exit code (Promise<number>)
- `handleUrlSchemeLaunch` - async function for macOS bundle URL launches, returns exit code or null (Promise<number | null>)

## Source
`claude-code/src/utils/deepLink/protocolHandler.ts`
