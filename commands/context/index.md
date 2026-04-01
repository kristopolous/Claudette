## Purpose
Provides both interactive and non-interactive variants of the context usage command.

## Imports
- **Internal**: Command type, noninteractive implementation, feature flags

## Logic
1. Two exports from this index:
   a. `context` (default):
      - type 'local-jsx' for interactive REPL
      - enabled when NOT in non-interactive session
      - lazy loads context.tsx which renders colored grid visualization
      - description: "Visualize current context usage as a colored grid"
   b. `contextNonInteractive`:
      - type 'local' for non-interactive/headless mode
      - enabled ONLY in non-interactive sessions
      - hidden in interactive mode (isHidden check)
      - lazy loads context-noninteractive.ts which returns markdown table
      - description: "Show current context usage"
2. Non-interactive version uses collectContextData and formatContextAsMarkdownTable
3. Both share the same analysis logic for consistency

## Exports
- `context` - Command (local-jsx)
- `contextNonInteractive` - Command (local)
