# semanticNumber

## Purpose
Creates a Zod schema that accepts both numbers and numeric string literals (e.g. `"30"`, `"-5"`, `"3.14"`). Solves the problem of models occasionally quoting numbers in JSON tool inputs.

## Imports
- **External**: `zod/v4` — `z`

## Logic
1. Uses `z.preprocess` to intercept input before the inner schema validates.
2. If input is a string matching `/^-?\d+(\.\d+)?$/`, converts to `Number` and returns it if finite.
3. Otherwise passes through unchanged to the inner schema.
4. Emits `{"type":"number"}` to the API schema, so the model is still told this is a number — string tolerance is invisible client-side coercion.
5. `.optional()` / `.default()` must go INSIDE (on the inner schema), not chained after, to avoid widening `z.output<>` to `unknown` in Zod v4.

## Exports
- `semanticNumber<T extends z.ZodType>(inner?: T)` — returns a preprocessed Zod schema. Defaults to `z.number()`. Examples:
  - `semanticNumber()` → `number`
  - `semanticNumber(z.number().optional())` → `number | undefined`
  - `semanticNumber(z.number().default(0))` → `number`

## Source
`semanticNumber`
