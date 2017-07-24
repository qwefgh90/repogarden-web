import { TreeModel } from 'ng2-tree';
import { TypoInfo } from './typo-info';

export enum NodeType {
    BLOB,
    TREE
}
export interface GitNode extends TreeModel {
    value: string;
    type: NodeType;
    githubLink?: string;
    typoInfo?: TypoInfo;
    children?: Array<GitNode>;
}
