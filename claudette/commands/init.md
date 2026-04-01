## Purpose
Initializes a Claude project directory with configuration files and project structure.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **Internal**: `Command` type, utilities for paths, git, logs, task framework, and many others

## Logic
Interactive 'local-jsx' command that walks users through project initialization: setting project name, description, CLAUDE.md instructions, allowed tools, rules, skill creation, and git integration. Uses React Ink UI components. Handles both new project creation and re-initialization. Saves configuration to .claude/ directory with settings.json, CLAUDE.md, and optional skills.

## Exports
- `default` - Command object (type: 'local-jsx') with `load`, `call`, and `supportsNonInteractive`
- `CLAUDE_MD_TEMPLATE` - Default CLAUDE.md template string
- Many internal helper functions for the multi-step wizard
