# internalLogging

## Purpose
Provides internal logging utilities for ant-only Kubernetes/container environment tracking.

## Imports
- **Stdlib**: `fs/promises`
- **External**: `lodash-es/memoize`
- **Internal**: Tool types, JSON utils, analytics

## Logic
1. `getKubernetesNamespace` - memoized async function reading from /var/run/secrets/kubernetes.io/serviceaccount/namespace
2. Returns null for non-ant users, "namespace not found" on error
3. `getContainerId` - memoized async function parsing /proc/self/mountinfo
4. Matches both Docker (/docker/containers/) and containerd/CRI-O (/sandboxes/) patterns
5. Returns 64-char hex container ID or "container ID not found" variants
6. `logPermissionContextForAnts` - logs event with namespace and tool permission context
7. Only runs for ant users (USER_TYPE === 'ant')
8. Logs moment (summary or initialization) for tracking
9. Includes tool permission context for debugging permission decisions

## Exports
- `getKubernetesNamespace` - memoized function getting K8s namespace
- `getContainerId` - memoized function getting OCI container ID
- `logPermissionContextForAnts` - logs permission context for internal tracking
