export const repositoriesUrl = 'api/repositories';

export function branchesUrl(owner: String, repoName: string): string {
    return `api/repositories/${owner}/${repoName}/branches`;
}

export function commitsUrl(owner: String, repoName: string, branchName: string): string {

    return `api/repositories/${owner}/${repoName}/branches/${branchName}/commits`;
};

export function treeUrl(owner: String, repoName: string, sha: string): string {
    return `api/repositories/${owner}/${repoName}/commits/${sha}/tree`;
};
