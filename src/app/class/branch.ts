import { Commit } from './commit'

export class Branch {
    constructor(readonly name: string, commits: Array<Commit>) {
        this.commits = commits;
    }
    private commits: Array<Commit>;
    public getCommits(): Array<Commit> {
        return this.commits;
    }
}
