import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { GitNode } from './class/git-node'
import * as meta from './meta/index'

@Injectable()
export class TreeService {

    constructor(private http: Http) { }
    getTree(owner: string, repoName: string, sha: string): Promise<GitNode> {
        return this.http.get(meta.treeUrl(owner, repoName, sha), { params: { 'repoName': repoName, 'owner': owner, 'sha': sha } }).map(response => response.json() as GitNode).toPromise()
    }
}
