# utils/awsAuthStatusManager

## Purpose
Singleton manager for cloud-provider authentication status (AWS Bedrock, GCP Vertex).

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: signal

## Logic
1. `AwsAuthStatus` - isAuthenticating, output array, optional error
2. Provider-agnostic status shape for SDK 'auth_status' message
3. Legacy name: originally AWS-only, now serves all cloud auth refresh flows
4. Singleton pattern via getInstance()
5. `status` - internal state with isAuthenticating flag and output lines
6. `changed` - signal for status change notifications
7. `getStatus` - returns copy of current status with copied output array
8. `startAuthentication` - sets isAuthenticating=true, clears output
9. `addOutput` - appends output line, emits status change
10. `setError` - sets error field, emits status change
11. `endAuthentication` - ends authentication
12. On success: clears status completely
13. On failure: keeps output visible, sets isAuthenticating=false
14. `subscribe` - subscribes to status changes
15. `reset` - static method for testing cleanup

## Exports
- `AwsAuthStatus` - auth status type
- `AwsAuthStatusManager` - singleton manager class
