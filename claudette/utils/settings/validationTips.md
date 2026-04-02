# validationTips

## Purpose
Provides user-friendly validation error tips and documentation links for common settings schema validation failures, helping users fix invalid settings JSON.

## Imports
- **Stdlib**: `zod/v4` (ZodIssueCode)
- **External**: (none)
- **Internal**: (none)

## Logic
Defines a table of `TipMatcher` objects, each with a `matches` predicate and a `tip` (suggestion + optional doc link). `getValidationTip()` finds the first matching tip for a given `TipContext` (path, code, expected, received, enumValues, etc.).

**Tip matchers cover**:
- `permissions.defaultMode` with `invalid_value` → lists valid modes
- `apiKeyHelper` with `invalid_type` → explains shell command format
- `cleanupPeriodDays` with `too_small` → explains valid range and default
- `env.*` with `invalid_type` → reminds that env values must be strings
- `permissions.allow`/`permissions.deny` with `invalid_type` → shows rule array format
- `hooks` with `invalid_type` → explains matcher string format (not object)
- Any field expecting `boolean` → reminds to use unquoted true/false
- `unrecognized_keys` → suggests checking for typos
- `invalid_value` with enum values → dynamically lists valid values
- Root-level `invalid_type` with null → suggests checking for JSON syntax errors
- `permissions.additionalDirectories` with `invalid_type` → shows path array format

Documentation links are also added based on path prefix (permissions, env, hooks) via `PATH_DOC_LINKS`.

## Exports
- `ValidationTip` — type: `{suggestion?, docLink?}`
- `TipContext` — type: `{path, code, expected?, received?, enumValues?, message?, value?}`
- `getValidationTip(context)` — returns a matching `ValidationTip` or null if no tip applies
