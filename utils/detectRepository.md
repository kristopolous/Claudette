# utils/detectRepository

## Purpose
Detects current git repository with host, owner, and name parsing.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: cwd, debug, git

## Logic
1. `ParsedRepository` - { host, owner, name }
2. `repositoryWithHostCache` - Map cache for repository detection
3. `clearRepositoryCaches` - clears repository cache
4. `detectCurrentRepository` - detects github.com repository
5. Returns null for non-github.com hosts (avoids breaking downstream consumers)
6. Uses detectCurrentRepositoryWithHost() for GHE support
7. `detectCurrentRepositoryWithHost` - detects repository with host
8. Caches result by cwd
9. Gets remote URL via getRemoteUrl()
10. Parses via parseGitRemote()
11. `getCachedRepository` - gets cached github.com repository
12. Returns "owner/name" format or null if not github.com
13. `parseGitRemote` - parses git remote URL
14. Supports: https://host/owner/repo.git, git@host:owner/repo.git
15. Handles SSH, HTTPS, git:// protocols
16. Extracts host, owner, name components

## Exports
- `ParsedRepository` - parsed repository type
- `clearRepositoryCaches` - clears caches
- `detectCurrentRepository` - detects github.com repository
- `detectCurrentRepositoryWithHost` - detects with host
- `getCachedRepository` - gets cached repository
- `parseGitRemote` - parses git remote URL
