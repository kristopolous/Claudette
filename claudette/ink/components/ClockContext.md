## Purpose
Provides a React context for managing a synchronized clock that coordinates time-based updates across components, with automatic adjustment based on terminal focus state to reduce power consumption when unfocused.

## Imports
- **Stdlib**: None specified
- **External**: React hooks (createContext, useEffect, useState) from 'react'
- **Internal**: 
  - FRAME_INTERVAL_MS constant from ../constants.js
  - useTerminalFocus hook from ../hooks/use-terminal-focus.js

## Logic
1. **Clock Type**: Defines a Clock interface with:
   - subscribe(onChange, keepAlive): Registers a callback for tick events, returns unsubscribe function
   - now(): Returns current elapsed time in milliseconds
   - setTickInterval(ms): Updates the tick interval

2. **createClock() Function**: Factory function that creates a clock instance with:
   - Subscribers Map: Stores callback functions and their keepAlive flags
   - Interval Management: Uses setInterval for periodic ticks, cleared when no keepAlive subscribers
   - Synchronized Time: All subscribers in the same tick see the same time value
   - Focus-aware Intervals: Shorter interval when terminal focused, longer when blurred
   - startTime: Tracks when the clock started
   - tickTime: Snapshotted time for current tick (updated on each tick)

3. **ClockProvider Component**: React component that:
   - Creates a clock instance via useState (stable across renders)
   - Subscribes to terminal focus changes via useTerminalFocus
   - Adjusts clock interval based on focus state (normal interval when focused, 2x when blurred)
   - Provides the clock instance via ClockContext

4. **Key Features**:
   - Time Synchronization: All subscribers see the same time within a tick
   - Automatic Pause/Resume: Clock pauses when no subscribers have keepAlive=true
   - Focus Optimization: Reduces tick frequency when terminal unfocused to save power
   - Memory Efficient: Cleans up intervals and subscribers properly
   - Compiler Optimization: Uses React compiler runtime for optimized rendering

## Exports
- `Clock` - Type interface for clock functionality
- `createClock` - Factory function that creates a clock instance
- `ClockContext` - React context providing access to the clock
- `ClockProvider` - React component that provides the clock to its subtree