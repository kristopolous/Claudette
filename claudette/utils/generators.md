# generators

## Purpose
Utilities for working with async generators: consuming, collecting, converting, and running multiple generators concurrently.

## Imports
- (none)

## Logic
1. `lastX` - Iterates entire async generator and returns the last yielded value; throws if empty
2. `returnValue` - Drains an async generator to completion and returns its final return value (the `.value` of the done iterator result)
3. `all` - Runs multiple async generators concurrently with a configurable concurrency cap. Maintains a pool of active generator promises, yields values as they arrive, and starts new generators from a waiting queue when slots free up
4. `toArray` - Collects all yielded values from an async generator into a plain array
5. `fromArray` - Converts a plain array into an async generator that yields each element

## Exports
- `lastX<A>(as: AsyncGenerator<A>)` - Returns the last value from an async generator; throws if empty
- `returnValue<A>(as: AsyncGenerator<unknown, A>)` - Drains generator and returns its final return value
- `all<A>(generators, concurrencyCap?)` - Async generator that runs all input generators concurrently, yielding values as they arrive
- `toArray<A>(generator: AsyncGenerator<A>)` - Collects all values from an async generator into an array
- `fromArray<T>(values: T[])` - Converts an array into an async generator

## Source
`generators`
