import React from 'react';
interface Props {
    selectedCount: number;
    fileCount: number;
    phase: 'select' | 'path' | 'done';
    outputPath?: string;
}
export declare function StatusBar({ selectedCount, fileCount, phase, outputPath }: Props): React.FunctionComponentElement<import("ink").BoxProps & {
    children?: React.ReactNode;
} & React.RefAttributes<import("ink").DOMElement>>;
export {};
