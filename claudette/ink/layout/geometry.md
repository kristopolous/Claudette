## Purpose
Provides geometric types and utility functions for layout calculations including points, sizes, rectangles, and edge insets.

## Imports
- **Stdlib**: None specified
- **External**: None specified
- **Internal**: None specified (self-contained module)

## Logic
1. Defines TypeScript interfaces for geometric primitives:
   - Point: x and y coordinates
   - Size: width and height dimensions
   - Rectangle: combines Point and Size (x, y, width, height)
   - Edges: padding/margin/border values for top, right, bottom, left
2. Implements edge utility functions:
   - edges(): flexible function to create uniform or specific edge values
   - addEdges(): combines two edge objects by adding corresponding values
   - ZERO_EDGES: constant representing no edges
   - resolveEdges(): converts partial edge specifications to full edges with defaults
3. Implements rectangle utility functions:
   - unionRect(): computes the bounding rectangle that encloses two rectangles
   - clampRect(): clamps a rectangle to fit within a given size
   - withinBounds(): checks if a point is within a size's bounds
   - clamp(): constrains a value between optional min and max bounds

## Exports
- `Point` - Interface with x and y number properties
- `Size` - Interface with width and height number properties
- `Rectangle` - Interface combining Point and Size (x, y, width, height)
- `Edges` - Interface with top, right, bottom, left number properties
- `edges()` - Function to create edge objects with flexible overloads
- `addEdges()` - Function that adds two edge objects together
- `ZERO_EDGES` - Constant edge object with all values set to 0
- `resolveEdges()` - Function that resolves partial edges to full edges with defaults
- `unionRect()` - Function that returns the union of two rectangles
- `clampRect()` - Function that clamps a rectangle to fit within a size
- `withinBounds()` - Function that checks if a point is within size bounds
- `clamp()` - Function that constrains a value between min and max bounds