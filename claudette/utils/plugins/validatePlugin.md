# validatePlugin

## Purpose
Validates plugin manifests (plugin.json, marketplace.json), component files (skills/agents/commands), and hooks.json. Used by `claude plugin validate` developer tool.

## Imports
- **Stdlib**: fs, fs/promises, path
- **External**: zod/v4
- **Internal**: ../errors, ../frontmatterParser, ../slowOperations, ../yaml, ./schemas

## Logic
1. `validatePluginManifest()` validates plugin.json against PluginManifestSchema with strict mode. Checks path traversal in commands/agents/skills arrays, strips marketplace-only fields (category, source, tags, strict, id) as warnings, and warns about non-kebab-case names, missing version/description/author.
2. `validateMarketplaceManifest()` validates marketplace.json against a strict version of PluginMarketplaceSchema. Checks path traversal in plugin sources (with marketplaceSourceHint for common '..' misunderstanding), detects duplicate plugin names, compares entry versions against plugin.json manifest versions, warns about empty plugins/description.
3. `validateComponentFile()` validates YAML frontmatter in skill/agent/command .md files. Checks description (must be scalar), name (must be string), allowed-tools (string or string array), shell ('bash' or 'powershell'). Re-parses frontmatter to surface what the runtime loader silently drops.
4. `validateHooksJson()` validates hooks.json against PluginHooksSchema. Hard-errors at runtime so validation is essential. ENOENT is fine (hooks are optional).
5. `validatePluginContents()` scans default component directories (skills/, agents/, commands/, hooks/hooks.json), collects .md files (SKILL.md only for skills, all .md for agents/commands), validates each.
6. `validateManifest()` auto-detects type by filename or directory structure. For directories, prefers marketplace.json over plugin.json. For unknown files, uses heuristic (has "plugins" array → marketplace).

## Exports
- `ValidationResult` - Type: `{ success, errors: ValidationError[], warnings: ValidationWarning[], filePath, fileType }`
- `ValidationError` - Type: `{ path, message, code? }`
- `ValidationWarning` - Type: `{ path, message }`
- `validatePluginManifest` - Validates a plugin.json file, returns ValidationResult
- `validateMarketplaceManifest` - Validates a marketplace.json file, returns ValidationResult
- `validatePluginContents` - Validates all component files in a plugin directory, returns ValidationResult[]
- `validateManifest` - Auto-detects manifest type and validates, returns ValidationResult

## Source
`validatePlugin`
