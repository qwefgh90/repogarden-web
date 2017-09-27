import { Commit } from './commit'

export class Branch {
    constructor(readonly name: string, public commits?: Array<Commit>, public cveCommits?: Array<Commit>) {

    }

    public getCommits(): Array<Commit> {
        return this.commits;
    }
}
