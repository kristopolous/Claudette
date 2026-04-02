# environmentSelection

## Purpose
Determines which remote environment to use by fetching available environments and resolving the selected one from settings (with source tracking).

## Imports
- **Internal**: ../settings/constants, ../settings/settings, ./environments

## Logic
1. Fetches all available environments via `fetchEnvironments()`.
2. If no environments exist, returns null selections.
3. Reads merged settings to get `remote.defaultEnvironmentId`.
4. Default selection: first non-bridge environment, or first environment if all are bridge.
5. If a `defaultEnvironmentId` is set and matches an environment, uses that environment and determines which setting source (user, project, etc.) configured it by iterating sources from highest to lowest priority.
6. Returns `EnvironmentSelectionInfo` with available environments, the selected environment, and the source that configured it (or null if using default).

## Exports
- `EnvironmentSelectionInfo` - type with `availableEnvironments`, `selectedEnvironment`, and `selectedEnvironmentSource` fields
- `getEnvironmentSelectionInfo()` - async function that returns environment selection info including which settings source configured the selection

## Source
`environmentSelection`
