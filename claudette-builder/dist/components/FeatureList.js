import React from 'react';
import { Box, Text, useStdout } from 'ink';
export function FeatureList({ items, cursorIndex, terminalWidth }) {
    const { stdout } = useStdout();
    const terminalHeight = stdout?.rows ?? 24;
    const listHeight = Math.max(5, terminalHeight - 10);
    const half = Math.floor(listHeight / 2);
    let start = cursorIndex - half;
    let end = cursorIndex + half + (listHeight % 2 === 0 ? 1 : 0);
    if (start < 0) {
        end -= start;
        start = 0;
    }
    if (end > items.length) {
        start -= (end - items.length);
        end = items.length;
    }
    if (start < 0)
        start = 0;
    const visibleItems = items.slice(start, end);
    const availableWidth = terminalWidth - 4;
    const showScrollbar = items.length > listHeight;
    function scrollbar(index) {
        if (!showScrollbar)
            return '  ';
        const ratio = index / items.length;
        const barHeight = Math.max(1, Math.floor((listHeight / items.length) * listHeight));
        const pos = Math.floor(ratio * (listHeight - barHeight));
        const relativeIndex = index - start;
        if (relativeIndex >= pos && relativeIndex < pos + barHeight)
            return '█ ';
        return '░ ';
    }
    return React.createElement(Box, { flexDirection: 'column' }, ...visibleItems.map((item, visIndex) => {
        const realIndex = start + visIndex;
        const isCursor = realIndex === cursorIndex;
        const prefix = item.depth === 0
            ? (item.node.isLeaf ? '  ' : (item.expanded ? '▼ ' : '▶ '))
            : ('  '.repeat(item.depth) + (item.node.isLeaf ? '  ' : (item.expanded ? '▼ ' : '▶ ')));
        const checkbox = item.required
            ? '◆'
            : item.selected
                ? '◉'
                : item.partiallySelected
                    ? '◐'
                    : '◯';
        const label = item.node.label;
        const desc = item.depth === 0 ? ` — ${item.node.description}` : '';
        const fileCount = item.node.files.length;
        const countStr = fileCount > 0 ? ` (${fileCount} file${fileCount > 1 ? 's' : ''})` : '';
        const requiredTag = item.required ? ' [required]' : '';
        const fullLine = `${prefix}${checkbox} ${label}${requiredTag}${desc}${countStr}`;
        const displayLine = fullLine.length > availableWidth
            ? fullLine.slice(0, availableWidth - 1) + '…'
            : fullLine;
        const scrollIndicator = scrollbar(realIndex);
        return React.createElement(Box, { key: item.node.id }, showScrollbar
            ? React.createElement(Text, { dimColor: true }, scrollIndicator)
            : null, React.createElement(Text, {
            color: isCursor ? 'black' : undefined,
            backgroundColor: isCursor ? 'white' : undefined,
            bold: isCursor,
        }, displayLine));
    }));
}
