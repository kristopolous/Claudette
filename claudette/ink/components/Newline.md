# ink/components/Newline

## Purpose
Provides Newline component for inserting newline characters.

## Imports
- **Stdlib**: (none)
- **External**: `react`, `react/compiler-runtime`
- **Internal**: (none)

## Logic
1. `Props` - { count? }
2. `count` - number of newlines to insert, default 1
3. `Newline` - adds one or more newline (\n) characters
4. Must be used within <Text> components
5. Uses React compiler runtime (_c) for memoization
6. Renders <ink-text>{'\n'.repeat(count)}</ink-text>
7. `React` - React library

## Exports
- `Props` - newline props type
- `Newline` - newline component (default export)
