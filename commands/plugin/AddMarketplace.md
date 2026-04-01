## Purpose
Add a new marketplace source via interactive input with validation.

## Imports
- **External**: React, TextInput component
- **Internal**: Marketplace manager, parseMarketplaceInput, analytics

## Logic
Renders a text input for marketplace source. Accepts formats:
- owner/repo (GitHub)
- git@github.com:owner/repo.git (SSH)  
- https://example.com/marketplace.json (URL)
- ./path/to/marketplace (local)

Validates input, processes the marketplace addition, saves to settings, and clears caches. Supports auto-add from pre-filled input. Shows progress/errors during operation.

## Exports
- `AddMarketplace` - Component handling marketplace addition flow
