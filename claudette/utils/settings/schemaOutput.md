# schemaOutput

## Purpose
Generates a JSON Schema representation of the settings schema for documentation or external tool consumption.

## Imports
- **Stdlib**: `zod/v4` (toJSONSchema)
- **External**: (none)
- **Internal**: `../slowOperations` (jsonStringify), `./types` (SettingsSchema)

## Logic
Calls `toJSONSchema(SettingsSchema())` with `unrepresentable: 'any'` to handle any Zod constructs that don't map cleanly to JSON Schema, then serializes the result with 2-space indentation via `jsonStringify`.

## Exports
- `generateSettingsJSONSchema()` — returns a JSON string of the settings schema in JSON Schema format
