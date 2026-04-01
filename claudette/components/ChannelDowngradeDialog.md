## Purpose
A UI dialog module that prompts the user to decide how to handle a version mismatch when switching from a "latest" or "experimental" release channel back to the "stable" channel.

## Imports
- **Internal**: 
    - UI: `ink`, `CustomSelect/index`, `design-system/Dialog`

## Logic
1. **Selection Handling**: Provides an interactive selection menu where users can choose between three outcomes:
    - **Downgrade**: Accept installing the older version currently hosted on the stable channel.
    - **Stay**: Remain on the current version until the stable channel reaches or exceeds it.
    - **Cancel**: Abort the channel switch entirely.
2. **Dynamic Messaging**: Displays the user's current version within the dialog text and selection labels to provide clear context for the decision.
3. **Modal Behavior**: Utilizes a standard dialog component with specific UI overrides (hidden borders and input guides) to maintain a focused, high-priority interaction state.
4. **Input Abstraction**: Maps user interactions (selection or cancellation) to a callback function provided by the parent controller, ensuring clean separation between UI state and version management logic.

## Exports
- `ChannelDowngradeDialog` - The primary UI component for the channel switch decision interface.
- `ChannelDowngradeChoice` (Type) - Defines the allowed response values: `'downgrade'`, `'stay'`, or `'cancel'`.
