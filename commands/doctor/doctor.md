## Purpose
Diagnose and verify Claude Code installation and settings with comprehensive checks.

## Imports
- **Internal**: Doctor screen component, LocalJSXCommandCall type

## Logic
1. Local-jsx command that renders the Doctor screen
2. Doctor performs comprehensive diagnostics:
   - Checks installation integrity
   - Verifies configuration settings
   - Tests connectivity (auth, APIs)
   - Reports any issues found
3. Simple wrapper: call returns `<Doctor onDone={onDone} />` as promise
4. Provides users with troubleshooting and verification of their setup
5. Disabled by setting DISABLE_DOCTOR_COMMAND environment variable

## Exports
- `call` - async LocalJSXCommandCall returning Doctor React component
- `doctor` - Command object with isEnabled check
