export const repositoriesUrl = 'api/repositories';

export function branchesUrl(owner: string, name: string): string {
    return `api/repositories/${owner}/${name}/branches`;
}

export function commitsUrl(owner: string, name: string, branchName: string): string {
    return `api/repositories/${owner}/${name}/branches/${branchName}/commits`;
};

export function treeUrl(owner: string, name: string, sha: string): string {
    return `api/repositories/${owner}/${name}/commits/${sha}/tree`;
};
