## Purpose
Displays a list of recent sandbox-blocked operations with timestamps and commands.

## Imports
- **Stdlib**: Date
- **External**: react (React, ReactNode, useEffect, useState)
- **Internal**: ../ink.js (Box, Text), ../utils/sandbox/sandbox-adapter.js (SandboxViolationEvent, SandboxManager), src/utils/platform.js (getPlatform)

## Logic
Subscribes to the SandboxManager violation store to track sandbox violations, keeping the last 10 entries and a total count. Renders nothing if sandboxing is disabled or on Linux. Each violation entry displays the formatted timestamp, command name, and violation line.

## Exports
- `SandboxViolationExpandedView` - renders a summary of sandbox-blocked operations with recent violation details
