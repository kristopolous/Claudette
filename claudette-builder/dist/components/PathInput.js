import React from 'react';
import { Box, Text } from 'ink';
export function PathInput({ value, cursorVisible }) {
    return React.createElement(Box, { flexDirection: 'column' }, React.createElement(Box, null, React.createElement(Text, { bold: true }, 'Output directory: '), React.createElement(Text, { color: 'yellow' }, value), React.createElement(Text, { color: 'gray' }, cursorVisible ? '█' : ' ')), React.createElement(Box, null, React.createElement(Text, { dimColor: true }, 'Type path, Enter to confirm, Esc to cancel')));
}
