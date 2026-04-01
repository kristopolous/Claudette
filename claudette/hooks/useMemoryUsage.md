## Purpose
Monitors Node.js process heap memory usage and reports when it exceeds high or critical thresholds, enabling UI to warn users about resource consumption.

## Imports
- **Stdlib**: None
- **External**: `usehooks-ts` (`useInterval`), `react` (`useState`)
- **Internal**: None

## Logic
The hook polls `process.memoryUsage().heapUsed` every 10 seconds. It classifies usage into three statuses:
- `normal` (<1.5GB) — returns `null` to avoid unnecessary re-renders
- `high` (≥1.5GB and <2.5GB)
- `critical` (≥2.5GB)

When status is `high` or `critical`, it returns an object with `heapUsed` (bytes) and `status`. The state update logic bails to `null` when status becomes `normal` again, but keeps the previous non-null value until then. This minimizes renders for the vast majority of users who never exceed the threshold.

## Exports
- `useMemoryUsage` - hook returning `{ heapUsed, status } | null`
- `MemoryUsageStatus` - union type `'normal' | 'high' | 'critical'`
- `MemoryUsageInfo` - object type `{ heapUsed: number; status: MemoryUsageStatus }`
