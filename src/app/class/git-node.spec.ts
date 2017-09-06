import { GitNode, TreeEntryEx, convertTreeEntryToGitNode, convertTreeEntryToGitNodeWithVisitor, GitNodeVistor } from './git-node';

describe('convertTreeEntryToGitNode', () => {
    let arr: Array<TreeEntryEx> = [
        {
            seq: 1,
            level: 1,
            name: 'a',
            path: 'path of a',
            sha: 'sha of a',
            url: 'url of a',
            type: 'tree'
        },
        {
            seq: 2,
            level: 1,
            name: 'b',
            path: 'path of b',
            sha: 'sha of b',
            url: 'url of b',
            type: 'tree'
        },
        {
            seq: 3,
            level: 2,
            name: 'c',
            path: 'path of c',
            sha: 'sha of c',
            url: 'url of c',
            type: 'blob'
        },
        {
            seq: 4,
            level: 2,
            name: 'd',
            path: 'path of d',
            sha: 'sha of d',
            url: 'url of d',
            type: 'blob'
        },
        {
            seq: 5,
            level: 1,
            name: 'e',
            path: 'path of e',
            sha: 'sha of e',
            url: 'url of e',
            type: 'tree'
        },
        {
            seq: 6,
            level: 2,
            name: 'f',
            path: 'path of f',
            sha: 'sha of f',
            url: 'url of f',
            type: 'tree'
        },
        {
            seq: 7,
            level: 3,
            name: 'g',
            path: 'path of g',
            sha: 'sha of g',
            url: 'url of g',
            type: 'blob'
        }
    ];
    it('should convert to GitNode', () => {
        let root = convertTreeEntryToGitNode(arr);
        root.children.map(n => {
            expect(n.path).toBe('path of ' + n.value);
        })
        console.info(root);
    });
});
