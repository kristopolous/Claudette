## Purpose
Sets up verifier programs (like linters, type checkers, test runners) for automatic code validation.

## Imports
- **Internal**: `Command` type, task framework, prompt execution utils

## Logic
Interactive 'local-jsx' command that discovers available verifiers in the project (e.g., eslint, typecheck, test), configures them as post-edit hooks, and sets up automatic running in non-interactive mode. Guides user through selection and configuration of verifiers with React Ink UI.

## Exports
- `default` - Command object (type: 'local-jsx') for init-verifiers
