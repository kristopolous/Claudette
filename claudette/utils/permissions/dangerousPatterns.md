# dangerousPatterns

## Purpose
Defines lists of dangerous shell command patterns used by permission predicates to detect and strip allow-rules that would let the model bypass the auto-mode classifier by running arbitrary code via interpreters or package runners.

## Imports
- (none)

## Logic
1. `CROSS_PLATFORM_CODE_EXEC` - Shared list of interpreters, package runners, shells, and remote command wrappers present on both Unix and Windows. Used to prevent list drift between bash and PowerShell dangerous patterns.
2. `DANGEROUS_BASH_PATTERNS` - Extends cross-platform list with Unix-only shells (zsh, fish), shell builtins (eval, exec, env, xargs, sudo), and conditionally adds Anthropic-internal-only patterns when `USER_TYPE === 'ant'` (fa run, coo, gh, gh api, curl, wget, git, kubectl, aws, gcloud, gsutil). These feed `isDangerousBashPermission` in permissionSetup.ts.

## Exports
- `CROSS_PLATFORM_CODE_EXEC` - readonly array of cross-platform dangerous command prefixes (interpreters like python/node/deno, package runners like npx/npm run, shells like bash/sh, and ssh)
- `DANGEROUS_BASH_PATTERNS` - readonly array of all dangerous bash patterns; includes cross-platform list plus Unix-only entries and ant-internal entries (conditionally added based on `USER_TYPE === 'ant'`)

## Source
`dangerousPatterns`
