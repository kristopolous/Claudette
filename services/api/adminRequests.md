# services/api/adminRequests

## Purpose
Manages admin requests for limit increases and seat upgrades in Team/Enterprise orgs.

## Imports
- **Stdlib**: (none)
- **External**: `axios`
- **Internal**: oauth constants, teleport API utils

## Logic
1. `AdminRequestType` - limit_increase, seat_upgrade
2. `AdminRequestStatus` - pending, approved, dismissed
3. `AdminRequestSeatUpgradeDetails` - message, current_seat_tier
4. `AdminRequestCreateParams` - discriminated union by request_type
5. `AdminRequest` - uuid, status, requester_uuid, created_at, request_type, details
6. `createAdminRequest` - creates admin request for non-billing users
7. Returns existing pending request if same type exists
8. POSTs to /api/oauth/organizations/{orgUUID}/admin_requests
9. Includes OAuth headers and org UUID
10. `getMyAdminRequests` - gets pending requests by type and statuses
11. Filters by requestType and statuses array
12. Returns array of matching requests or null

## Exports
- `AdminRequestType` - admin request type
- `AdminRequestStatus` - request status type
- `AdminRequestSeatUpgradeDetails` - seat upgrade details type
- `AdminRequestCreateParams` - create params type
- `AdminRequest` - admin request type
- `createAdminRequest` - creates admin request
- `getMyAdminRequests` - gets user's admin requests
