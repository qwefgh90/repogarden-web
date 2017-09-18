import { Cve } from './cve';
import { Branch } from './branch'

export class Repository {
    constructor(readonly id, readonly owner, readonly name, readonly accessLink, readonly htmlUrl, private activated, readonly defaultBranch, public branches?: Array<Branch>, public activatedRadio?: string) {
        if (activated)
            this.activatedRadio = "on";
        else
            this.activatedRadio = "off";
    }

    public getRepoUrl(id: string): string {
        return `https://github.com/${this.owner}/${this.name}`;
    }

    public getActivated(): boolean {
        if (this.activatedRadio == "on")
            return true;
        else
            return false;
    }

    public static createInstance(json: any): Repository {
        return new Repository(json.id, json.owner, json.name, json.accessLink, json.htmlUrl, json.activated, json.defaultBranch);
    }

}
