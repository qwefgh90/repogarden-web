import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Repository } from '../class/repository';
import { Branch } from '../class/branch';
import { Commit } from '../class/commit';
import { Ng2TreeSettings, NodeSelectedEvent } from 'ng2-tree';
import { GitNode, TypoCounter, dfs } from '../class/git-node';
import { TypoInfo } from '../class/typo-info';
import { tree as mockTree } from '../mock/mock-git-tree'
import { TreeService } from '../tree.service';

@Component({
    selector: 'app-repository-typo-detail',
    templateUrl: './repository-typo-detail.component.html',
    styleUrls: ['./repository-typo-detail.component.css']
})
export class RepositoryTypoDetailComponent implements OnInit, OnChanges {

    @Input('selectedRepository') repository: Repository;
    @Input('selectedId') userId: string;
    @Input('selectedBranch') branch: Branch;
    selectedNodeMap: Map<string, GitNode> = new Map<string, GitNode>();

    public customClass: string = 'customClass';
    dummy: string = 'Template <script>alert("0wned")</script> <b>Syntax</b> and <mark>marked text</mark><br>next line';

    formattingText: string;

    treeSettings: Ng2TreeSettings = {
        rootIsVisible: false
    }
    tree = mockTree

    constructor(public treeService: TreeService) { }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.branch != undefined) {
            let commit = this.branch.commits[0]
            if (commit != undefined)
                commit.getTree(this.treeService, this.repository.owner, this.repository.name);
        }
    }

    select(commit: Commit, $event: NodeSelectedEvent) {
        let node = <GitNode>$event.node.node;
        console.info($event);
        this.selectedNodeMap[commit.sha] = node;
        this.formattingText = this.getFormattingText(node.typoInfo);
    }

    loadTree(commit: Commit) {
        commit.getTree(this.treeService, this.repository.owner, this.repository.name)
    }

    getTypoCount(commit: Commit): number {
        if (commit.tree != undefined)
            return dfs(commit.tree, new TypoCounter());
        else
            return undefined;
    }

    getFormattingText(typoInfo: TypoInfo): string {
        if (typoInfo == undefined || typoInfo == null) {
            return "";
        } else {
            let sortedTypoList = typoInfo.offsetTuple.sort((a, b) => { return a[0] > b[0] ? 1 : 0 });
            let typoStartOffsetMap = typoInfo.offsetTuple.reduce(function(a, b) {
                a[b[0]] = true;
                return a;
            }, {});
            let typoEndOffsetMap = typoInfo.offsetTuple.reduce(function(a, b) {
                a[b[0] + b[1]] = true;
                return a;
            }, {});
            let resultString: Array<string> = [];
            let body = <String>typoInfo.body;
            for (let idx in body) {
                if (typoEndOffsetMap[idx] == true) {
                    resultString.push('</mark>');
                }
                if (typoStartOffsetMap[idx] == true) {
                    resultString.push('<mark>');
                }
                resultString.push(body[idx]);
            }
            return resultString.join("");
        }
    }
}
