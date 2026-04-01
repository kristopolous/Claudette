# tools/BashTool/bashPermissions

## Purpose
Core permission system for the Bash tool: evaluates commands against user-defined rules, enforces security constraints (cd+git, compound commands, path access), and integrates classifier auto-approval.

## Imports
- **Stdlib**: None
- **External**: `@anthropic-ai/sdk` (`APIUserAbortError`), `bun:bundle` (`feature`), `zod/v4` (`z`)
- **Internal** (selected):
  - `services/analytics/*` - `getFeatureValue_CACHED_MAY_BE_STALE`, analytics types, `logEvent`
  - Tool` - `ToolPermissionContext`, `ToolUseContext`
  - `types/permissions` - `PendingClassifierCheck`
  - `utils/array` - `count`
  - `utils/bash/ast` - `checkSemantics`, `nodeTypeId`, `ParseForSecurityResult`, `parseForSecurityFromAst`, `Redirect`, `SimpleCommand`
  - `utils/bash/commands` - `CommandPrefixResult`, `extractOutputRedirections`, `getCommandSubcommandPrefix`, `splitCommand_DEPRECATED`
  - `utils/bash/parser` - `parseCommandRaw`
  - `utils/bash/shellQuote` - `tryParseShellCommand`
  - `utils/cwd` - `getCwd`
  - `utils/debug` - `logForDebugging`
  - `utils/envUtils` - `isEnvTruthy`
  - `utils/errors` - `AbortError`
  - `utils/permissions/bashClassifier` - classify functions, `isClassifierPermissionsEnabled`
  - `utils/permissions/PermissionResult` - `PermissionResult`
  - `utils/permissions/PermissionRule` - `PermissionRule`, `PermissionRuleValue`
  - utils/permissions/PermissionUpdate` - `extractRules`
  - `utils/permissions/PermissionUpdateSchema` - `PermissionUpdate`
  - `utils/permissions/permissionRuleParser` - `parsePermissionRule`, helpers
  - utils/permissions/permissions` - `createPermissionRequestMessage`, `getRuleByContentsForTool`
  - `utils/permissions/shellRuleMatching` - shared matching/suggestion helpers
  - `utils/platform` - `getPlatform`
  - `utils/sandbox/sandbox-adapter` - `SandboxManager`
  - `utils/slowOperations` - `jsonStringify`
  - `utils/windowsPaths` - `windowsPathToPosixPath`
  - `tools/BashTool/BashTool` - `BashTool` (tool metadata, `isReadOnly`)
  - `tools/BashTool/bashCommandHelpers` - `checkCommandOperatorPermissions`
  - `tools/BashTool/bashSecurity` - `bashCommandIsSafeAsync_DEPRECATED`, `stripSafeHeredocSubstitutions`
  - `tools/BashTool/modeValidation` - `checkPermissionMode`
  - `tools/BashTool/pathValidation` - `checkPathConstraints`
  - `tools/BashTool/sedValidation` - `checkSedConstraints`
  - `tools/BashTool/shouldUseSandbox` - `shouldUseSandbox`
  - `hooks/toolPermission/PermissionContext` - `PermissionContext`
  - `hooks/useSwarmPermissionPoller` - `registerPermissionCallback`
  - `utils/swarm/permissionSync` - `createPermissionRequest`, `sendPermissionRequestViaMailbox`

## Logic
- **Rule matching pipeline**: exact → deny/ask classifier (Haiku) → prefix/wildcard deny/ask → path constraints → allow rules → read-only → passthrough (prompt). Deny/ask rules take precedence over allow.
- **Security parsing**: Uses tree-sitter for AST when available; falls back to shell-quote + regex. Checks for compound commands, command injection, heredoc substitutions, and structural tricks. Too-complex commands default to ask.
- **Compound & piped commands**: Splits on `&&`, `||`, `|`, etc. Each subcommand checked individually; denies if any subcommand denies; aggregates suggestions when multiple need approval. Caps subcommands at `MAX_SUBCOMMANDS_FOR_SECURITY_CHECK` (50) to prevent ReDoS/CPU starvation.
- **Cross-segment cd+git**: Detects `cd` + `git` across pipe segments to prevent bare repo fsmonitor bypass.
- **Env var & wrapper stripping**: `stripSafeWrappers` removes safe env vars (e.g., `NODE_ENV`, `GOOS`) and wrappers (`timeout`, `nice`, `nohup`) before rule matching. Deny rules use `stripAllLeadingEnvVars` to avoid bypass. `SAFE_ENV_VARS` is public; `ANT_ONLY_SAFE_ENV_VARS` is internal-only.
- **Path constraints**: Validates output redirections and file access against project boundaries and sandbox rules. Uses AST redirects when available to avoid re-parsing bugs.
- **Classifier integration**: Speculatively starts classifier checks; attaches `pendingClassifierCheck` to allow auto-approval before user responds. High-confidence allow decisions bypass security checks. Supports `awaitClassifierAutoApproval` for swarm workers.
- **Sandbox auto-allow**: When sandboxing and `autoAllowBashIfSandboxed` are enabled, commands with no explicit deny/ask rules auto-allow.
- **Permissions建议**: Generates prefix or exact match rules via `suggestionForExactCommand`/`suggestionForPrefix`. Caps `MAX_SUGGESTED_RULES_FOR_COMPOUND` (5).
- **Swarm worker flow**: `handleSwarmWorkerPermission` (in `handlers/`) forwards to leader; uses speculative classifier first.
- **Telemetry**: Logs classifier results (ants-only), tree-sitter shadow comparisons, security divergences.

## Exports
- `bashToolHasPermission` - async main function `(input, context, getCommandSubcommandPrefixFn?) => Promise<PermissionResult>`
- `bashToolCheckExactMatchPermission` - exact rule check, returns `PermissionResult`
- `bashToolCheckPermission` - prefix/wildcard + path/readonly checks, returns `PermissionResult`
- `checkCommandAndSuggestRules` - combines checks and suggestions, returns `Promise<PermissionResult>`
- `getSimpleCommandPrefix` / `getFirstWordPrefix` - extract reusable command prefixes
- `stripSafeWrappers` / `stripAllLeadingEnvVars` / `stripWrappersFromArgv` - stripping utilities
- `isNormalizedCdCommand` / `isNormalizedGitCommand` / `commandHasAnyCd` - normalized command detectors
- `permissionRuleExtractPrefix` / `matchWildcardPattern` / `bashPermissionRule` - rule parsing/matching
- `startSpeculativeClassifierCheck` / `consumeSpeculativeClassifierCheck` / `clearSpeculativeChecks` / `peekSpeculativeClassifierCheck` - classifier speculation management
- `awaitClassifierAutoApproval` - for swarm workers, returns `PermissionDecisionReason | undefined`
- `executeAsyncClassifierCheck` - runs async classifier with callbacks
- Constants: `MAX_SUBCOMMANDS_FOR_SECURITY_CHECK` (50), `MAX_SUGGESTED_RULES_FOR_COMPOUND` (5), `BINARY_HIJACK_VARS` (regex)
- Note: `checkCommandOperatorPermissions` and `checkSandboxAutoAllow` are internal; `suggestionForExactCommand`/`suggestionForPrefix` are from shellRuleMatching.
