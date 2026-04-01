# services/internalLogging

## Purpose
Provides internal logging utilities for ant-only Kubernetes/container environment tracking.

## Imports
- **Stdlib**: `fs/promises`
- **External**: `lodash-es/memoize`
- **Internal**: Tool, JSON utils, analytics

## Logic
1. `getKubernetesNamespace` - memoized async function getting K8s namespace
2. Returns null for non-ant users
3. Reads from /var/run/secrets/kubernetes.io/serviceaccount/namespace
4. Returns 'namespace not found' on error
5. `getContainerId` - memoized async function getting OCI container ID
6. Reads from /proc/self/mountinfo
7. Matches Docker (/docker/containers/) and containerd/CRI-O (/sandboxes/) patterns
8. Returns 64-char hex container ID or 'container ID not found' variants
9. `logPermissionContextForAnts` - logs event with namespace and tool permission context
10. Only runs for ant users (USER_TYPE === 'ant')
11. Logs moment (summary or initialization) for tracking
12. Includes tool permission context for debugging permission decisions

## Exports
- `getKubernetesNamespace` - memoized function getting K8s namespace
- `getContainerId` - memoized function getting OCI container ID
- `logPermissionContextForAnts` - logs permission context for internal tracking
