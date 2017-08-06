import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { GitNode } from './class/git-node'
import { Repository } from './class/repository'
import * as meta from './meta/index'

@Injectable()
export class TreeService {

    constructor(private http: Http) { }
    getTree(repository: Repository, sha: string): Promise<GitNode> {
        return this.http.get(meta.treeUrl(repository.id, sha), { params: {} }).map(response => response.json() as GitNode).toPromise()
    }
}
