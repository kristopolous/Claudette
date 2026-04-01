# cli

## Purpose
Bootstrap entrypoint for Claudette CLI with fast-paths for common flags and special modes.

## Imports
- **Stdlib**: `process`
- **External**: `bun:bundle` feature flag
- **Internal**: Dynamic imports for config, model, prompts, claudeInChrome, various entrypoints

## Logic
1. Sets COREPACK_ENABLE_AUTO_PIN=0 to prevent yarn auto-pinning
2. Sets NODE_OPTIONS max-old-space-size=8192 for CCR environments (16GB containers)
3. ABLATION_BASELINE feature enables simple mode flags for harness-science baseline
4. Fast-path --version/-v: zero module loading, prints MACRO.VERSION
5. --dump-system-prompt: outputs rendered system prompt (ant-only, for eval sensitivity)
6. --claude-in-chrome-mcp: runs Chrome MCP server
7. --chrome-native-host: runs Chrome native messaging host
8. All imports dynamic to minimize module evaluation for fast paths
9. Startup profiler checkpointing for performance tracking

## Exports
- `main` - async bootstrap function that handles CLI entry
