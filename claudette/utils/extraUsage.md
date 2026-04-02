# extraUsage

## Purpose
Determines whether a model invocation should be billed as extra usage based on subscription status, mode, and model type.

## Imports
- **Internal**: ./auth (isClaudeAISubscriber), ./context (has1mContext)

## Logic
1. Non-Claude AI subscribers are never billed as extra usage (return false)
2. Fast mode is always billed as extra usage (return true)
3. Models without 1M context support are not billed as extra usage (return false)
4. Strips `[1m]` suffix from model name, then checks if it matches opus-4-6 or sonnet-4-6 variants
5. Opus with merged 1M context is exempt from extra usage billing
6. Returns true only for opus-4-6 or sonnet-4-6 models (after all checks)

## Exports
- `isBilledAsExtraUsage(model, isFastMode, isOpus1mMerged)` - Returns true if the given model/mode combination should be billed as extra usage. Takes model name (string|null), fast mode flag, and opus 1M merged flag.

## Source
`extraUsage`
