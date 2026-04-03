## Purpose
Manages API key verification status with lazy initialization, distinguishing between subscribers, missing keys, and invalid keys.

## Imports
- **External**: REACT (useCallback, useState)
- **Internal**:
  - `./bootstrap/state` (getIsNonInteractiveSession)
  - `./services/api/claude` (verifyApiKey)
  - `./utils/auth` (getAnthropicApiKeyWithSource, getApiKeyFromApiKeyHelper, isAnthropicAuthEnabled, isClaudeAISubscriber)

## Logic
1. Initial state computed on mount:
   - If subscriber OR Anthropic auth enabled → `valid` (skips verification)
   - Otherwise: checks for API key presence
     - If key present or apiKeyHelper configured → `loading` (verification pending)
     - No key → `missing`
2. `reverify()` async function:
   - Fast-path: if subscriber/auth enabled, sets `valid` and returns
   - Warms apiKeyHelper cache if non-interactive
   - Retrieves API key from all sources
   - If no key: sets `missing` (or `error` if apiKeyHelper failed)
   - If key found: calls verifyApiKey(), sets `valid` or `invalid` accordingly
   - On API error: sets `error` with caught exception
3. State updates trigger re-renders; error persists until next reverify

## Exports
- `useApiKeyVerification` - Hook returning `{ status: VerificationStatus, reverify: () => Promise<void>, error: Error | null }`
- `VerificationStatus` - Union type: 'loading' | 'valid' | 'invalid' | 'missing' | 'error'
- `ApiKeyVerificationResult` - Interface for the hook return value
