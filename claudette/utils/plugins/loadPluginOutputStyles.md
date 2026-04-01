# utils/plugins/loadPluginOutputStyles

## Purpose
Provides plugin output style loading utilities from markdown files.

## Imports
- **Stdlib**: `path`
- **External**: `lodash-es/memoize`
- **Internal**: constants outputStyles, plugin types, debug, frontmatterParser, fsOperations, markdownConfigLoader, pluginLoader, walkPluginMarkdown

## Logic
1. `loadOutputStylesFromDirectory` - loads output styles from directory
2. Walks plugin markdown files in output-styles directory
3. Calls loadOutputStyleFromFile for each style file
4. `loadOutputStyleFromFile` - loads single output style from file
5. Checks for duplicate paths via isDuplicatePath
6. Parses frontmatter and markdown content
7. Namespaces output styles with plugin name (pluginName:baseStyleName)
8. Parses force-for-plugin flag (boolean or string 'true'/'false')
9. Returns OutputStyleConfig with name, description, prompt, source, forceForPlugin
10. `loadPluginOutputStyles` - loads all plugin output styles
11. Loads from all enabled plugins
12. `clearPluginOutputStyleCache` - clears output style cache
13. `coerceDescriptionToString` - coerces description to string
14. `parseFrontmatter` - parses frontmatter
15. `extractDescriptionFromMarkdown` - extracts description from markdown
16. `getPluginErrorMessage` - gets plugin error message

## Exports
- `loadOutputStylesFromDirectory` - loads styles from directory
- `loadOutputStyleFromFile` - loads style from file
- `loadPluginOutputStyles` - loads all plugin styles
- `clearPluginOutputStyleCache` - clears style cache
- (Output style loading functions)
