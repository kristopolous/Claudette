import React from 'react';
import { Box, Text } from 'ink';
export function StatusBar({ selectedCount, fileCount, phase, outputPath }) {
    return React.createElement(Box, { flexDirection: 'column' }, React.createElement(Box, null, React.createElement(Text, { bold: true, color: 'cyan' }, '─── Selection ───')), React.createElement(Box, null, React.createElement(Text, { color: 'green' }, `${selectedCount} features`), React.createElement(Box, null, React.createElement(Text, null, ' · ')), React.createElement(Text, { color: 'yellow' }, `${fileCount} docs`)), phase === 'path' && outputPath
        ? React.createElement(Box, null, React.createElement(Text, { color: 'cyan' }, `Output: ${outputPath}`))
        : null, phase === 'done'
        ? React.createElement(Box, null, React.createElement(Text, { color: 'green', bold: true }, '✓ Packaged successfully'))
        : null);
}
