import { Cve } from './cve';

export class Commit {
    constructor(readonly sha: string, readonly message: string, readonly date: string, readonly committerEmail: string, readonly committerName: string, readonly url: string, readonly cve: Array<Cve>) { }
}
