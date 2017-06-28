export class UserInfo {
    constructor(readonly id, readonly username, readonly firstName, readonly lastName, readonly expiredDate, readonly imgUrl) {
    }
    public getProfileGithubUrl(): string {
        return `https://github.com/${this.id}`;
    };
    public getProfilePath(): string {
        return `/profile/${this.id}`;
    };
}
