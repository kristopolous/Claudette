## Purpose
Create verifier skills for automated verification of code changes using various methods (Playwright, Tmux, HTTP).

## Imports
- **Internal**: Command type only (this is a pure prompt command)

## Logic
1. Command type: 'prompt' with extensive multi-phase instructions
2. Phase 1: Auto-detection
   - Scan project structure for distinct areas (frontend, backend, CLI)
   - Detect languages, frameworks, package managers
   - Identify existing test/E2E tools (Playwright, Cypress, etc.)
   - Determine dev server configuration
3. Phase 2: Verification tool setup guidance
   - Web apps: Playwright installation, MCP servers, Chrome extension options
   - CLI tools: asciinema, tmux availability
   - API services: curl/httpie usage
4. Phase 3: Interactive Q&A
   - Determine verifier name (format: verifier-<project>-<type>)
   - Gather project-specific config (dev server, URL, ready signal)
   - Handle authentication scenarios (login, credentials, post-login indicators)
5. Phase 4: Generate verifier skill structure
   - Template with Project Context, Setup Instructions, Authentication, Reporting, Cleanup, Self-Update
   - Allowed tools by type (Playwright, Tmux, HTTP)
   - Write to `.claude/skills/<verifier-name>/SKILL.md`
6. Phase 5: Confirm creation and explain usage
7. Comprehensive guide for setting up automated verification workflows

## Exports
- `command` - prompt Command with detailed multi-step instructions
