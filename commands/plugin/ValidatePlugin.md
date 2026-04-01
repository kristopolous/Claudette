## Purpose
Validate a plugin manifest or marketplace file/directory.

## Imports
- **External**: React, figures
- **Internal**: Validation utility, error logging

## Logic
Runs validation using validateManifest on provided path. Shows:
- Validation progress
- Errors with file paths and messages
- Warnings (non-blocking issues)
- Result summary (passed/failed)

Sets process.exitCode appropriately (0=success, 1=failed, 2=error). Useful for CI/CD or debugging plugin development.

## Exports
- `ValidatePlugin` - Component that executes and displays validation results
