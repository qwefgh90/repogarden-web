import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Repository } from './class/repository';
import { Commit } from './class/commit';
import { Branch } from './class/branch';
import { GitNode } from './class/git-node';
import { REPOSITORIES } from './mock/mock-repositories';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as meta from './meta/index'

@Injectable()
export class GithubService {
    private repositoriesUrl = meta.repositoriesUrl;
    constructor(private http: Http) { }

    getRepositories(): Promise<Repository[]> {
        return this.http.get(this.repositoriesUrl)
            .map(response => response.json() as Repository[])
            .toPromise();
    }

    getBranches(repository: Repository): Promise<Array<Branch>> {
        return this.http.get(meta.branchesUrl(repository.owner, repository.name))
            .map(response => response.json() as Array<Branch>).toPromise();
    }

    getCommits(repository: Repository, branch: Branch, offset: number, size: number): Promise<Array<Commit>> {
        return this.http.get(meta.commitsUrl(repository.owner, repository.name, branch.name))
            .map(response => response.json() as Array<Commit>).toPromise();
    }

    getTree(repository: Repository, branch: Branch, sha: string): Promise<GitNode> {
        return this.http.get(meta.treeUrl(repository.owner, repository.name, sha))
            .map(response => response.json() as GitNode).toPromise();
    }

    updateActivated(userName: string, repositoryName: string, activated: boolean): Promise<boolean> {
        let requestUrl = `api/repositories/${userName}/${repositoryName}`;
        return this.http.put(requestUrl, { activated: activated }).map(response => response.ok).toPromise();
    }
}
