# utils/context

## Purpose
Provides context window size configuration and model capability detection.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: betas constants, config, envUtils, model model/modelCapabilities

## Logic
1. `MODEL_CONTEXT_WINDOW_DEFAULT` (200k) - default context window
2. `COMPACT_MAX_OUTPUT_TOKENS` (20k) - max output for compact
3. `MAX_OUTPUT_TOKENS_DEFAULT` (32k), `MAX_OUTPUT_TOKENS_UPPER_LIMIT` (64k)
4. `CAPPED_DEFAULT_MAX_TOKENS` (8k) - capped default for slot reservation
5. `ESCALATED_MAX_TOKENS` (64k) - retry limit
6. `is1mContextDisabled` - checks CLAUDE_CODE_DISABLE_1M_CONTEXT env
7. `has1mContext` - checks for [1m] suffix in model name
8. `modelSupports1M` - checks if model supports 1M context (sonnet-4, opus-4-6)
9. `getContextWindowForModel` - gets context window for model
10. Respects CLAUDE_CODE_MAX_CONTEXT_TOKENS env override (ant-only)
11. Checks [1m] suffix for explicit opt-in
12. Falls back to model capability detection
13. Applies HIPAA compliance check (is1mContextDisabled)
14. `getSonnet1mExpTreatmentEnabled` - checks 1M experiment treatment
15. `getModelMaxOutputTokens` - gets max output tokens for model

## Exports
- `MODEL_CONTEXT_WINDOW_DEFAULT` - default context window
- `COMPACT_MAX_OUTPUT_TOKENS` - compact max output
- `CAPPED_DEFAULT_MAX_TOKENS` - capped default
- `ESCALATED_MAX_TOKENS` - escalated max
- `is1mContextDisabled` - checks 1M context disabled
- `has1mContext` - checks 1M context suffix
- `modelSupports1M` - checks model 1M support
- `getContextWindowForModel` - gets context window
- `getSonnet1mExpTreatmentEnabled` - checks 1M experiment
- `getModelMaxOutputTokens` - gets max output tokens
