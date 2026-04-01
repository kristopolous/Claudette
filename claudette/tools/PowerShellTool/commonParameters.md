## Purpose
Defines the set of PowerShell Common Parameters that are available on all cmdlets, used for validating allowed parameters in PowerShellTool.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Exports three constants:
- `COMMON_SWITCHES`: boolean switches like `-Verbose`, `-Debug`
- `COMMON_VALUE_PARAMS`: parameters that accept values (e.g., `-ErrorAction`, `-OutVariable`)
- `COMMON_PARAMETERS`: ReadonlySet containing all common parameters (lowercase with leading dash)
These are used by other validation modules to allow or reject arguments. Stored lowercase with dashes to simplify case-insensitive matching.

## Exports
- `COMMON_SWITCHES` - array of common switch parameters
- `COMMON_VALUE_PARAMS` - array of common value-accepting parameters
- `COMMON_PARAMETERS` - Set of all common parameter names
