# controlMessageCompat

## Purpose
Normalizes camelCase `requestId` to snake_case `request_id` on incoming control messages (control_request, control_response) for compatibility with older iOS app builds that send the wrong key format due to a missing Swift CodingKeys mapping.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
1. Checks if the input object has `requestId` but not `request_id` — if so, copies the value to `request_id` and deletes `requestId`
2. Recursively handles the nested `response.requestId` → `response.request_id` the same way
3. If both `request_id` and `requestId` are present, snake_case wins (no mutation)
4. Mutates the object in place; returns the same object
5. Without this shim, `isSDKControlRequest` in replBridge.ts rejects the message (it checks `'request_id' in value`), and structuredIO.ts reads `message.response.request_id` as undefined

## Exports
- `normalizeControlMessageKeys(obj: unknown): unknown` - normalizes key naming on control message objects in place
- No type exports
