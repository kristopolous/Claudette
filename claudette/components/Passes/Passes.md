# components/Passes/Passes

## Purpose
Provides guest passes dialog component for referral program.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: commands, constants figures, hooks useExitOnCtrlCDWithKeybindings, ink termio/osc, ink, keybindings useKeybinding, analytics, API referral, oauth types, array, log, design-system Pane

## Logic
1. `PassStatus` - { passNumber, isAvailable }
2. `Props` - { onDone }
3. `Passes` - UI component for guest passes dialog
4. State: loading, passStatuses, isAvailable, referralLink, referrerReward
5. Uses useExitOnCtrlCDWithKeybindings for exit on Ctrl+C
6. `handleCancel` - handles cancel action
7. useKeybinding for 'confirm:no' with Confirmation context
8. useInput for Enter key to copy referral link
9. Copies link via setClipboard, logs tengu_guest_passes_link_copied event
10. useEffect loads passes data
11. Checks eligibility via getCachedOrFetchPassesEligibility
12. Stores referral link from eligibilityData.referral_code_details.referral_link
13. Stores referrer reward info for v1 campaign messaging
14. Fetches redemptions via fetchReferralRedemptions
15. Uses campaign from eligibilityData.referral_code_details.campaign or default 'claude_code_guest_pass'
16. Renders Pane with passes information
17. Shows pass statuses with TEARDROP_ASTERISK for available passes
18. Shows referral link with copy instructions
19. Shows referrer reward info
20. `setClipboard` - sets clipboard content
21. `logEvent` - logs analytics event
22. `fetchReferralRedemptions`, `formatCreditAmount`, `getCachedOrFetchPassesEligibility` - referral functions
23. `count` - count array elements
24. `logError` - logs error

## Exports
- `Passes` - guest passes dialog component
