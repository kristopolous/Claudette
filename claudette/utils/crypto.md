# crypto

## Purpose

Indirection point for platform-specific crypto module selection. Provides `randomUUID` from the platform's crypto library, with build-time substitution for browser targets to avoid pulling in heavy polyfills.

## Imports

- **Stdlib**: `crypto` (platform built-in)

## Logic

1. Imports `randomUUID` from the platform's crypto module
2. Re-exports it explicitly (not via re-export syntax) to avoid bytecode linking issues in some build systems

## Exports

- `randomUUID` - Generates RFC4122 v4 UUIDs

## Source

`crypto`
