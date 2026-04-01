## Purpose
Provides lazy-loaded command metadata for the `doctor` command with enable/disable control.

## Imports
- **Internal**: Command type, implementation from doctor.js, envUtils (isEnvTruthy)

## Logic
1. Command with type 'local-jsx'
2. Name: 'doctor', description: 'Diagnose and verify your Claude Code installation and settings'
3. `isEnabled` returns false if DISABLE_DOCTOR_COMMAND env var is truthy
4. Lazy loads implementation via `load: () => import('./doctor.js')`
5. Renders Doctor diagnostic screen
6. Maximum check: introspect environment, detect problems

## Exports
- `default` - Command object with conditional enable
