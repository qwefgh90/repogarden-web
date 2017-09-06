export const repositoriesUrl = 'api/repositories';

export function branchesUrl(owner: string, repoName: string): string {
    return `api/repositories/${owner}/${repoName}/branches`;
}

export function commitsUrl(owner: string, repoName: string, branchName: string): string {

    return `api/repositories/${owner}/${repoName}/branches/${branchName}/commits`;
};

export function treeUrl(owner: string, repoName: string, sha: string): string {
    return `api/repositories/${owner}/${repoName}/commits/${sha}/tree`;
};

export function typoUrl(owner: string, repoName: string, branchName: string, typoStatId: number): string {
    return `api/repositories/${owner}/${repoName}/branches/${branchName}/typostats/${typoStatId}`;
}
