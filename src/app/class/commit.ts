export class Commit {
    constructor(readonly sha: string, readonly message: string, readonly date: string, readonly committeremail: string, readonly committerName: string, readonly url: string) { }
}
