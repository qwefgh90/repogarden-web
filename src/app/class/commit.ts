import { Cve } from './cve';
import { GitNode } from './git-node';
import { TreeService } from '../tree.service';
import { Repository } from './repository'

export class Commit {
    constructor(readonly sha: string, readonly message: string, readonly date: string, readonly committerEmail: string, readonly committerName: string, readonly url: string, public tree?: GitNode) { }

    private isLoaded = false;

    getTree(treeService: TreeService, repository: Repository): Promise<GitNode> {
        let promise = new Promise<GitNode>((resolve, reject) => {
            if (this.isLoaded)
                resolve(this.tree);
            else {
                let treePromise = treeService.getTree(repository, this.sha);
                treePromise.then(value => {
                    this.isLoaded = true;
                    this.tree = value;
                    resolve(value);
                }).catch(result => reject(result));
            }
        });
        return promise;
    }
}
