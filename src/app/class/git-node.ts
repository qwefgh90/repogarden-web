import { TreeModel } from 'ng2-tree';
import { TypoInfo } from './typo-info';
import { Cve } from './cve'

export enum NodeType {
    BLOB,
    TREE
}

export interface TreeEntryEx {
    seq: number;
    level: number;
    name: string;
    path: string;
    sha: string;
    url: string;
    type: string;
}

export interface GitNode extends TreeModel {
    value: string;
    type: NodeType;
    children: Array<GitNode>;
    path: string;
    level?: number;
    githubLink?: string;
    typoInfo?: TypoInfo;
    cves?: Array<Cve>;
}

export function convertTreeEntryToGitNode(entryArr: Array<TreeEntryEx>): GitNode {
    return convertTreeEntryToGitNodeWithVisitor(entryArr, new GitNodeVistor());
}

export abstract class Visitor<A, B> {
    acc: A;
    abstract visit(tree: B, stack: Array<A>)
}

export function dfs<T>(tree: GitNode, visitor: Visitor<T, GitNode>): T {
    function go(tree: GitNode) {
        let stack = [];
        visitor.visit(tree, stack);
        tree.children.forEach(c => go(c));
    };
    go(tree);
    return visitor.acc;
}

export function convertTreeEntryToGitNodeWithVisitor(entryArr: Array<TreeEntryEx>, visitor: Visitor<GitNode, GitNode>): GitNode {
    let createGitNodeFromTreeEntry = function(entry: TreeEntryEx): GitNode {
        return {
            value: entry.name
            , type: entry.type == 'tree' ? NodeType.TREE : NodeType.BLOB
            , children: []
            , path: entry.path
            , githubLink: entry.url
            , level: entry.level
        };
    };
    let stack = [];
    for (let entry of entryArr) {
        if (stack.length != 0) {
            let last = () => stack[stack.length - 1];
            let repeatCount = last().level - entry.level;
            for (var i = 0; i < repeatCount; i++)
                stack.pop();
            if (last().level == entry.level)
                stack.pop();
        }
        let newNode = createGitNodeFromTreeEntry(entry);
        visitor.visit(newNode, Array.from(stack));
        stack.push(newNode);
    }
    return visitor.acc;
}

export class GitNodeVistor extends Visitor<GitNode, GitNode>{
    constructor() {
        super();
    }
    acc: GitNode = { value: 'root', type: NodeType.TREE, children: [], path: '/' };
    visit(gitNode: GitNode, stack) {
        let len = stack.length;
        if (len != 0) {
            let lastNode = stack[len - 1];
            lastNode.children.push(gitNode);
        } else {
            this.acc.children.push(gitNode);
        }
    }
}

export class CveCounter extends Visitor<number, GitNode>{
    constructor() {
        super();
    }
    acc: number = 0;
    visit(node: GitNode, stack) {
        if (node.cves != undefined) {
            this.acc = this.acc + node.cves.length;
        }
    }
}
export class TypoCounter extends Visitor<number, GitNode>{
    constructor() {
        super();
    }
    acc: number = 0;
    visit(node: GitNode, stack) {
        if (node.typoInfo != undefined) {
            if (node.typoInfo.offsetTuple != undefined)
                this.acc = this.acc + node.typoInfo.offsetTuple.length;
        }
    }
}
