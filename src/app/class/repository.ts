import { Cve } from './cve';
import { Branch } from './branch'

export class Repository {
    constructor(readonly owner, readonly name, readonly accessLink, readonly activated, readonly branches: Array<Branch>, readonly cves: Array<Cve>) {
    }
    public getRepoUrl(id: string): string {
        return `https://github.com/${id}/${this.name}`;
    }

    public getDefaultBranch(): Branch {
        return this.branches.length > 0 ? this.branches[0] : undefined;
    }
}
