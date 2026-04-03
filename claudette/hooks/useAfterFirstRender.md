## Purpose
Exits the process after the first render to measure startup time in specific environments (e.g., automated testing or benchmarking).

## Imports
- **External**: REACT (useEffect)
- **Internal**: `../utils/envUtils` (isEnvTruthy)

## Logic
- Effect runs once after first render (empty dependency array)
- Checks two conditions:
  1. `process.env.USER_TYPE === 'ant'`
  2. `process.env.CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER` is truthy (via isEnvTruthy)
- If both true, writes startup time to stderr and calls `process.exit(0)`

## Exports
- `useAfterFirstRender` - UI hook that may terminate the process after initial render
