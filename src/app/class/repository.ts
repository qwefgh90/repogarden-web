export class Repository {
    constructor(readonly name, readonly accessLink, readonly activated) {
    }
    public getRepoUrl(id: string): string {
        return `https://github.com/${id}/${this.name}`;
    }
}
