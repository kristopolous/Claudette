## Purpose
Dialog component for configuring plugin options with multi-field support.

## Imports
- **External**: React
- **Internal**: Dialog component, stringWidth utility, keybinding hooks

## Logic
Renders a modal dialog with a series of configurable fields from a PluginOptionSchema. Supports:
- Sequential field navigation (Tab/Enter)
- Sensitive field masking (shows asterisks)
- Type coercion (number, boolean)
- Pre-filling from initialValues while preserving secrets
- Builds final value payload respecting sensitive fields

Used by PluginOptionsFlow for post-install configuration.

## Exports
- `PluginOptionsDialog` - Main dialog component
- `buildFinalValues` - Helper to construct final config from collected inputs
