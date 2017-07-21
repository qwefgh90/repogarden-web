import { Cve } from './cve'
export class Repository {
    constructor(readonly name, readonly accessLink, readonly activated, readonly branches: Array<string>, readonly cves: Array<Cve>) {
    }
    public getRepoUrl(id: string): string {
        return `https://github.com/${id}/${this.name}`;
    }
}
