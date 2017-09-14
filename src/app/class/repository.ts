import { Cve } from './cve';
import { Branch } from './branch'

export class Repository {
    constructor(readonly id, readonly owner, readonly name, readonly accessLink, readonly htmlUrl, readonly activated, readonly defaultBranch, public branches?: Array<Branch>) {
    }

    public getRepoUrl(id: string): string {
        return `https://github.com/${this.owner}/${this.name}`;
    }

}
