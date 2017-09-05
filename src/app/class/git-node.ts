import { TreeModel } from 'ng2-tree';
import { TypoInfo } from './typo-info';
import { Cve } from './cve'

export enum NodeType {
    BLOB,
    TREE
}

export interface GitNode extends TreeModel {
    value: string;
    type: NodeType;
    children: Array<GitNode>;
    path: string;
    githubLink?: string;
    typoInfo?: TypoInfo;
    cves?: Array<Cve>;
}

export abstract class Visitor<T> {
    acc: T;
    abstract visit(tree: GitNode);
}

export function dfs<T>(tree: GitNode, visitor: Visitor<T>): T {
    function go(tree: GitNode) {
        visitor.visit(tree);
        tree.children.forEach(c => go(c));
    };
    go(tree);
    return visitor.acc;
}

export class CveCounter extends Visitor<number>{
    constructor() {
        super();
    }
    acc: number = 0;
    visit(node: GitNode) {
        if (node.cves != undefined) {
            this.acc = this.acc + node.cves.length;
        }
    }
}
export class TypoCounter extends Visitor<number>{
    constructor() {
        super();
    }
    acc: number = 0;
    visit(node: GitNode) {
        if (node.typoInfo != undefined) {
            this.acc = this.acc + 1;
        }
    }
}
