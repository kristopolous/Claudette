# outputLimits

## Purpose
Provides configurable maximum output length for shell command output, controlled via BASH_MAX_OUTPUT_LENGTH env var.

## Logic
1. Reads BASH_MAX_OUTPUT_LENGTH env var and validates it as a bounded integer
2. Defaults to 30,000 if unset or invalid, caps at 150,000 maximum
3. Uses validateBoundedIntEnvVar which returns { effective, source } — only effective is used

## Exports
- `BASH_MAX_OUTPUT_UPPER_LIMIT` — constant 150000, the hard cap
- `BASH_MAX_OUTPUT_DEFAULT` — constant 30000, the default value
- `getMaxOutputLength(): number` — returns the effective max output length from env var or default

## Source
`outputLimits`