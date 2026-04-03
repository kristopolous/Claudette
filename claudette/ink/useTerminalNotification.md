## Purpose
Provides UI hooks for sending notifications and progress reports to compatible terminals through various protocols (iTerm2, Kitty, Ghostty, bell).

## Imports
- **Stdlib**: None specified
- **External**: React hooks (createContext, useCallback, useContext, useMemo)
- **Internal**: 
  - isProgressReportingAvailable, Progress type fromterminal
  - BEL constant fromtermio/ansi
  - ITERM2, OSC, osc, PROGRESS, wrapForMultiplexer fromtermio/osc

## Logic
1. Creates a TerminalWriteContext using React's createContext to provide a writeRaw function to consumers
2. Exports TerminalWriteProvider as the context provider component
3. Defines TerminalNotification type with methods for:
   - notifyITerm2: Sends notifications to iTerm2
   - notifyKitty: Sends notifications to Kitty terminal
   - notifyGhostty: Sends notifications to Ghostty terminal
   - notifyBell: Sends terminal bell character
   - progress: Reports progress via OSC 9;4 sequences to compatible terminals
4. Implements useTerminalNotification hook that:
   - Consumes the TerminalWriteContext to get writeRaw function
   - Throws error if used outside TerminalWriteProvider
   - Creates memoized callback functions for each notification type using useCallback
   - Returns useMemo object containing all notification functions
5. Each notification function:
   - Formats the message according to the specific terminal's protocol
   - Uses wrapForMultiplexer and osc helpers to create proper OSC sequences
   - Writes the raw data via the writeRaw function from context
6. Progress function handles different states (completed, error, indeterminate, running, null) with appropriate OSC sequences

## Exports
- `TerminalWriteContext` - UI context for providing writeRaw function
- `TerminalWriteProvider` - UI component that provides the writeRaw function
- `TerminalNotification` - Type defining the notification interface
- `useTerminalNotification` - Hook that returns terminal notification functions