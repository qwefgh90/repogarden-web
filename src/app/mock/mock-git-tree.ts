import { GitNode, NodeType } from '../class/git-node';
import { cve1, cve2, cve3 } from './mock-cve';
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
                    , cves: [cve1, cve2]
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
