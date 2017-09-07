export const repositoriesUrl = 'api/repositories';

export function branchesUrl(owner: string, repoName: string): string {
    return `api/repositories/${owner}/${repoName}/branches`;
}

export function typoStatsUrl(owner: string, repoName: string, branchName: string): string {
    return `api/repositories/${owner}/${repoName}/branches/${branchName}/typoStats`;
};

export function treeUrl(owner: string, repoName: string, sha: string): string {
    return `api/repositories/${owner}/${repoName}/trees?commitSha=${sha}`;
};

export function typosUrl(owner: string, repoName: string, branchName: string, typoStatId: number): string {
    return `api/repositories/${owner}/${repoName}/branches/${branchName}/typostats/${typoStatId}/typos`;
}

export function typoCompUrl(owner: string, repoName: string, branchName: string, typoStatId: number, typoId: number, typoCompId: number): string {
    return `api/repositories/${owner}/${repoName}/branches/${branchName}/typostats/${typoStatId}/typos/${typoId}/typoCompId/${typoCompId}`;
}
