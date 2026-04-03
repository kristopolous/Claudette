import React from 'react';
import { Box, Text, useApp, useInput, useStdout, render } from 'ink';
import { buildFeatureTree, resolveFeaturePaths, FeatureNode } from './feature-tree.js';
import { flattenTree, getAllDescendantIds, getSelectedFiles, getRequiredIds } from './tree-utils.js';
import { generatePRD } from './prd-generator.js';
import { mkdir, writeFile, cp, readdir, stat as fsStat, copyFile } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { existsSync } from 'node:fs';

type Phase = 'select' | 'path' | 'done';

function useFeatureState(rootNodes: FeatureNode[]) {
  const requiredIds = React.useMemo(() => new Set(getRequiredIds(rootNodes)), [rootNodes]);

  const [expandedIds, setExpandedIds] = React.useState(() => {
    const initial = new Set<string>();
    for (const node of rootNodes) {
      if (!node.isLeaf) initial.add(node.id);
    }
    return initial;
  });
  const [selectedIds, setSelectedIds] = React.useState(() => new Set(getRequiredIds(rootNodes)));
  const [cursorIndex, setCursorIndex] = React.useState(0);

  const flatItems = React.useMemo(
    () => flattenTree(rootNodes, expandedIds, selectedIds),
    [rootNodes, expandedIds, selectedIds],
  );

  const toggleSelection = React.useCallback(() => {
    const item = flatItems[cursorIndex];
    if (!item || item.required) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const node = item.node;
      if (next.has(node.id)) {
        next.delete(node.id);
        for (const id of getAllDescendantIds(node)) {
          if (!requiredIds.has(id)) next.delete(id);
        }
      } else {
        next.add(node.id);
        for (const id of getAllDescendantIds(node)) next.add(id);
      }
      return next;
    });
  }, [flatItems, cursorIndex, requiredIds]);

  const toggleExpand = React.useCallback(() => {
    const item = flatItems[cursorIndex];
    if (!item || item.node.isLeaf) return;
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.node.id)) next.delete(item.node.id);
      else next.add(item.node.id);
      return next;
    });
  }, [flatItems, cursorIndex]);

  const moveCursor = React.useCallback((delta: number) => {
    setCursorIndex((prev) => {
      const next = prev + delta;
      if (next < 0) return flatItems.length - 1;
      if (next >= flatItems.length) return 0;
      return next;
    });
  }, [flatItems.length]);

  return {
    flatItems, cursorIndex,
    selectedCount: selectedIds.size,
    selectedFileCount: getSelectedFiles(rootNodes, selectedIds).length,
    toggleSelection, toggleExpand, moveCursor, selectedIds, rootNodes,
  };
}

function ButtonBar({ buttons, activeIndex, onActivate }: {
  buttons: { label: string; key: string; disabled?: boolean }[];
  activeIndex: number;
  onActivate: (index: number) => void;
}) {
  return React.createElement(Box, null,
    React.createElement(Text, { dimColor: true }, '  '),
    ...buttons.flatMap((btn, i) => {
      const isActive = i === activeIndex;
      const sep = i > 0 ? [React.createElement(Text, { dimColor: true }, '  ')] : [];
      const label = btn.disabled ? `[${btn.label}]` : isActive ? `[ ${btn.label} ]` : `[${btn.label}]`;
      return [
        ...sep,
        React.createElement(Text, {
          bold: isActive && !btn.disabled,
          color: btn.disabled ? 'gray' : isActive ? 'black' : undefined,
          backgroundColor: isActive && !btn.disabled ? 'white' : undefined,
        }, label),
      ];
    }),
  );
}

