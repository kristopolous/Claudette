# semanticBoolean

## Purpose
Zod schema factory that accepts boolean values or the string literals "true"/"false", solving the problem where LLM-generated JSON occasionally quotes booleans.

## Imports
- **External**: `zod/v4`

## Logic
1. Model-generated tool inputs sometimes produce `"replace_all":"false"` instead of `"replace_all":false`
2. `z.coerce.boolean()` is incorrect because JS truthiness makes `"false"` → true
3. `z.preprocess()` normalizes `"true"`/`"false"` strings to actual booleans before validation
4. The API schema still sees `{"type":"boolean"}` — string tolerance is invisible to the model
5. `.optional()`/`.default()` must go on the inner schema, not chained after, to avoid widening `z.output<>` to unknown in Zod v4

## Exports
- `semanticBoolean(inner?)` - returns a `z.preprocess` schema that coerces "true"/"false" strings to booleans, then validates against the inner schema (defaults to `z.boolean()`). Usage: `semanticBoolean()` → boolean, `semanticBoolean(z.boolean().optional())` → boolean | undefined, `semanticBoolean(z.boolean().default(false))` → boolean