# utils/aws

## Purpose
Provides AWS credential handling and STS validation utilities.

## Imports
- **Stdlib**: (none)
- **External**: `@aws-sdk/client-sts`, `@aws-sdk/credential-providers` (dynamic)
- **Internal**: debug

## Logic
1. `AwsCredentials` - AccessKeyId, SecretAccessKey, SessionToken, Expiration
2. `AwsStsOutput` - Credentials object from STS assume-role/get-session-token
3. `isAwsCredentialsProviderError` - checks for CredentialsProviderError name
4. `isValidAwsStsOutput` - validates AWS STS output structure
5. Checks Credentials object exists with required string fields
6. Validates AccessKeyId, SecretAccessKey, SessionToken are non-empty
7. `checkStsCallerIdentity` - throws if STS caller identity can't be retrieved
8. Uses STSClient and GetCallerIdentityCommand
9. `clearAwsIniCache` - clears AWS credential provider cache
10. Uses fromIni with ignoreCache: true to force refresh
11. Updates global file cache for ~/.aws/credentials changes
12. Ignores errors (expected if no credentials configured)
13. Logs debug info for cache operations

## Exports
- `AwsCredentials` - AWS credentials type
- `AwsStsOutput` - STS output type
- `isAwsCredentialsProviderError` - checks credentials provider error
- `isValidAwsStsOutput` - validates STS output
- `checkStsCallerIdentity` - checks STS caller identity
- `clearAwsIniCache` - clears AWS credential cache
