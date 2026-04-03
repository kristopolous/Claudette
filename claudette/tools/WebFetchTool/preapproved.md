# WebFetchTool/preapproved

## Purpose

Defines the list of preapproved domains allowed for WebFetch without requiring explicit user approval each time. Supports hostname-only entries and path-scoped entries (e.g., `github.com/anthropics`). Provides function to check if a given hostname+path is preapproved. Security-critical: these exceptions apply only to GET requests via WebFetch, not to sandbox network restrictions.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic

- `PREAPPROVED_HOSTS`: Set of 80+ strings, each either:
  - Hostname only (e.g., `'github.com'`, `'react.dev' (URL hostname)`)
  - Hostname + path prefix (e.g., `'github.com/anthropics'`) requiring exact match or subpath
- Categories include: Anthropic services, programming language docs, web frameworks, Python libs, PHP, Java, .NET, mobile, data science, databases, cloud/devops, testing, game dev, tools
- **SECURITY WARNING**: Only for WebFetch GET; sandbox network restrictions do NOT inherit this list because some domains (Hugging Face, Kaggle, NuGet) allow uploads which could exfiltrate data
- Compile-time split into two maps for O(1) lookup:
  - `HOSTNAME_ONLY`: Set of hostnames with no path restrictions
  - `PATH_PREFIXES`: Map from hostname → array of path prefixes
- `isPreapprovedHost(hostname, pathname): boolean`:
  - Returns true if hostname in `HOSTNAME_ONLY`
  - If hostname in `PATH_PREFIXES`, checks each prefix: exact match or `pathname.startsWith(prefix + '/')` (enforces segment boundary to avoid `"/foo"` matching `"/foo-evil"`)
  - Otherwise false

## Exports

- `PREAPPROVED_HOSTS: Set<string>` (readonly)
- `isPreapprovedHost(hostname: string, pathname: string): boolean`
