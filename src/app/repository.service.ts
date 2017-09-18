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

    getRepositories(): Observable<Repository[]> {
        return this.http.get(this.repositoriesUrl, { withCredentials: true })
            .map(response => {
                let json = response.json() as Array<Object>;
                return json.map((v, i, a) => Repository.createInstance(v));

            })// as Repository[])
            .catch((err, caught) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.message);
                } else {
                    if (err.status == '401') {
                        this.authService.logout(true);
                        throw 'Logout: ' + err;
                    }
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
                return caught;
            });
    }

    getBranches(repository: Repository): Observable<Array<Branch>> {
        return this.http.get(meta.branchesUrl(repository.owner, repository.name), { withCredentials: true })
            .map(response => response.json() as Array<Branch>)
            .catch((err, caught) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.message);
                } else {
                    if (err.status == '401') {
                        this.authService.logout(true);
                        throw 'Logout: ' + err;
                    }
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
                return caught;
            });
    }

    getTypoStats(repository: Repository, branch: Branch, offset: number, size: number): Observable<Array<Commit>> {
        return this.http.get(meta.typoStatsUrl(repository.owner, repository.name, branch.name), { withCredentials: true })
            .map(response => response.json() as Array<Commit>)
            .catch((err, caught) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.message);
                } else {
                    if (err.status == '401') {
                        this.authService.logout(true);
                        throw 'Logout: ' + err;
                    }
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
                return caught;
            });
    }

    buildTypoStats(repository: Repository, branch: Branch): Promise<Object> {
        return this.http.post(meta.typoStatsUrl(repository.owner, repository.name, branch.name), "", { withCredentials: true })
            .map(response => response.json() as Object)
            .catch((err, caught) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.message);
                } else {
                    if (err.status == '401') {
                        this.authService.logout(true);
                        throw 'Logout: ' + err;
                    }
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
                return caught;
            })
            .toPromise();
    }

    getTree(repository: Repository, branch: Branch, sha: string): Observable<GitNode> {
        return this.http.get(meta.treeUrl(repository.owner, repository.name, sha), { withCredentials: true })
            .map(response => response.json() as GitNode)
            .catch((err, caught) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.message);
                } else {
                    if (err.status == '401') {
                        this.authService.logout(true);
                        throw 'Logout: ' + err;
                    }
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
                return caught;
            });
    }

    getTypos(repository: Repository, branch: Branch, typoStatId: number): Observable<Array<TypoInfo>> {
        return this.http.get(meta.typosUrl(repository.owner, repository.name, branch.name, typoStatId), { withCredentials: true })
            .map(response => response.json() as Array<TypoInfo>)
            .catch((err, caught) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.message);
                } else {
                    if (err.status == '401') {
                        this.authService.logout(true);
                        throw 'Logout: ' + err;
                    }
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
                return caught;
            });
    }

    updateActivated(repository: Repository, activated: boolean): Promise<boolean> {
        return this.http.put(meta.repositoryUrl(repository.owner, repository.name), { activated: activated }, { withCredentials: true }).map(response => response.ok).toPromise();
    }

    disableTypoComponent(owner: string, repoName: string, branchName: string, typoStatId: number, typoId: number, typoCompId: number): Promise<boolean> {
        return this.http.delete(meta.typoCompUrl(owner, repoName, branchName, typoStatId, typoId, typoCompId))
            .map(response => response.status == 200).toPromise();
    }
}
