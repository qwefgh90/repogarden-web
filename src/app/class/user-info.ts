export class UserInfo {
    constructor(readonly id, readonly username, readonly firstName, readonly lastName, readonly expiredDate, readonly imgUrl) {
    }
    public getProfileUrl(): string {
        return `https://github.com/${this.id}`;
    };
}