function App({ rootNodes }: { rootNodes: FeatureNode[] }) {
  const { exit } = useApp();
  const { stdout } = useStdout();
  const termW = stdout?.columns ?? 80;
  const termH = stdout?.rows ?? 24;

  const [phase, setPhase] = React.useState<Phase>('select');
  const [pathInput, setPathInput] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [isPackaging, setIsPackaging] = React.useState(false);

  // Button bar state
  const [selectBtnIdx, setSelectBtnIdx] = React.useState(0);
  const [pathBtnIdx, setPathBtnIdx] = React.useState(0);

  const {
    flatItems, cursorIndex,
    selectedCount, selectedFileCount,
    toggleSelection, toggleExpand, moveCursor, selectedIds,
  } = useFeatureState(rootNodes);

  // Layout calculations
  const listH = Math.max(3, termH - 10);
  const detailW = Math.min(38, Math.floor(termW / 3));
  const listW = termW - detailW - 4;
  const half = Math.floor(listH / 2);
  let start = cursorIndex - half;
  let end = cursorIndex + half + (listH % 2 === 0 ? 1 : 0);
  if (start < 0) { end -= start; start = 0; }
  if (end > flatItems.length) { start -= (end - flatItems.length); end = flatItems.length; }
  if (start < 0) start = 0;
  const visible = flatItems.slice(start, end);
  const currentItem = flatItems[cursorIndex];

  const selectButtons = [
    { label: 'Toggle', key: 'space' },
    { label: 'Expand', key: 'enter' },
    { label: 'Package', key: 'p' },
    { label: 'Quit', key: 'esc' },
  ];

  const pathButtons = [
    { label: 'Confirm', key: 'enter' },
    { label: 'Back', key: 'esc' },
  ];

  useInput((input, key) => {
    if (isPackaging) return;

    if (phase === 'select') {
      if (key.upArrow) { moveCursor(-1); setSelectBtnIdx(0); }
      else if (key.downArrow) { moveCursor(1); setSelectBtnIdx(0); }
      else if (key.leftArrow) {
        setSelectBtnIdx((i) => Math.max(0, i - 1));
      } else if (key.rightArrow) {
        setSelectBtnIdx((i) => Math.min(selectButtons.length - 1, i + 1));
      } else if (input === ' ' || input === 'x' || (input === '\r' && selectBtnIdx === 0)) {
        toggleSelection();
      } else if (input === 'l' || input === '\t' || (input === '\r' && selectBtnIdx === 1)) {
        toggleExpand();
      } else if (input === '\r' && selectBtnIdx === 2) {
        if (selectedCount === 0) return;
        setPhase('path');
        setPathInput('./claudette-output');
        setPathBtnIdx(0);
      } else if ((input === '\r' && selectBtnIdx === 3) || key.escape) {
        exit();
      } else if (input === 'p') {
        if (selectedCount === 0) return;
        setPhase('path');
        setPathInput('./claudette-output');
        setPathBtnIdx(0);
      } else if (key.escape) {
        exit();
      }
    } else if (phase === 'path') {
      if (key.leftArrow) setPathBtnIdx((i) => Math.max(0, i - 1));
      else if (key.rightArrow) setPathBtnIdx((i) => Math.min(pathButtons.length - 1, i + 1));
      else if (input === '\r' && pathBtnIdx === 0) {
        const targetPath = pathInput || './claudette-output';
        setStatus('Packaging...');
        setIsPackaging(true);
        packageAndSave(targetPath, rootNodes, selectedIds)
          .then(() => { setStatus('Done! Press any key to exit.'); setIsPackaging(false); setPhase('done'); })
          .catch((err) => { setStatus(`Error: ${err.message}`); setIsPackaging(false); });
      } else if ((input === '\r' && pathBtnIdx === 1) || key.escape) {
        setPhase('select');
        setSelectBtnIdx(0);
      } else if (input === '\u007f' || input === '\b') {
        setPathInput((p) => p.slice(0, -1));
      } else if (input.length === 1) {
        setPathInput((p) => p + input);
      }
    } else if (phase === 'done') {
      exit();
    }
  });

  const header = React.createElement(Box, { flexDirection: 'column' },
    React.createElement(Box, null,
      React.createElement(Text, { bold: true, color: 'cyan' }, '  Claudette'),
      React.createElement(Text, { dimColor: true }, '  — pick features, get a build kit'),
    ),
    React.createElement(Box, null,
      React.createElement(Text, { dimColor: true }, '  ' + '─'.repeat(termW - 4)),
    ),
  );

  const listPanel = React.createElement(Box, { width: listW, flexDirection: 'column' },
    ...visible.map((item, visIdx) => {
      const realIdx = start + visIdx;
      const isCursor = realIdx === cursorIndex;
      const indent = '  '.repeat(item.depth);
      const expandIcon = item.node.isLeaf
        ? '  '
        : item.expanded ? '▼ ' : '▶ ';
      const check = item.required ? '◆' : item.selected ? '◉' : item.partiallySelected ? '◐' : '◯';
      const reqTag = item.required ? ' [required]' : '';
      const desc = item.depth === 0 ? ` — ${item.node.description}` : '';
      const fc = item.node.files.length;
      const fcStr = fc > 0 ? ` (${fc})` : '';
      const line = `${indent}${expandIcon}${check} ${item.node.label}${reqTag}${desc}${fcStr}`;
      const display = line.length > listW - 2 ? line.slice(0, listW - 3) + '…' : line;
      return React.createElement(Box, { key: item.node.id },
        React.createElement(Text, {
          bold: isCursor,
          color: isCursor ? 'black' : undefined,
          backgroundColor: isCursor ? 'white' : undefined,
        }, ` ${display}`),
      );
    }),
  );

  const separator = React.createElement(Box, { width: 1, flexDirection: 'column' },
    ...Array.from({ length: listH }, (_, i) =>
      React.createElement(Text, { key: i, dimColor: true }, '│'),
    ),
  );

  const detailContent = currentItem
    ? [
        React.createElement(Box, { key: 'title' },
          React.createElement(Text, { bold: true, color: 'cyan' }, ` ${currentItem.node.label}`),
        ),
        currentItem.node.description
          ? React.createElement(Box, { key: 'desc' },
              React.createElement(Text, { dimColor: true }, ` ${currentItem.node.description.length > detailW - 4 ? currentItem.node.description.slice(0, detailW - 5) + '…' : currentItem.node.description}`),
            )
          : null,
        React.createElement(Box, { key: 'spacer' }),
        React.createElement(Box, { key: 'count' },
          React.createElement(Text, { color: 'yellow' }, ` ${currentItem.node.files.length} files`),
        ),
        ...currentItem.node.files.slice(0, Math.min(12, currentItem.node.files.length)).map((f) => {
          const rel = relative(join(process.cwd(), 'claudette'), f);
          const truncated = rel.length > detailW - 6 ? '…' + rel.slice(-(detailW - 7)) : rel;
          return React.createElement(Box, { key: f },
            React.createElement(Text, { dimColor: true }, `   ${truncated}`),
          );
        }),
        currentItem.node.files.length > 12
          ? React.createElement(Box, { key: 'more' },
              React.createElement(Text, { dimColor: true }, `   ... and ${currentItem.node.files.length - 12} more`),
            )
          : null,
      ]
    : [];

  const detailPanel = React.createElement(Box, { width: detailW, flexDirection: 'column' },
    ...detailContent,
  );

  const scrollBar = flatItems.length > listH
    ? React.createElement(Box, { flexDirection: 'column', width: 1 },
        ...Array.from({ length: listH }, (_, i) => {
          const idx = start + i;
          const ratio = idx / flatItems.length;
          const barH = Math.max(1, Math.floor((listH / flatItems.length) * listH));
          const pos = Math.floor(ratio * (listH - barH));
          const ch = i >= pos && i < pos + barH ? '█' : '░';
          return React.createElement(Text, { key: i, dimColor: true }, ch);
        }),
      )
    : null;

  const selectFooter = React.createElement(Box, { flexDirection: 'column' },
    React.createElement(Box, null,
      React.createElement(Text, { dimColor: true }, '  ' + '─'.repeat(termW - 4)),
    ),
    React.createElement(Box, null,
      React.createElement(Text, { color: 'green' }, `${selectedCount} features`),
      React.createElement(Text, { dimColor: true }, ' · '),
      React.createElement(Text, { color: 'yellow' }, `${selectedFileCount} docs`),
    ),
    React.createElement(ButtonBar, {
      buttons: selectButtons,
      activeIndex: selectBtnIdx,
      onActivate: () => {},
    }),
  );

  const pathFooter = React.createElement(Box, { flexDirection: 'column' },
    React.createElement(Box, null,
      React.createElement(Text, { dimColor: true }, '  ' + '─'.repeat(termW - 4)),
    ),
    React.createElement(Box, null,
      React.createElement(Text, { bold: true }, '  Output: '),
      React.createElement(Text, { color: 'yellow' }, pathInput),
      React.createElement(Text, { color: 'gray' }, '█'),
    ),
    React.createElement(ButtonBar, {
      buttons: pathButtons,
      activeIndex: pathBtnIdx,
      onActivate: () => {},
    }),
  );

  const doneFooter = React.createElement(Box, { flexDirection: 'column' },
    React.createElement(Box, null,
      React.createElement(Text, { dimColor: true }, '  ' + '─'.repeat(termW - 4)),
    ),
    React.createElement(Box, null,
      React.createElement(Text, { color: 'green', bold: true }, '  ✓ Packaged successfully'),
    ),
    React.createElement(Box, null,
      React.createElement(Text, { dimColor: true }, '  Press any key to exit'),
    ),
  );

  return React.createElement(
    Box,
    { flexDirection: 'column', width: termW, height: termH },
    header,
    React.createElement(Box, null,
      listPanel,
      scrollBar,
      separator,
      detailPanel,
    ),
    phase === 'select' ? selectFooter : phase === 'path' ? pathFooter : doneFooter,
    status
      ? React.createElement(Box, null,
          React.createElement(Text, {
            color: status.startsWith('Error') ? 'red' : 'green',
          }, `  ${status}`),
        )
      : null,
  );
}

