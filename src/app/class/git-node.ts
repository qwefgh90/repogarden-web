import { TreeModel } from 'ng2-tree';
import { TypoInfo } from './typo-info';

export interface GitNode extends TreeModel {
    value: string;
    githubLink?: string;
    typoInfo?: TypoInfo;
    children?: Array<GitNode>;
}

