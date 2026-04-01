## Purpose
Defines the allowlist of .NET types safe for PowerShell Constrained Language Mode (CLM) and provides validation functions to check if a type is allowed.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Exports `CLM_ALLOWED_TYPES`, a ReadonlySet containing lowercase type names (both short accelerators and full qualified names) that Microsoft's CLM permits. The set intentionally excludes dangerous types like ADSI, WMI, and CIM session types that can perform network operations or access sensitive APIs. `normalizeTypeName` strips array suffixes and generic brackets, converting to lowercase for canonical lookup. `isClmAllowedType` returns true if a normalized type name exists in the allowlist.

## Exports
- `CLM_ALLOWED_TYPES` - ReadonlySet of allowed type names (lowercase)
- `normalizeTypeName(name)` - Normalizes type name by stripping arrays/generics and lowercasing
- `isClmAllowedType(typeName)` - Checks if a type is in the CLM allowlist
