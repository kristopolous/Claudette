import React from 'react';
import { FlatItem } from '../tree-utils.js';
interface Props {
    items: FlatItem[];
    cursorIndex: number;
    terminalWidth: number;
}
export declare function FeatureList({ items, cursorIndex, terminalWidth }: Props): React.FunctionComponentElement<import("ink").BoxProps & {
    children?: React.ReactNode;
} & React.RefAttributes<import("ink").DOMElement>>;
export {};
