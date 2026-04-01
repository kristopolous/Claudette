# utils/model/bedrock

## Purpose
Provides Bedrock inference profile utilities.

## Imports
- **Stdlib**: (none)
- **External**: `lodash-es/memoize`, `@aws-sdk/client-bedrock`, `@smithy/node-http-handler`, `@smithy/core`
- **Internal**: auth, envUtils, log, proxy

## Logic
1. `getBedrockInferenceProfiles` - memoized fetch of Bedrock inference profiles
2. Uses ListInferenceProfilesCommand with typeEquals='SYSTEM_DEFINED'
3. Paginates through all profiles with nextToken
4. Filters for Anthropic models (inferenceProfileId includes 'anthropic')
5. Returns array of inference profile IDs
6. `findFirstMatch` - finds first profile containing substring
7. Returns null if no match found
8. `createBedrockClient` - creates Bedrock client with proper configuration
9. Reads AWS_REGION or AWS_DEFAULT_REGION env vars (not AWS config files)
10. Falls back to 'us-east-1' if neither set
11. Supports ANTHROPIC_BEDROCK_BASE_URL for custom endpoint
12. Uses getAWSClientProxyConfig for proxy configuration
13. Supports CLAUDE_CODE_SKIP_BEDROCK_AUTH for no-auth mode
14. Uses NoAuthSigner when auth skipped

## Exports
- `getBedrockInferenceProfiles` - gets Bedrock inference profiles
- `findFirstMatch` - finds first matching profile
- `createBedrockClient` - creates Bedrock client
