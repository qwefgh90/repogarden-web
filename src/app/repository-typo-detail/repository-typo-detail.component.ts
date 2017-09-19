import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Repository } from '../class/repository';
import { Branch } from '../class/branch';
import { Commit } from '../class/commit';
import { Ng2TreeSettings, NodeSelectedEvent, TreeModelSettings, NodeEvent } from 'ng2-tree';
import { GitNode, TypoCounter, dfs, TypoInfoBinder } from '../class/git-node';
import { TypoInfo } from '../class/typo-info';
import { tree2 as mockTree } from '../mock/mock-git-tree'
import { TreeService } from '../tree.service';
import { ApiBackendService } from '../api-backend.service';
import { GithubService } from '../repository.service';
import { HighlightTextComponent } from '../highlight-text/highlight-text.component'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';

declare const alertify: any;

@Component({
    selector: 'app-repository-typo-detail',
    templateUrl: './repository-typo-detail.component.html',
    styleUrls: ['./repository-typo-detail.component.css'],
    providers: [ApiBackendService]
})
export class RepositoryTypoDetailComponent implements OnInit, OnChanges {

    @Input('selectedRepository') repository: Repository;
    @Input('selectedId') userId: string;
    @Input('selectedBranch') branch: Branch;
    selectedNodeMap: Map<string, GitNode> = new Map<string, GitNode>();

    private commitsSubscription: Subscription;

    public customClass: string = 'customClass';

    private static logEvent(message: string): void {
        console.log(message);
        alertify.message(`${message}`);
    }

    treeSettings: Ng2TreeSettings = {
        rootIsVisible: false
    }

    cssSettings: TreeModelSettings = {

    }

    constructor(public githubService: GithubService, public treeService: TreeService, public backendService: ApiBackendService) { }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.branch != undefined) {
            if (this.branch.commits == undefined) {
                if (this.commitsSubscription != undefined)
                    this.commitsSubscription.unsubscribe();
                this.commitsSubscription = this.githubService.getTypoStats(this.repository, this.branch, 0, 10).subscribe(commits => {
                    this.branch.commits = commits;
                    if (this.branch.commits.length > 0)
                        this.loadTree(this.branch.commits[0]);
                });
            }
        }
    }

    selectGitNode(commit: Commit, $event: NodeSelectedEvent) {
        let node = <GitNode>$event.node.node;
        this.selectedNodeMap[commit.sha] = node;
    }

    loadTypos(commit: Commit, targetTree: GitNode): Promise<GitNode> {
        return this.githubService.getTypos(this.repository, this.branch, commit.typoStatId).then(typoInfoArray => {
            let typoTable = typoInfoArray.reduce((p, v, index, arr) => {
                p.set(v.treeSha, v);
                return p;
            }, new Map<string, TypoInfo>());
            dfs(targetTree, new TypoInfoBinder(typoTable));
            return targetTree;
        });
    }

    loadTree(commit: Commit) {
        this.githubService.getTree(this.repository, this.branch, commit.sha).subscribe(tree => {
            console.info('load tree');
            this.loadTypos(commit, tree).then((tree) => {
                commit.tree = tree;
                console.info('A array of TypoInfo is bound in ' + commit.sha);
            });
            console.info(`tree is loaded in ${commit.sha}.`);
        });
    }

    retry(commitSha: string) {
        let promise = this.githubService.buildTypoStatsWithCommit(this.repository, this.branch, commitSha);
        promise.then(obj => {
            let id = obj['id'];
            console.info('id: ' + id);
            let ws = new $WebSocket(this.backendService.frontPart());
            ws.onMessage(
                (msg: MessageEvent) => {
                    console.log("onMessage ", msg.data);
                },
                { autoApply: false }
            );
        });
    }

    find() {
        let promise = this.githubService.buildTypoStats(this.repository, this.branch);
        promise.then(obj => {
            let id = obj['id'];
            console.info('id: ' + id);
            let ws = new $WebSocket(this.backendService.frontPart());
            ws.onMessage(
                (msg: MessageEvent) => {
                    console.log("onMessage ", msg.data);
                },
                { autoApply: false }
            );
        });

    }

    getTypoCount(commit: Commit): number {
        //        if (commit.tree != undefined)
        //            return dfs(commit.tree, new TypoCounter());
        //        else
        return undefined;
    }

    removeTypoComp(commit: Commit, typoId: number, typoCompId: number) {
        this.githubService.disableTypoComponent(this.repository.owner, this.repository.name, this.branch.name, commit.typoStatId, typoId, typoCompId, true).then(b => {
            let index = this.selectedNodeMap[commit.sha].typoInfo.offsetTuple.findIndex((comp) => { return comp.id == typoCompId });
            if (index != -1) {
                this.selectedNodeMap[commit.sha].typoInfo.offsetTuple.splice(index, 1)
                //update the input value of child component for running dirty checking
                this.selectedNodeMap[commit.sha] =
                    Object.assign({}, this.selectedNodeMap[commit.sha]);
            }
        });
    }
}
