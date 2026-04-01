# utils/model/configs

## Purpose
Provides model configuration constants for different providers.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: model types, model providers

## Logic
1. `ModelConfig` - Record<APIProvider, ModelName>
2. `CLAUDE_3_7_SONNET_CONFIG` - 3.7 Sonnet config for all providers
3. `CLAUDE_3_5_V2_SONNET_CONFIG` - 3.5 V2 Sonnet config
4. `CLAUDE_3_5_HAIKU_CONFIG` - 3.5 Haiku config
5. `CLAUDE_HAIKU_4_5_CONFIG` - Haiku 4.5 config
6. `CLAUDE_SONNET_4_CONFIG` - Sonnet 4 config
7. `CLAUDE_SONNET_4_5_CONFIG` - Sonnet 4.5 config
8. `CLAUDE_SONNET_4_6_CONFIG` - Sonnet 4.6 config
9. `CLAUDE_OPUS_4_CONFIG` - Opus 4 config
10. `CLAUDE_OPUS_4_1_CONFIG` - Opus 4.1 config
11. `CLAUDE_OPUS_4_5_CONFIG` - Opus 4.5 config
12. `CLAUDE_OPUS_4_6_CONFIG` - Opus 4.6 config
13. Each config has: firstParty, bedrock, vertex, foundry provider strings
14. Bedrock uses inference profile format (us.anthropic.*)
15. Vertex uses @date format
16. Foundry uses simple name format

## Exports
- `ModelConfig` - model config type
- `CLAUDE_3_7_SONNET_CONFIG` - 3.7 Sonnet config
- `CLAUDE_3_5_V2_SONNET_CONFIG` - 3.5 V2 Sonnet config
- `CLAUDE_3_5_HAIKU_CONFIG` - 3.5 Haiku config
- `CLAUDE_HAIKU_4_5_CONFIG` - Haiku 4.5 config
- `CLAUDE_SONNET_4_CONFIG` - Sonnet 4 config
- `CLAUDE_SONNET_4_5_CONFIG` - Sonnet 4.5 config
- `CLAUDE_SONNET_4_6_CONFIG` - Sonnet 4.6 config
- `CLAUDE_OPUS_4_CONFIG` - Opus 4 config
- `CLAUDE_OPUS_4_1_CONFIG` - Opus 4.1 config
- `CLAUDE_OPUS_4_5_CONFIG` - Opus 4.5 config
- `CLAUDE_OPUS_4_6_CONFIG` - Opus 4.6 config
