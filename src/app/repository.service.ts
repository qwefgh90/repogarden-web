import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Repository } from './class/repository';
import { Commit } from './class/commit';
import { Branch } from './class/branch';
import { GitNode } from './class/git-node';
import { TypoInfo } from './class/typo-info';
import { REPOSITORIES } from './mock/mock-repositories';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as meta from './meta/index'

@Injectable()
export class GithubService {
    private repositoriesUrl = meta.repositoriesUrl;
    constructor(private http: Http) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    getRepositories(): Promise<Repository[]> {
        console.log('go repo');
        return this.http.get(this.repositoriesUrl, { withCredentials: true })
            .map(response => response.json() as Repository[])
            .toPromise();
    }

    getBranches(repository: Repository): Promise<Array<Branch>> {
        return this.http.get(meta.branchesUrl(repository.owner, repository.name))
            .map(response => response.json() as Array<Branch>).toPromise();
    }

    getTypoStats(repository: Repository, branch: Branch, offset: number, size: number): Promise<Array<Commit>> {
        return this.http.get(meta.typoStatsUrl(repository.owner, repository.name, branch.name))
            .map(response => response.json() as Array<Commit>).toPromise();
    }

    getTree(repository: Repository, branch: Branch, sha: string): Promise<GitNode> {
        return this.http.get(meta.treeUrl(repository.owner, repository.name, sha))
            .map(response => response.json() as GitNode).toPromise();
    }

    getTypos(repository: Repository, branch: Branch, typoStatId: number): Promise<Array<TypoInfo>> {
        return this.http.get(meta.typosUrl(repository.owner, repository.name, branch.name, typoStatId))
            .map(response => response.json() as Array<TypoInfo>).toPromise();
    }

    updateActivated(userName: string, repositoryName: string, activated: boolean): Promise<boolean> {
        let requestUrl = `api/repositories/${userName}/${repositoryName}`;
        return this.http.put(requestUrl, { activated: activated }).map(response => response.ok).toPromise();
    }

    disableTypoComponent(owner: string, repoName: string, branchName: string, typoStatId: number, typoId: number, typoCompId: number): Promise<boolean> {
        return this.http.delete(meta.typoCompUrl(owner, repoName, branchName, typoStatId, typoId, typoCompId))
            .map(response => response.status == 200).toPromise();
    }
}
