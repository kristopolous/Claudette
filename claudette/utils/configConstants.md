# configConstants

## Purpose
Defines valid configuration value constants for notification channels, editor modes, and teammate modes. Kept in a separate file to avoid circular dependency issues — this file must remain dependency-free.

## Imports
- None (must stay dependency-free to avoid circular deps)

## Logic
Exports readonly arrays used for config validation. Do not add imports to this file.

## Exports
- `NOTIFICATION_CHANNELS` - `['auto', 'iterm2', 'iterm2_with_bell', 'terminal_bell', 'kitty', 'ghostty', 'notifications_disabled'] as const`
- `EDITOR_MODES` - `['normal', 'vim'] as const` (excludes deprecated `'emacs'` which is auto-migrated to `'normal'`)
- `TEAMMATE_MODES` - `['auto', 'tmux', 'in-process'] as const` where `'tmux'` = traditional tmux-based teammates, `'in-process'` = same-process teammates, `'auto'` = automatic selection (default)
