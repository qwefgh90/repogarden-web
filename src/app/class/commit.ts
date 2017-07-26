import { Cve } from './cve';
import { GitNode } from './git-node';

export class Commit {
    constructor(readonly sha: string, readonly message: string, readonly date: string, readonly committerEmail: string, readonly committerName: string, readonly url: string, readonly tree: GitNode) { }
}
