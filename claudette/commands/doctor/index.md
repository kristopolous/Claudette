## Purpose
Registers the doctor command metadata with disable flag.

## Imports
- **Internal**: `Command` type, `isEnvTruthy`

## Logic
Defines a 'local-jsx' command named 'doctor' with description "Diagnose and verify your Claudette installation and settings". Enabled unless `DISABLE_DOCTOR_COMMAND` environment variable is truthy. Lazy loads './doctor.js'.

## Exports
- `default` - The doctor command object
