# prefix

## Purpose
Factory for creating command prefix extractors that use Haiku LLM to determine the permission prefix of shell commands. Shared by different shell tools (Bash, etc.) with tool-specific configuration. Uses two-layer memoization with LRU eviction and rejection-safe cache management.

## Logic
1. `createCommandPrefixExtractor` creates a memoized function (LRU bounded to 200 entries) that sends a command to Haiku with a tool-specific policy spec, validates the response against dangerous patterns (shell executables, git, command injection), and returns the prefix or null
2. `createSubcommandPrefixExtractor` wraps a single-command extractor to handle compound commands — splits the command, extracts prefixes for the full command and each subcommand in parallel, returns a map of subcommand→prefix
3. Both extractors use two-layer memoization: outer function creates the promise, .catch handler evicts the cache entry on rejection (with identity guard to avoid deleting newer entries after LRU eviction)
4. Pre-check function can short-circuit the Haiku call (e.g., isHelpCommand for Bash)
5. 10-second timeout warning if pre-flight check is slow
6. Feature flag `tengu_cork_m4q` controls whether policy spec is sent as system prompt (enables prompt caching)
7. DANGEROUS_SHELL_PREFIXES set blocks bare shell executables (sh, bash, zsh, fish, cmd, powershell, pwsh, etc.) and git from being accepted as prefixes — allowing these would defeat the permission system

## Items

### createCommandPrefixExtractor
**Type**: Function

### createSubcommandPrefixExtractor
**Type**: Function

### getCommandPrefixImpl
**Type**: Function

### getCommandSubcommandPrefixImpl
**Type**: Function

### CommandPrefixResult
**Type**: Type alias

### CommandSubcommandPrefixResult
**Type**: Type alias

### PrefixExtractorConfig
**Type**: Type alias

## Exports
- CommandPrefixResult
- CommandSubcommandPrefixResult
- PrefixExtractorConfig
- createCommandPrefixExtractor
- createSubcommandPrefixExtractor

## Source
`prefix`