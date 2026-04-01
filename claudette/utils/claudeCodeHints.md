# utils/claudeCodeHints

## Purpose
Parses Claudette hints protocol from tool output for install prompts.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: debug, signal

## Logic
1. CLIs/SDKs emit `<claude-code-hint />` tag to stderr
2. Harness scans tool output, strips tags before model sees output
3. Surfaces install prompt to user - no inference, no proactive execution
4. Single slot store (not queue) - at most one prompt per session
5. React subscribes via useSyncExternalStore
6. `ClaudeCodeHintType` - 'plugin' (v1 only)
7. `ClaudeCodeHint` - v, type, value, sourceCommand
8. `SUPPORTED_VERSIONS` - Set([1])
9. `SUPPORTED_TYPES` - Set(['plugin'])
10. `HINT_TAG_RE` - regex for whole-line tag matching
11. `ATTR_RE` - regex for key="value" or key=value attributes
12. `extractClaudeCodeHints` - scans output, returns hints + stripped output
13. Fast path: no tag → no work, no allocation
14. Parses attributes from tag, validates version/type
15. Drops unknown versions/types

## Exports
- `ClaudeCodeHintType` - hint type
- `ClaudeCodeHint` - hint type
- `extractClaudeCodeHints` - extracts hints from output
- (Hint store functions)
