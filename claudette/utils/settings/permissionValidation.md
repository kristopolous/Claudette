# permissionValidation

## Purpose
Validates permission rule strings (e.g., `Bash(npm run *)`, `Edit(src/**)`) for correct format, parentheses matching, escape handling, MCP rules, and tool-specific pattern constraints. Also provides a custom Zod schema for permission rule arrays.

## Imports
- **Stdlib**: `zod/v4`
- **External**: (none)
- **Internal**: mcpStringUtils (mcpInfoFromString), lazySchema, permissionRuleParser, stringUtils, toolValidationConfig

## Logic
**Escape handling**: Helper functions `isEscaped()`, `countUnescapedChar()`, and `hasUnescapedEmptyParens()` handle backslash-escaped characters in rule strings, since patterns like `grep '"'` contain intentionally unbalanced quotes.

**Validation pipeline** in `validatePermissionRule()`:
1. Empty rule check
2. Unescaped parentheses matching (open count must equal close count)
3. Unescaped empty parentheses check (must have tool name before parens)
4. Parse rule via `permissionRuleValueFromString`
5. **MCP validation**: MCP rules (`mcp__server`, `mcp__server__tool`, `mcp__server__*`) cannot have patterns in parentheses
6. **Tool name validation**: Non-empty, must start with uppercase
7. **Custom validation**: Tool-specific rules from `toolValidationConfig`
8. **Bash-specific validation**: `:*` must be at end, cannot be standalone prefix
9. **File tool validation**: `:*` syntax not allowed for file tools, wildcard placement warnings

**Zod schema**: `PermissionRuleSchema` wraps `validatePermissionRule()` via `z.string().superRefine()`, producing detailed error messages with suggestions and examples.

## Exports
- `validatePermissionRule(rule)` — validates a single permission rule string, returns `{valid, error?, suggestion?, examples?}`
- `PermissionRuleSchema` — lazy Zod schema for arrays of permission rule strings
