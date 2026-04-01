# utils/plans

## Purpose
Provides plan file management utilities with slug generation.

## Imports
- **Stdlib**: `crypto`, `fs/promises`, `path`
- **External**: `lodash-es/memoize`
- **Internal**: types ids/logs/message, bootstrap state, ExitPlanModeTool, cwd, debug, envUtils, errors, filePersistence outputsScanner, fsOperations, log, settings settings, words

## Logic
1. `MAX_SLUG_RETRIES` (10) - max retries for unique slug
2. `getPlanSlug` - gets or generates word slug for session plan
3. Generated lazily on first access, cached for session
4. Retries up to 10 times to find unique slug
5. Checks if plan file with slug already exists
6. `setPlanSlug` - sets specific plan slug for session (resume)
7. `clearPlanSlug` - clears plan slug for session (/clear)
8. `clearAllPlanSlugs` - clears ALL plan slug entries
9. `getPlansDirectory` - memoized plans directory getter
10. Uses getInitialSettings for directory configuration
11. Creates directory if needed (memoized to avoid repeated mkdirSync)
12. `getPlanFilePath` - gets plan file path for slug
13. `getPlanFileContent` - gets plan file content
14. `savePlanFileContent` - saves plan file content
15. `copyPlanForResume` - copies plan for session resume
16. `getPlanSlugCache` - gets plan slug cache
17. `generateWordSlug` - generates word-based slug
18. `EXIT_PLAN_MODE_V2_TOOL_NAME` - exit plan mode tool name constant

## Exports
- `MAX_SLUG_RETRIES` - max slug retries constant
- `getPlanSlug` - gets/generates plan slug
- `setPlanSlug` - sets plan slug
- `clearPlanSlug` - clears plan slug
- `clearAllPlanSlugs` - clears all plan slugs
- `getPlansDirectory` - gets plans directory
- `getPlanFilePath` - gets plan file path
- `getPlanFileContent` - gets plan content
- `savePlanFileContent` - saves plan content
- `copyPlanForResume` - copies plan for resume
- `getPlanSlugCache` - gets plan slug cache
