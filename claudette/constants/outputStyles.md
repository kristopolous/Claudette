## Purpose
Manages output style configurations that modify the agent's response behavior, including built-in explanatory and learning modes plus custom and plugin styles.

## Imports
- **Stdlib**: none
- **External**: `figures`, `lodash-es/memoize`
- **Internal**: `outputStyles/loadOutputStylesDir`, `utils/config`, `utils/cwd`, `utils/debug`, `utils/plugins/loadPluginOutputStyles`, `utils/settings/constants`, `utils/settings/settings`

## Logic
Defines built-in output style configurations (default, Explanatory, Learning) with prompts that instruct the agent on how to respond. Loads additional styles from a directory and plugins, merges them in priority order, and resolves the active style based on settings or forced plugin requirements.

## Exports
- `OutputStyleConfig` - type defining an output style's name, description, prompt, and source
- `OutputStyles` - type mapping output style names to their configurations
- `DEFAULT_OUTPUT_STYLE_NAME` - constant for the default style name
- `OUTPUT_STYLE_CONFIG` - built-in output style configurations
- `getAllOutputStyles` - memoized function returning all available output styles merged from built-in, plugin, user, project, and managed sources
- `clearAllOutputStylesCache` - clears the memoized output styles cache
- `getOutputStyleConfig` - returns the active output style configuration respecting forced plugin styles and user settings
- `hasCustomOutputStyle` - checks if a non-default output style is configured
