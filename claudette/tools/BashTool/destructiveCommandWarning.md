# BashTool/destructiveCommandWarning.ts

## Purpose

Detects potentially destructive bash command patterns and returns human-readable warning messages for display in the permission dialog. Purely informational — does not affect permission decisions or auto-approval. Used to alert users about high-risk operations.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic

- `DestructivePattern`: Type with `pattern: RegExp` and `warning: string`
- `DESTRUCTIVE_PATTERNS`: Array of patterns covering:
  - Git operations: `reset --hard`, `push --force/--force-with-lease/-f`, `clean -f` (without `-n` dry-run), `checkout .`, `restore .`, `stash drop/clear`, `branch -D/--delete --force/--force --delete`
  - Git safety bypass: `commit/push/merge` with `--no-verify`; `commit --amend`
  - File removal: `rm -rf`, `rm -r`, `rm -f`, with command-start anchoring to avoid false positives in compound commands
  - Database: `DROP/TRUNCATE TABLE/DATABASE/SCHEMA`, `DELETE FROM` (simple case)
  - Infrastructure: `kubectl delete`, `terraform destroy`
- `getDestructiveCommandWarning(command): string | null`:
  - Iterates patterns; returns first matching warning string
  - Returns null if none match

## Exports

- `getDestructiveCommandWarning(command: string): string | null`
