## Purpose
Registers both interactive and non-interactive /extra-usage commands.

## Imports
- **External**: Command type
- **Internal**: Feature flags, auth utils, env utils

## Logic
Exports two command variants:
- `extraUsage` (local-jsx): Available when extra usage allowed and NOT in non-interactive session. Shows UI.
- `extraUsageNonInteractive` (local): Available when extra usage allowed AND in non-interactive session. Returns text.

Both gate on isOverageProvisioningAllowed() and DISABLE_EXTRA_USAGE_COMMAND env var.

## Exports
- `extraUsage` - Interactive command
- `extraUsageNonInteractive` - Non-interactive command
