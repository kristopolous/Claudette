# services/teamMemorySync/secretScanner

## Purpose
Client-side secret scanner for team memory that prevents credentials from leaving user's machine.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: stringUtils

## Logic
1. Uses curated subset of gitleaks rules (MIT license)
2. Only high-confidence rules with distinctive prefixes, near-zero false positives
3. Go regex rewritten for JS: (?i) → character classes, mode groups removed
4. `SecretRule` - id (gitleaks rule ID), source (regex), flags
5. `SecretMatch` - ruleId, label (human-readable)
6. `ANT_KEY_PFX` - assembled at runtime (sk-ant-api) to avoid bundle exclusion
7. SECRET_RULES array ordered by likelihood in dev content:
   - Cloud: aws-access-token, gcp-api-key, azure-ad-client-secret, digitalocean-pat/access-token
   - AI APIs: anthropic-api-key, anthropic-admin-api-key
8. Regex patterns use word boundaries (\b) and trailing delimiters
9. Capitalize function for human-readable labels
10. Scans content before upload, blocks secrets from sync

## Exports
- `SecretRule` - secret rule type
- `SecretMatch` - secret match type
- `SECRET_RULES` - curated rules array
- `ANT_KEY_PFX` - Anthropic key prefix constant
- (Secret scanning functions)
