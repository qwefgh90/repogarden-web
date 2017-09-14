import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Repository } from './class/repository';
import { Commit } from './class/commit';
import { Branch } from './class/branch';
import { GitNode } from './class/git-node';
import { AuthService } from './auth.service';
import { TypoInfo } from './class/typo-info';
import { REPOSITORIES } from './mock/mock-repositories';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as meta from './meta/index'

@Injectable()
export class GithubService {
    private repositoriesUrl = meta.repositoriesUrl;
    constructor(private authService: AuthService, private http: Http, private router: Router, ) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    getRepositories(): Promise<Repository[]> {
        return this.http.get(this.repositoriesUrl, { withCredentials: true })
            .toPromise()
            .then(response => response.json() as Repository[]
            , response => {
                if (response.status == '401')
                    this.authService.logout();
            });
    }

    getBranches(repository: Repository): Observable<Array<Branch>> {
        let observable = this.http.get(meta.branchesUrl(repository.owner, repository.name), { withCredentials: true })
        return observable.do(response => {
            if (response.status == 401)
                this.authService.logout();
        }).map(response => response.json() as Array<Branch>);
    }

    getTypoStats(repository: Repository, branch: Branch, offset: number, size: number): Observable<Array<Commit>> {
        let observable = this.http.get(meta.typoStatsUrl(repository.owner, repository.name, branch.name), { withCredentials: true });
        return observable.do(response => {
            if (response.status == 401)
                this.authService.logout();
        }).map(response => response.json() as Array<Commit>);
    }

    buildTypoStats(repository: Repository, branch: Branch): Promise<Object> {
        return this.http.post(meta.typoStatsUrl(repository.owner, repository.name, branch.name), "")
            .map(response => response.json() as Object).toPromise();
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
