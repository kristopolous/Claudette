# utils/plugins/dependencyResolver

## Purpose
Provides plugin dependency resolution with apt-style presence guarantee semantics.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: types plugin, settings constants/settings, pluginIdentifier, schemas

## Logic
1. `INLINE_MARKETPLACE` - 'inline' sentinel for --plugin-dir plugins
2. `qualifyDependency` - normalizes dependency to "name@marketplace" form
3. Bare names inherit marketplace of declaring plugin
4. Cross-marketplace deps blocked anyway, so @-suffix is boilerplate
5. EXCEPTION: @inline plugins return bare deps unchanged (synthetic sentinel)
6. `DependencyLookupResult` - { dependencies?: string[] }
7. `ResolutionResult` - union of ok/cycle/not-found/cross-marketplace
8. `resolveDependencyClosure` - install-time DFS walk with cycle detection
9. Returns closure containing rootId plus all transitive deps
10. Skips already-enabled deps (avoids surprise settings writes)
11. Root never skipped even if enabled (re-installing re-caches)
12. Cross-marketplace deps BLOCKED by default (security boundary)
13. `verifyAndDemote` - load-time fixed-point check
14. Demotes plugins with unsatisfied deps (session-local, no settings write)
15. Handles bare deps via name-only matching for @inline plugins

## Exports
- `INLINE_MARKETPLACE` - inline marketplace sentinel
- `qualifyDependency` - normalizes dependency reference
- `DependencyLookupResult` - lookup result type
- `ResolutionResult` - resolution result type
- `resolveDependencyClosure` - resolves dependency closure
- `verifyAndDemote` - verifies and demotes plugins
