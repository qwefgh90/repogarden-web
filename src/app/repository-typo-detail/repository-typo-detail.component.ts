import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Repository } from '../class/repository';
import { Branch } from '../class/branch';
import { Commit } from '../class/commit';
import { Ng2TreeSettings, NodeSelectedEvent, TreeModelSettings, NodeEvent } from 'ng2-tree';
import { GitNode, TypoCounter, dfs } from '../class/git-node';
import { TypoInfo } from '../class/typo-info';
import { tree2 as mockTree } from '../mock/mock-git-tree'
import { TreeService } from '../tree.service';
import { GithubService } from '../repository.service';
import { HighlightTextComponent } from '../highlight-text/highlight-text.component'

declare const alertify: any;

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

    private static logEvent(message: string): void {
        console.log(message);
        alertify.message(`${message}`);
    }

    treeSettings: Ng2TreeSettings = {
        rootIsVisible: false
    }

    cssSettings: TreeModelSettings = {

    }

    constructor(public githubService: GithubService, public treeService: TreeService) { }//, private alertify: Alertify) { }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.branch != undefined) {
            if (this.branch.commits == undefined) {
                this.githubService.getCommits(this.repository, this.branch, 0, 10).then(commits => {
                    this.branch.commits = commits;
                    if (this.branch.commits.length > 0)
                        this.loadTree(this.branch.commits[0]);
                });
            }
        }
    }

    select(commit: Commit, $event: NodeSelectedEvent) {
        let node = <GitNode>$event.node.node;
        console.info($event);
        this.selectedNodeMap[commit.sha] = node;
    }


    loadTree(commit: Commit) {
        if (commit.tree == undefined) {
            this.githubService.getTree(this.repository, this.branch, commit.sha).then(tree => commit.tree = tree);
            RepositoryTypoDetailComponent.logEvent(`tree is loaded in ${commit.sha}.`);
        }
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
