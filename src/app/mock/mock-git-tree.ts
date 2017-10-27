import { GitNode, NodeType, TreeEntryEx } from '../class/git-node';
import { result1 } from './mock-cve';

export const tree3: Array<TreeEntryEx> = [
    { seq: 1, level: 1, name: "pom.xml", path: '', sha: '1111', url: 'http://1111', type: 'blob' },
    { seq: 2, level: 1, name: "library", path: '', sha: '2222', url: 'http://2222', type: 'tree' },
    { seq: 3, level: 2, name: "pom.xml", path: 'library', sha: '3333', url: 'http://3333', type: 'blob' },
    { seq: 4, level: 1, name: "html", path: '', sha: '4444', url: 'http://4444', type: 'tree' },
    { seq: 5, level: 2, name: "a.html", path: 'html', sha: '5555', url: 'http://5555', type: 'blob' },
    { seq: 6, level: 2, name: "b.html", path: 'html', sha: '6666', url: 'http://6666', type: 'blob' },
    { seq: 7, level: 2, name: "c.html", path: 'html', sha: '7777', url: 'http://7777', type: 'blob' }
];

export const tree2: GitNode = {
    treeSha: '', value: '/', path: 'test/path',
    type: NodeType.TREE,
    children: [
        {
            treeSha: 'bbbb', value: 'pom.xml', path: 'test/path',
            type: NodeType.BLOB, children: []
        },
        {

            treeSha: '', value: 'library', path: 'test/path',
            type: NodeType.TREE,
            children: [
                {
                    treeSha: 'aaaa', value: 'pom.xml', path: 'test/path',
                    type: NodeType.BLOB, children: []
                    , cve: result1
                }
            ]
        },
        {
            treeSha: '', value: 'html', path: 'test/path',
            type: NodeType.TREE,
            children: [
                { treeSha: '', value: 'main.html', path: 'test/path', type: NodeType.BLOB, children: [] },
                { treeSha: '', value: 'left.html', path: 'test/path', type: NodeType.BLOB, children: [] },
                { treeSha: '', value: 'commercial.html', path: 'test/path', type: NodeType.BLOB, children: [] }
            ]
        }
    ],
    settings: {
        'static': true,
        cssClasses: {
            expanded: 'fa fa-caret-down',
            collapsed: 'fa fa-caret-right',
            empty: 'fa fa-caret-right disabled',
            leaf: 'fa'
        },
        templates: {
            node: '<i class="fa fa-folder-o left-content-box"></i>',
            leaf: '<i class="fa fa-file-o"></i>'
        }
    }
};
