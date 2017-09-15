export class UserInfo {
    constructor(readonly id, readonly username, readonly login, readonly firstName, readonly lastName, readonly expiredDate, readonly imgUrl, readonly url, readonly htmlUrl) {
    }
    public getProfileGithubUrl(): string {
        return `${this.htmlUrl}`;
    };
    public getProfilePath(): string {
        return `/profile/${this.login}`;
    };
}
