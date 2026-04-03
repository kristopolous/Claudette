## Purpose
A user confirmation dialog that appears when a user attempts to switch to a stable update channel, warning them about potential version downgrades and offering choices for proceeding.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `utils/settings/constants`, `components/CustomSelect`, `components/design-system/Dialog`

## Logic
1. **Version Mismatch Warning**:
    - Informs the user that switching to the stable channel might result in downgrading their current version, displaying the current version number for context.
2. **User Choice Presentation**:
    - Offers distinct options for handling the potential downgrade:
        - **Downgrade**: Allows the user to proceed with switching to the stable channel.
        - **Stay**: Keeps the user on their current version, indicating they will wait for the stable channel to catch up.
        - **Cancel**: Aborts the channel switching operation.
3. **Interactive Selection**: Utilizes a `Select` component for users to make their choice via keyboard navigation and confirmation.
4. **Callback Mechanism**: Triggers an `onChoice` callback with the user's selected action (`downgrade`, `stay`, or `cancel`), enabling the application to respond accordingly.
5. **UI Presentation**: Renders the options within a `Dialog` component styled with a "permission" color, indicating a choice that impacts the application's update stability.

## Exports
- `ChannelDowngradeDialog` - A functional component that manages the channel switch confirmation prompt.
