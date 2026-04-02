# yaml

## Purpose
YAML parsing wrapper that uses Bun.YAML (built-in, zero-cost) when running under Bun, otherwise falls back to the `yaml` npm package. The package is lazy-required inside the non-Bun branch so native Bun builds never load the ~270KB yaml parser.

## Imports
- **Stdlib**: (none)
- **External**: `yaml` (lazy-required via require, only in non-Bun runtime)
- **Internal**: (none)

## Logic
1. Checks if `Bun` global is defined
2. If Bun: uses `Bun.YAML.parse(input)` directly
3. If not Bun: lazy-requires the `yaml` npm package and calls `.parse(input)`

## Exports
- `parseYaml(input: string): unknown` - parses a YAML string, using Bun.YAML or the yaml npm package depending on runtime

## Source
`yaml`