async function copyPath(srcPath: string, destPath: string): Promise<void> {
  const s = await fsStat(srcPath);
  if (s.isDirectory()) {
    await mkdir(destPath, { recursive: true });
    const entries = await readdir(srcPath);
    for (const entry of entries) {
      await copyPath(join(srcPath, entry), join(destPath, entry));
    }
  } else if (s.isFile()) {
    await mkdir(join(destPath, '..'), { recursive: true });
    await copyFile(srcPath, destPath);
  }
}

async function packageAndSave(
  outputPath: string,
  rootNodes: FeatureNode[],
  selectedIds: Set<string>,
) {
  const targetDir = join(process.cwd(), outputPath);
  const claudetteDir = join(process.cwd(), 'claudette');
  await mkdir(targetDir, { recursive: true });

  const selectedFiles = getSelectedFiles(rootNodes, selectedIds);
  const actuallyCopied: string[] = [];
  for (const srcPath of selectedFiles) {
    const relPath = relative(claudetteDir, srcPath);
    const destPath = join(targetDir, 'docs', relPath);
    try {
      await copyPath(srcPath, destPath);
      actuallyCopied.push(srcPath);
    } catch (err: any) {
      if (err.code !== 'EISDIR') {
        console.error(`  SKIP: ${relPath} (${err.message})`);
      }
    }
  }

  const prd = generatePRD(actuallyCopied, claudetteDir);
  await writeFile(join(targetDir, 'PRD.md'), prd);
  await copyFile(join(claudetteDir, 'IMPLEMENTATION_CHECKLIST.md'), join(targetDir, 'IMPLEMENTATION_CHECKLIST.md'));
  await copyFile(join(claudetteDir, 'START-HERE.md'), join(targetDir, 'START-HERE.md'));
}

async function main() {
  const claudetteDir = join(process.cwd(), 'claudette');
  if (!existsSync(claudetteDir)) {
    console.error('Error: claudette/ directory not found');
    process.exit(1);
  }

  const rawTree = await buildFeatureTree(claudetteDir);
  const rootNodes = await resolveFeaturePaths(rawTree, claudetteDir);

  render(React.createElement(App, { rootNodes }), {
    exitOnCtrlC: true,
    patchConsole: false,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
