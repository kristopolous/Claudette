## Purpose
Provides a React error boundary component that catches rendering errors and prevents them from crashing the application.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: none

## Logic
1. Initializes state with hasError set to false
2. Uses getDerivedStateFromError to set hasError to true when a child component throws
3. Renders null when an error is caught, otherwise renders children normally

## Exports
- `SentryErrorBoundary` - a class component that catches errors in child components and suppresses rendering on failure
